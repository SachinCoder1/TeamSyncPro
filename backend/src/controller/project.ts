import { Request, Response } from "express";
import { Project, Section, Task, Workspace } from "~/model";
import { errorResponseHandler, successResponseHandler } from "~/utils";

export const createProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming you have middleware that sets `req.user`
    const { name, workspaceId } = req.body;

    // Check if the workspace exists and the user is part of it
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      members: userId,
    });
    if (!workspace) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    // Create a new project
    const project = new Project({
      name,
      admin: userId,
      members: [userId],
      workspace: workspaceId,
      // Generate a random color and use a default icon for simplicity
      color: `#${randomColor}`,
      icon: "DEFAULT",
    });

    const demoTask = new Task({
      title: "Task 1",
      project: project._id,
      section: project.sections[0], // Assuming the first section is 'Todo'
      taskCreator: userId,
      order: 0,
    });

    const defaultSections = [
      { title: "Todo", order: 0, project: project._id, tasks: [demoTask._id] },
      { title: "In Progress", order: 1 },
      { title: "Done", order: 2 },
    ];

    // Create sections and add them to the project
    const createdSections = await Section.insertMany(defaultSections);

    // Add the project ID to the workspace
    workspace.projects.push(project._id);
    const sectionIds = createdSections.map((item) => item._id);
    project.sections.push(...sectionIds);

    await demoTask.save();
    await project.save();
    await workspace.save();

    return successResponseHandler(res, "SUCCESS", {
      project,
    });
  } catch (error) {
    console.error("error: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectId = req.params.projectId;
    if (!projectId) return errorResponseHandler(res, "BAD_REQUEST");
    const { name, color, icon, description } = req.body;

    // Find the project and verify if the user is an admin of the project
    const project = await Project.findOne({
      _id: projectId,
      members: { $in: [userId] },
    });
    if (!project) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    // Prepare the update object
    const updateData = {} as any;
    if (name) updateData.name = name;
    if (color) updateData.color = color;
    if (icon) updateData.icon = icon;
    if (description) updateData.description = description;

    // Update the project with provided fields
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedProject) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    return successResponseHandler(res, "SUCCESS", updatedProject);
  } catch (error) {
    console.error("error: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectId = req.params.projectId;
    if (!projectId) return errorResponseHandler(res, "BAD_REQUEST");

    // Check if the user is an admin of the project or workspace
    const project = await Project.findById(projectId);
    if (!project) {
      return errorResponseHandler(res, "NOT_FOUND");
    }
    if (project.admin != userId) {
      return errorResponseHandler(res, "BAD_REQUEST");
    }

    // Delete all sections and tasks associated with the project
    await Section.deleteMany({ project: projectId });
    await Task.deleteMany({ project: projectId });

    // Remove the project from the workspace
    await Workspace.findByIdAndUpdate(project.workspace, {
      $pull: { projects: projectId },
    });

    // Finally, delete the project itself
    await Project.findByIdAndDelete(projectId);

    return successResponseHandler(res, "SUCCESS", {
      project: {
        name: project.name,
        id: project._id,
      },
    });
  } catch (error) {
    console.error("Error deleting project: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
