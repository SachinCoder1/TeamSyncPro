import { Request, Response } from "express";
import { Project, Section, Task, User, Workspace } from "~/model";
import { errorResponseHandler, successResponseHandler } from "~/utils";
import { v4 as uuidv4 } from "uuid";
import { Invitation } from "~/model/invitation";
import { TObjectId } from "~/types";
import { Types } from "mongoose";

// export const createDefaultWorkspace = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     const user = await User.findById(userId);
//     if (user?.onboarding?.step !== "SIGNED_UP") {
//       return errorResponseHandler(res, "CONFLICT");
//     }
//     const workspace = await new Workspace({
//       name: "My Workspace",
//       admin: userId,
//       personal: true,
//       members: [userId],
//     }).save();

//     await User.findByIdAndUpdate(userId, {
//       $push: { workspaces: workspace._id },
//       selectedWorkspace: workspace._id,
//       "onboarding.step": "WORKSPACE_CREATED",
//     });
//     return successResponseHandler(res, "SUCCESS", {
//       workspace,
//     });
//   } catch (error) {
//     return errorResponseHandler(res, "SERVER_ERROR");
//   }
// };

export const createWorkspace = async (req: Request, res: Response) => {
  try {
    const adminId = req.user?.id;
    const { name, membersEmails } = req.body;
    const workspace = new Workspace({
      name: name,
      admin: adminId,
      members: [adminId], // The creator is automatically a member of the workspace
    });

    const invitationPromises = membersEmails.map(async (email: string) => {
      const user = await User.findOne({ email: email.toLowerCase() });

      let userId = null;
      if (user) {
        // Existing user, add to invitedMembers.users
        workspace.invitedMembers?.users.push(user._id);
        userId = { id: user._id, name: user.name, image: user.profileImage };
      } else {
        // New user, add to invitedMembers.emails
        workspace.invitedMembers?.emails.push(email);
      }

      // Create an invitation token
      const invitationToken = uuidv4();

      // Create an invitation record
      const invitation = new Invitation({
        invited_from: adminId,
        invited_to: email,
        workspace: workspace._id,
        invitation_token: invitationToken,
        status: "INVITED",
      });

      await invitation.save();

      // Send invitation email
      // sendInvitationEmail(email, invitationToken, name);

      return { email, userId, invitationToken };
    });

    // Wait for all invitations to be processed
    const invitations = await Promise.all(invitationPromises);

    await workspace.save();
    await User.findByIdAndUpdate(adminId, {
      $push: { workspaces: workspace._id },
    });

    return successResponseHandler(res, "SUCCESS", {
      workspace,
      invitations,
    });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const deleteWorkspace = async (req: Request, res: Response) => {
  try {
    const adminId = req.user?.id;
    const { workspaceId } = req.params;

    // Verify that the requesting user is an admin
    const adminUser = await User.findById(adminId);
    const workspace = await Workspace.findById(workspaceId);
    if (!adminUser || !workspace) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    if (workspace.personal === true) {
      return errorResponseHandler(res, {
        status: 400,
        message: "Personal Workspace cannot be deleted",
      });
    }

    // Check if the admin is an admin of the workspace
    if (workspace.admin != adminId) {
      return errorResponseHandler(res, "BAD_REQUEST");
    }

    const projects = await Project.find({ workspace: workspace._id });

    // Delete all sections and tasks associated with each project
    for (const project of projects) {
      await Section.deleteMany({ project: project._id });
      await Task.deleteMany({ project: project._id });
    }

    // Delete all projects associated with the workspace
    await Project.deleteMany({ workspace: workspace._id });

    // Remove workspace from all users' workspaces array
    await User.updateMany(
      { workspaces: workspace._id },
      { $pull: { workspaces: workspace._id } }
    );

    // Delete all invitations associated with the workspace
    await Invitation.deleteMany({ workspace: workspace._id });

    // Finally, delete the workspace itself
    await Workspace.deleteOne({ _id: workspace._id });

    return successResponseHandler(res, "SUCCESS", {
      workspaceId: workspace._id,
      workspaceName: workspace.name,
    });
  } catch (error) {
    console.error("error: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

// export const inviteMembers = async (req: Request, res: Response) => {
//   try {
//     const id = req.user?.id;
//     const { workspaceId, membersEmails } = req.body;
//     const workspace = await Workspace.findById(workspaceId);
//     if (!workspace) {
//       return errorResponseHandler(res, "NOT_FOUND");
//     }

//     const invitationPromises = membersEmails.map(async (email: string) => {
//       const lowerCaseEmail = email.toLowerCase();
//       const user = await User.findOne({ email: email.toLowerCase() });

//       //  check if invitation is already sent.
//       if (
//         workspace.invitedMembers?.users.includes(user?._id as Types.ObjectId) ||
//         workspace.invitedMembers?.emails.includes(lowerCaseEmail)
//       ) {
//         // Invitation already sent, skip this iteration
//         return null;
//       }

//       let userId = null;
//       if (user) {
//         // Existing user, add to invitedMembers.users
//         workspace.invitedMembers?.users.push(user._id);
//         userId = { id: user._id, name: user.name, image: user.profileImage };
//       } else {
//         // New user, add to invitedMembers.emails
//         workspace.invitedMembers?.emails.push(email);
//       }

//       // Create an invitation token
//       const invitationToken = uuidv4();

//       // Create an invitation record
//       const invitation = new Invitation({
//         invited_from: id,
//         invited_to: email,
//         workspace: workspace._id,
//         invitation_token: invitationToken,
//         status: "INVITED",
//       });

//       await invitation.save();

//       // Send invitation email
//       // sendInvitationEmail(email, invitationToken, name);

//       return { email, userId, invitationToken };
//     });

//     // Wait for all invitations to be processed
//     const invitations = (await Promise.all(invitationPromises)).filter(
//       (invite) => invite !== null
//     );

//     await workspace.save();

//     return successResponseHandler(res, "SUCCESS", {
//       workspace,
//       invitations,
//     });
//   } catch (error) {
//     return errorResponseHandler(res, "SERVER_ERROR");
//   }
// };
