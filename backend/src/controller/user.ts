import { Request, Response } from "express";
import { User, Workspace, Project, Task } from "~/model"; // Make sure to import Workspace and Project
import { StarredItem } from "~/model/star";
import { errorResponseHandler, successResponseHandler } from "~/utils";

export const MyDetails = async (req: Request, res: Response) => {
  try {
    // Fetch user details excluding password
    const user = await User.findById(req.user?.id).select("-password").lean();

    // Check if the user exists
    if (!user) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    // Populate workspaces but only with name and id
    user.workspaces = await Workspace.find(
      { _id: { $in: user.workspaces } },
      "name"
    ).lean();
    let selectedWorkspaceDetails;

    // If user has a selected workspace, also fetch and populate projects for that workspace
    if (user.selectedWorkspace) {
      selectedWorkspaceDetails = await Workspace.findById(
        user.selectedWorkspace,
        "name projects"
      ).lean();
      if (selectedWorkspaceDetails) {
        // Populate the projects of the selected workspace
        selectedWorkspaceDetails.projects = await Project.find(
          {
            _id: { $in: selectedWorkspaceDetails.projects },
          },
          "name color icon"
        ).lean(); // Select only required fields
      }
    }

    return successResponseHandler(res, "SUCCESS", {
      user, // Return the modified user object
      selectedWorkspaceDetails,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const updateMyDetails = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      { name, email },
      { new: true }
    )
      .select("-password")
      .lean();

    if (!updatedUser) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    return successResponseHandler(res, "SUCCESS", { user: updatedUser });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all assigned tasks of a user

export const getAssignedTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    // count all the sub tasks of a task and get all the tasks assigned to the user

    const tasks = await Task.aggregate([
      {
        $match: {
          assignee: userId,
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "parentTask",
          as: "subTasks",
        },
      },
      {
        $addFields: {
          subTasksCount: { $size: "$subTasks" },
        },
      },
      {
        $project: {
          subTasks: 0,
        },
      },
    ]);

    type Workflow = "DO_TODAY" | "DO_LATER" | "DO_THIS_WEEK" | "DO_THIS_MONTH";

    // group task by workflow field
    const groupedTasks = tasks.reduce((acc, task) => {
      if (!acc[task.workflow as Workflow]) {
        acc[task.workflow as Workflow] = [];
      }
      acc[task.workflow as Workflow].push(task as any);
      return acc;
    }, {} as Record<Workflow, (typeof Task)[]>);

    return successResponseHandler(res, "SUCCESS", { tasks: groupedTasks });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const getAssignedTasksInSelectedWorkspace = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    // Fetch user details excluding password
    const user = await User.findById(userId).select("selectedWorkspace").lean();

    // Check if the user exists and has a selected workspace
    if (!user || !user.selectedWorkspace) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    // Fetch the selected workspace details
    const selectedWorkspace = await Workspace.findById(user.selectedWorkspace)
      .select("projects")
      .lean();

    if (!selectedWorkspace) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    // Fetch all projects within the selected workspace
    const projectIds = selectedWorkspace.projects;

    // Fetch all tasks assigned to the user within those projects
    const tasks = await Task.find({
      assignee: userId,
      project: { $in: projectIds },
      parentTask: { $exists: false },
    })
      .populate("project", "name color")
      .select("title due status priority workflow done order")
      .lean();

    return successResponseHandler(res, "SUCCESS", { tasks });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const getQueriedTasksOfSelectedWorkspace = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const { searchTerm } = req.query;
    console.log("search term:", searchTerm);
    if (!searchTerm) {
      return successResponseHandler(res, "SUCCESS", { tasks: [] });
    }

    // Fetch user details excluding password
    const user = await User.findById(userId).select("selectedWorkspace").lean();

    // Check if the user exists and has a selected workspace
    if (!user || !user.selectedWorkspace) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    // Fetch the selected workspace details
    const selectedWorkspace = await Workspace.findById(user.selectedWorkspace)
      .select("projects")
      .lean();

    if (!selectedWorkspace) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    // Fetch all projects within the selected workspace
    const projectIds = selectedWorkspace.projects;
    let filter: any = {
      project: { $in: projectIds },
    };

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm as any, "i"); // Case-insensitive regex
      filter = {
        ...filter,
        $or: [
          { title: searchRegex },
          { "status.title": searchRegex },
          { priority: searchRegex },
          // { description: searchRegex }, // Add more fields as necessary
        ],
      };
    }

    // Fetch all tasks assigned to the user within those projects
    const tasks = await Task.find(filter)
      .populate("project", "name color _id")
      .select("title due status priority workflow done order description _id")
      .lean();

    console.log("filter: ", filter);
    console.log("tasks: ", tasks);

    return successResponseHandler(res, "SUCCESS", { tasks });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all liked tasks of a user

export const getLikedTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const tasks = await Task.find({ likedBy: userId })
      .populate("project", "name color")
      .select("title due status priority likesCount subTasksCount workflow")
      .lean();

    return successResponseHandler(res, "SUCCESS", { tasks: tasks });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

/**
 * @user apis
 * let's work on the users api which will have the all the tasks assigned to user, their projects from selected workspace,
 * We can show all the workspaces when the user clicks on profile or navbar
 * updating user profile like adding description, profile image, etc..
 * viewing specific member profile with their assigned tasks, completed tasks
 * Starred projects | Workspaces
 */

// get all the workspaces of a user

export const getWorkspaces = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId).select("workspaces").lean();

    if (!user) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const workspaces = await Workspace.find(
      { _id: { $in: user.workspaces } },
      "name"
    ).lean();

    return successResponseHandler(res, "SUCCESS", { workspaces });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all the projects of selected workspace

export const getProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { workspaceId } = req.params;

    const user = await User.findById(userId).select("selectedWorkspace").lean();

    if (!user) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const selectedWorkspace = user.selectedWorkspace || workspaceId;

    const workspace = await Workspace.findById(selectedWorkspace)
      .select("projects")
      .lean();

    if (!workspace) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const projects = await Project.find(
      { _id: { $in: workspace.projects } },
      "name color icon"
    ).lean();

    return successResponseHandler(res, "SUCCESS", { projects });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// update user profile

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name, email, description, profileImage } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, description, profileImage },
      { new: true }
    )
      .select("-password")
      .lean();

    if (!updatedUser) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    return successResponseHandler(res, "SUCCESS", { user: updatedUser });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get specific member profile

export const getMemberProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .select("name email description profileImage")
      .lean();

    if (!user) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const assignedTasks = await Task.find({ assignee: userId })
      .populate("project", "name color")
      .select("title due status priority likesCount subTasksCount workflow")
      .lean();

    const completedTasks = await Task.find({
      assignee: userId,
      status: "COMPLETE",
    })
      .populate("project", "name color")
      .select("title due status priority likesCount subTasksCount workflow")
      .lean();

    return successResponseHandler(res, "SUCCESS", {
      user,
      assignedTasks,
      completedTasks,
    });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all the starred projects of a user

export const getStarredProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId).select("starredProjects").lean();

    if (!user) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const projects = await Project.find(
      { _id: { $in: user.starredProjects } },
      "name color icon"
    ).lean();

    return successResponseHandler(res, "SUCCESS", { projects });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all the starred workspaces of a user

export const getStarredWorkspaces = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId).select("starredWorkspaces").lean();

    if (!user) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const workspaces = await Workspace.find(
      { _id: { $in: user.starredWorkspaces } },
      "name"
    ).lean();

    return successResponseHandler(res, "SUCCESS", { workspaces });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const getStarredItems = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId);

    if (!user) {
      return errorResponseHandler(res, "NOT_FOUND");
    }
    const starredProjects = await StarredItem.find({
      user: userId,
      workspace: user.selectedWorkspace,
      project: { $exists: true },
    }).populate("project", "name _id color");
    const starredWorkspaces = await StarredItem.find({
      user: userId,
      project: { $exists: false },
    }).populate("workspace", "name _id ");

    return successResponseHandler(res, "SUCCESS", {
      starredProjects,
      starredWorkspaces,
    });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all the tasks of a user

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const tasks = await Task.find({ assignee: userId })
      .populate("project", "name color")
      .select("title due status priority likesCount subTasksCount workflow")
      .lean();

    return successResponseHandler(res, "SUCCESS", { tasks });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// get all the projects of a user

export const getUserProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const projects = await Project.find({ members: userId })
      .select("name color icon")
      .lean();

    return successResponseHandler(res, "SUCCESS", { projects });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// star a project

export const starProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectId = req.params.projectId;
    console.log("project id in the star project: ", projectId);
    const user = await User.findById(userId);

    const starred = new StarredItem({
      user: userId,
      workspace: user?.selectedWorkspace,
      project: projectId,
    });
    await starred.save();
    return successResponseHandler(res, "SUCCESS", { starred: true });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const isStarred = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id, type } = req.params;
    console.log("req.params..................", req.params);
    // const user = await User.findById(userId);

    if (!["project", "workspace"].includes(type)) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    let isStarred = false;
    let payload: any = { user: userId, [type]: id };
    if (type == "workspace") {
      payload["project"] = { $exists: false };
    }
    const item = await StarredItem.findOne(payload);
    if (item) {
      isStarred = true;
    }

    return successResponseHandler(res, "SUCCESS", { starred: isStarred });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// unstar a project

export const unstarProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { projectId } = req.params;
    console.log("project id in the un star project: ", projectId);

    const user = await User.findById(userId);

    await StarredItem.findOneAndDelete({
      workspace: user?.selectedWorkspace,
      user: userId,
      project: projectId,
    });

    return successResponseHandler(res, "SUCCESS", { starred: false });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// star a workspace

// export const starWorkspace = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     const { workspaceId } = req.params;

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $addToSet: { starredWorkspaces: workspaceId } },
//       { new: true }
//     )
//       .select("starredWorkspaces")
//       .lean();

//     if (!updatedUser) {
//       return errorResponseHandler(res, "NOT_FOUND");
//     }

//     return successResponseHandler(res, "SUCCESS", { user: updatedUser });
//   } catch (error) {
//     console.error(error);
//     return errorResponseHandler(res, "SERVER_ERROR");
//   }
// };
export const starWorkspace = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);

    const starred = new StarredItem({
      user: userId,
      workspace: user?.selectedWorkspace,
    });
    await starred.save();
    return successResponseHandler(res, "SUCCESS", { starred: true });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// unstar a workspace

export const unstarWorkspace = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { workspaceId } = req.params;

    await StarredItem.findOneAndDelete({
      workspace: workspaceId,
      user: userId,
    });

    return successResponseHandler(res, "SUCCESS", { starred: false });
  } catch (error) {
    console.error(error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
