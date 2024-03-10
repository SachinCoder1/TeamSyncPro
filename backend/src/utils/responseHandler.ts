import { Response } from "express";

interface CustomMessage {
  status: number;
  message: string;
}

export const errorMessages = {
  BAD_REQUEST: { status: 400, message: "Bad request" },
  UNAUTHORIZED: { status: 401, message: "UNAUTHORIZED" },
  FORBIDDEN: { status: 403, message: "Permission Required" },
  NOT_FOUND: { status: 404, message: "Resource not found" },
  CONFLICT: { status: 409, message: "CONFLICT" },
  SERVER_ERROR: { status: 500, message: "Internal server error" },
};

export type MessageKeys = keyof typeof errorMessages;

export const errorResponseHandler = (
  res: Response,
  messageKey: MessageKeys | CustomMessage
) => {
  if (typeof messageKey === "string") {
    const { status, message } = errorMessages[messageKey];
    return res.status(status).json({
      status,
      message,
    });
  }

  const { status, message } = messageKey;
  return res.status(status).json({
    status,
    message,
  });
};

// success response handler

// messages

export const successMessages = {
  SUCCESS: { status: 200, message: "SUCCESS" },
  CREATED: { status: 201, message: "CREATED" },
  UPDATED: { status: 200, message: "UPDATED" },
  DELETED: { status: 200, message: "DELETED" },
};

export type SuccessMessageKeys = keyof typeof successMessages;

export const successResponseHandler = (
  res: Response,
  messageKey: SuccessMessageKeys | CustomMessage,
  data: any
) => {
  if (typeof messageKey === "string") {
    const { status, message } = successMessages[messageKey];
    return res.status(status).json({
      status,
      message,
      data,
    });
  }
  const { status, message } = messageKey;
  return res.status(status).json({
    status,
    message,
    data,
  });
};
