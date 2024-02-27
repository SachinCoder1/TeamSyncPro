import { MAIL_SETTINGS, transporter } from "./setup";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: to,
      subject: `${subject} - TeamSyncPro`,
      html: html,
    });
    return true;
  } catch (error) {
    console.log("error", error)
    return false;
  }
};
