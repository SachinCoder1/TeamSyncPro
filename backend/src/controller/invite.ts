import { Request, Response } from "express";
import { User, Workspace, Invitation, Project } from "~/model";
import { errorResponseHandler, successResponseHandler } from "~/utils";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";
import { sendEmail } from "~/service/email";

export const inviteUsersToWorkspace = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const { workspaceId, membersEmails } = req.body;
    const admin = await User.findById(id);
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const invitationPromises = membersEmails.map(async (email: string) => {
      const lowerCaseEmail = email.toLowerCase();
      const user = await User.findOne({ email: email.toLowerCase() });

      //  check if invitation is already sent.
      if (
        workspace.invitedMembers?.users.includes(user?._id as Types.ObjectId) ||
        workspace.invitedMembers?.emails.includes(lowerCaseEmail)
      ) {
        // Invitation already sent, skip this iteration
        return null;
      }

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
        invited_from: id,
        invited_to: email,
        workspace: workspace._id,
        invitation_token: invitationToken,
        status: "INVITED",
      });

      await invitation.save();

      // Send invitation email
      await sendEmail(
        email,
        `Invitation to ${workspace.name} `,
        `<h1>
           ${admin?.name} Invited You to join ${workspace.name}     
        </h1>
        <p>You can join It in just 2 mins using the below link</p>
         <a href=http://localhost:3000/invitation/${invitationToken} />
         <p> if the above link do not work please use this ${invitationToken} </p>
        `
      );

      return { email, userId, invitationToken };
    });

    // Wait for all invitations to be processed
    const invitations = (await Promise.all(invitationPromises)).filter(
      (invite) => invite !== null
    );

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

export const inviteMembersToProject = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const { workspaceId, projectId, membersEmails } = req.body;
    const workspace = await Workspace.findById(workspaceId);
    const project = await Project.findById(projectId);

    if (!workspace || !project) {
      return errorResponseHandler(res, "NOT_FOUND");
    }

    const invitationPromises = membersEmails.map(async (email: string) => {
      const lowerCaseEmail = email.toLowerCase();
      const user = await User.findOne({ email: lowerCaseEmail });

      // Check if the user is already a member of the project
      if (project.members.includes(user?._id as Types.ObjectId)) {
        // User is already a member of the project, skip this iteration
        return null;
      }

      if (user) {
        // Existing user, add to invitedMembers.users
        project.invitedMembers?.users.push(user._id);
      } else {
        // New user, add to invitedMembers.emails
        project.invitedMembers?.emails.push(email);
      }

      // Check if invitation is already sent.
      const existingInvitation = await Invitation.findOne({
        invited_to: lowerCaseEmail,
        project: project._id,
      });

      if (existingInvitation) {
        // Invitation already sent, skip this iteration
        console.log("invitation already sent...", existingInvitation);
        return null;
      }

      // Create an invitation token
      const invitationToken = uuidv4();

      // Create an invitation record
      const invitation = new Invitation({
        invited_from: id,
        invited_to: lowerCaseEmail,
        type: "PROJECT",
        workspace: workspace._id,
        project: project._id,
        invitation_token: invitationToken,
        status: "INVITED",
      });

      await invitation.save();

      // Send invitation email
      await sendEmail(
        lowerCaseEmail,
        `Invitation to join ${project.name} in ${workspace.name}`,
        `<h1>${user?.name || "User"}, You're Invited!</h1>
           <p>You have been invited to join the project "${
             project.name
           }" within the workspace "${workspace.name}".</p>
           <p>Accept your invitation here: <a href="http://localhost:3000/invitation/${invitationToken}">Join the Project</a></p>
           <p>If the link above does not work, please use this invitation token: ${invitationToken}</p>`
      );

      return { email, userId: user?._id, invitationToken };
    });

    // Wait for all invitations to be processed
    const invitations = (await Promise.all(invitationPromises)).filter(
      (invite) => invite !== null
    );
    console.log("inviations promises...", invitations);

    // Save the project if there were changes to its members list
    if (invitations.length > 0) {
      console.log("it does come here...");
      await project.save();
    }

    return successResponseHandler(res, "SUCCESS", {
      project,
      invitations,
    });
  } catch (error) {
    console.error("error: ", error);
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
