import { Request, Response } from "express";
import { User, Workspace, Project } from "~/model"; // Make sure to import Workspace and Project
import { errorResponseHandler, successResponseHandler } from "~/utils";

export const MyDetails = async (req: Request, res: Response) => {
  try {
    console.log("req.user: ", req.user);
    // Fetch user details excluding password
    const user = await User.findById(req.user?.id).select("-password").lean(); // Use lean for faster execution as we just need the JSON data

    // Check if the user exists
    if (!user) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    // Populate workspaces but only with name and id
    user.workspaces = await Workspace.find({ '_id': { $in: user.workspaces } }, 'name').lean();
    let selectedWorkspaceDetails;

    // If user has a selected workspace, also fetch and populate projects for that workspace
    if (user.selectedWorkspace) {
      selectedWorkspaceDetails = await Workspace.findById(user.selectedWorkspace, 'name projects').lean();
      if (selectedWorkspaceDetails) {
        // Populate the projects of the selected workspace
        selectedWorkspaceDetails.projects = await Project.find({
          '_id': { $in: selectedWorkspaceDetails.projects }
        }, 'name color icon').lean(); // Select only required fields
      }
    }

    return successResponseHandler(res, "SUCCESS", {
      user, // Return the modified user object
      selectedWorkspaceDetails
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
