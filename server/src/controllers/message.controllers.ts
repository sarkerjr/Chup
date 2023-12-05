import { Request, Response } from 'express';
import asyncHandler from '@/utils/error-handling/asyncHandler';
import messageService from 'services/message.services';

/**
 * @description Create a new message
 */
export const createMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      conversationId,
      messageText,
      user: { id },
    } = req.body;

    const message = await messageService.createMessage(
      id,
      conversationId,
      messageText
    );

    return res.status(201).json(message);
  }
);

/**
 * @description Get a message by ID
 */
export const getMessage = asyncHandler(async (req: Request, res: Response) => {
  const message = await messageService.getMessage(req.params.id);
  if (message) {
    return res.json(message);
  } else {
    return res.status(404).json({ message: 'Message not found' });
  }
});

/**
 * @description Get all messages from a conversation
 */
export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { id: conversationId } = req.params;
  const userId = req.body.user.id;

  const messages = await messageService.getMessages(userId, conversationId);
  return res.json(messages);
});

/**
 * @description Update a message by ID
 */
export const updateMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedMessage = await messageService.updateMessage(
      req.params.id,
      req.body
    );
    if (updatedMessage) {
      return res.json(updatedMessage);
    } else {
      return res.status(404).json({ message: 'Message not found' });
    }
  }
);

/**
 * @description Delete a message by ID
 */
export const deleteMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const deletedMessage = await messageService.deleteMessage(req.params.id);
    if (deletedMessage) {
      return res.json(deletedMessage);
    } else {
      return res.status(404).json({ message: 'Message not found' });
    }
  }
);
