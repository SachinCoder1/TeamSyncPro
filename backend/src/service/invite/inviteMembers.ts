import { Types } from "mongoose";
import { User, Workspace } from "~/model";
import { v4 as uuidv4 } from "uuid";
import { Invitation } from "~/model/invitation";

export const inviteMembers = async (
  membersEmails: [string],
  workspaceId: Types.ObjectId
) => {
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) return null;
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
      invited_from: { user: workspace.admin?._id },
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
  return invitations;
};
