import { Request, Response } from "express";
import { Types } from "mongoose";
import { Project, Section, Task } from "~/model";
import { errorResponseHandler, successResponseHandler } from "~/utils";
import { calculateNewOrder } from "~/utils/calculateOrder";

export const addSection = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming middleware sets `req.user`
    const { projectId, title } = req.body;

    //   if (!projectId || !name) {
    //     return errorResponseHandler(res, "");
    //   }

    // Verify if the user is a member or admin of the project
    const project = await Project.findOne({
      _id: projectId,
      $or: [{ admin: userId }, { members: userId }],
    });
    if (!project) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    // Determine the new section's order
    const lastSection = await Section.findOne({ project: projectId })
      .sort({ order: -1 })
      .lean();
    const newOrder = lastSection ? lastSection.order + 1 : 0;

    // Create and save the new section
    const newSection = new Section({
      title: title,
      order: newOrder,
      project: projectId,
    });
    await newSection.save();

    // Update the project to include the new section
    project.sections.push(newSection._id);
    await project.save();

    return successResponseHandler(res, "CREATED", {
      section: newSection,
      project: project,
    });
  } catch (error) {
    console.error("Error adding section: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const updateSection = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming middleware sets `req.user`
    const { title } = req.body; // Assuming section ID and new name are sent in the request body
    const id = req.params.id;
    console.log("updating title:", title, "id:", id )
    // if (!sectionId || !newName) {
    //   return errorResponseHandler(res, "MISSING_REQUIRED_FIELDS");
    // }

    // Find the section and its associated project
    const section = await Section.findById(id).populate("project");
    if (!section) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    // Check if the user is authorized to update the section (project admin or member)
    const project = await Project.findById(section.project._id);
    if (!project || !project.members.includes(userId as Types.ObjectId)) {
      return errorResponseHandler(res, "BAD_REQUEST");
    }

    // Update the section's name
    section.title = title;
    await section.save();

    return successResponseHandler(res, "SUCCESS", {
      section,
    });
  } catch (error) {
    console.error("Error updating section: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// export const reorderSection = async (req: Request, res: Response) => {
//   try {
//     const { sectionId, projectId, newPosition } = req.body;

//     // Fetch all sections in the current project to determine new order values
//     const sections = await Section.find({ project: projectId }).sort({
//       order: 1,
//     });
//     if (!sections.length) {
//       return errorResponseHandler(res, "NOT_FOUND");
//     }

//     // Find the section to be reordered
//     const sectionToMove = sections.find(
//       (section) => section._id.toString() === sectionId
//     );
//     if (!sectionToMove) {
//       return errorResponseHandler(res, "NOT_FOUND");
//     }

//     // Determine new order value based on newPosition
//     let newOrder;
//     if (newPosition === 0) {
//       // Moved to the first position
//       newOrder = sections[0].order / 2;
//     } else if (newPosition >= sections.length) {
//       // Moved to the last position
//       newOrder = sections[sections.length - 1].order + 1;
//     } else {
//       // Moved between two sections
//       const prevOrder = sections[newPosition - 1].order;
//       const nextOrder = sections[newPosition].order;
//       newOrder = (prevOrder + nextOrder) / 2;
//     }

//     // Update the order of the moved section
//     sectionToMove.order = newOrder;
//     await sectionToMove.save();

//     return successResponseHandler(res, "SUCCESS", {
//       section: sectionToMove,
//     });
//   } catch (error) {
//     console.error("Error reordering section: ", error);
//     return errorResponseHandler(res, "SERVER_ERROR");
//   }
// };



// Route to reorder sections
export const reorderSection = async (req: Request, res: Response) => {
  const { sectionId, beforeSectionId, afterSectionId } = req.body;

  try {
    const beforeSection = beforeSectionId
      ? await Section.findById(beforeSectionId)
      : null;
    const afterSection = afterSectionId
      ? await Section.findById(afterSectionId)
      : null;

    const newOrder = calculateNewOrder(
      beforeSection ? beforeSection.order : null,
      afterSection ? afterSection.order : null
    );

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { order: newOrder },
      { new: true }
    );

    if (!updatedSection) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    return successResponseHandler(res, "SUCCESS", { section: updatedSection });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const copySection = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const originalSection = await Section.findById(id).populate("tasks").lean();
    if (!originalSection) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const project = await Project.findOne({
      _id: originalSection.project,
      members: { $in: [userId] },
    });
    if (!project) {
      return errorResponseHandler(res, "BAD_REQUEST");
    }

    // Find neighboring sections to determine the new order
    const previousOrder = originalSection.order;
    const nextSection = await Section.findOne({
      project: originalSection.project,
      order: { $gt: previousOrder },
    }).sort({ order: 1 }); // Get the next section by order

    // Calculate new order (if there is a next section, average between; otherwise add a default increment)
    const newOrder = nextSection
      ? (previousOrder + nextSection.order) / 2
      : previousOrder + 1;

    // Create and save the new section
    const newSection = new Section({
      order: newOrder,
      title: `${originalSection.title} (Copy)`,
      project: originalSection.project,
    });

    // Copy and reassign tasks from the original section

    const copiedTasks = originalSection.tasks.map((task: any) => {
      return {
        title: `${task.title} (Copy)`,
        order: task.order,
        due: {
          from: task?.due?.from,
          to: task?.due?.to,
        },
        storyPoints: task?.storyPoints,
        description: task?.description,
        tags: task?.tags,
        assignee: task?.assignee,
        project: project._id,
        taskCreator: task?.taskCreator,
        priority: task?.priority,
        status: task?.status,
      };
    });

    const insertedTasks = await Task.insertMany(copiedTasks);

    // Update the project to include the new section
    const ids = insertedTasks.map((task) => task._id);
    newSection.tasks.push(ids as any);
    project.sections.push(newSection._id);
    await project.save();
    await newSection.save();

    const populateSection = await Section.findById(newSection._id).populate(
      "tasks"
    );

    return successResponseHandler(res, "SUCCESS", {
      section: populateSection,
    });
  } catch (error) {
    console.log("Error copying section: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming middleware sets `req.user`
    const { id } = req.params; // Assuming section ID is sent as a URL parameter

    if (!id) {
      return errorResponseHandler(res, "BAD_REQUEST");
    }

    // Find the section and its associated project
    const section = await Section.findById(id).populate("project");
    if (!section) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const projectId = section.project._id;
    const project = await Project.findById(projectId);

    // Check if the user is authorized to delete the section (project member)
    if (!project || !project.members.includes(userId as Types.ObjectId)) {
      return errorResponseHandler(res, "BAD_REQUEST");
    }

    // Delete the section
    await Section.findByIdAndDelete(id);

    // Update the project to remove the deleted section
    await Project.findByIdAndUpdate(projectId, {
      $pull: { sections: id },
    });

    return successResponseHandler(res, "DELETED", {
      section: {
        id: id,
        title: section.title,
      },
    });
  } catch (error) {
    console.error("Error deleting section: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
