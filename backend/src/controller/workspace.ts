import { Request, Response } from "express";
import { User, Workspace } from "~/model";
import { errorResponseHandler, successResponseHandler } from "~/utils";
import { v4 as uuidv4 } from "uuid";
import { Invitation } from "~/model/invitation";

export const createDefaultWorkspace = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (user?.onboarding?.step !== "SIGNED_UP") {
      return errorResponseHandler(res, "CONFLICT");
    }
    const workspace = await new Workspace({
      name: "My Workspace",
      admin: userId,
      personal: true,
      members: [userId],
    }).save();

    await User.findByIdAndUpdate(userId, {
      $push: { workspaces: workspace._id },
      selectedWorkspace: workspace._id,
      "onboarding.step": "WORKSPACE_CREATED",
    });
    return successResponseHandler(res, "SUCCESS", {
      workspace,
    });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

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
        invited_from: { user: adminId },
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

    return successResponseHandler(res, "SUCCESS", {
      workspace,
      invitations,
    });
  } catch (error) {
    console.log("error: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
