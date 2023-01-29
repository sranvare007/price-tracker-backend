import { Logger } from "@utils/logger.utils";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config({});

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendSendgridMail = async (
  to: string,
  subject: string,
  text: string,
  html: string,
  logMessage: string
) => {
  try {
    const msgContents = {
      to: to,
      from: process.env.SENDGRID_VERIFIED_SENDER as string,
      subject: subject,
      text: text,
      html: html,
    };
    await sgMail.send(msgContents);
    Logger.info(logMessage);
  } catch (error) {
    Logger.error(`Error sending mail vi Sendgrid: ${error}`);
  }
};
