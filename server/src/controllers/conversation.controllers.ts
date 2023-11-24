import { Request, Response } from 'express';
import asyncHandler from '@/utils/error-handling/asyncHandler';
import conversationService from 'services/conversation.services';

/**
 * @description Create a new conversation
 */
export const createConversation = asyncHandler(
  async (req: Request, res: Response) => {
    const { data, members } = req.body;

    const conversation =
      await conversationService.createConversationWithMembers(data, members);
    return res.status(201).json(conversation);
  }
);

/**
 * @description Get a conversation by ID
 */
export const getConversation = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.body;

    const conversation = await conversationService.getConversation(
      req.params.id,
      userId
    );

    if (conversation) {
      return res.json(conversation);
    } else {
      return res.status(404).json({ message: 'Conversation not found' });
    }
  }
);

/**
 * @description Get all conversations
 */
export const getConversations = asyncHandler(
  async (req: Request, res: Response) => {
    let { userId } = req.body;
    const conversations = await conversationService.getConversations(
      (userId = '656037e9ef6c2819e353328c')
    );
    return res.json(conversations);
  }
);

/**
 * @description Update a conversation by ID
 */
export const updateConversation = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedConversation = await conversationService.updateConversation(
      req.params.id,
      req.body
    );
    if (updatedConversation) {
      return res.json(updatedConversation);
    } else {
      return res.status(404).json({ message: 'Conversation not found' });
    }
  }
);

/**
 * @description Delete a conversation by ID
 */
export const deleteConversation = asyncHandler(
  async (req: Request, res: Response) => {
    const deletedConversation = await conversationService.deleteConversation(
      req.params.id
    );
    if (deletedConversation) {
      return res.json(deletedConversation);
    } else {
      return res.status(404).json({ message: 'Conversation not found' });
    }
  }
);
