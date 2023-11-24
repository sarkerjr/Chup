import { Prisma, prisma } from '@/utils/prisma';
import { Message } from '@prisma/client';

/**
 * Create a new message
 * @returns The created message
 */
const createMessage = async (
  senderId: string,
  conversationId: string,
  messageText: string
) => {
  return await prisma.$transaction(async (tx) => {
    const message = await tx.message.create({
      data: {
        messageText: messageText,
        senderId: senderId,
        conversationId: conversationId,
        seenIds: [senderId],
      },
    });

    await tx.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() },
    });

    return message;
  });
};

/**
 * Get a message by ID
 */
const getMessage = async (id: string): Promise<Message | null> => {
  return await prisma.message.findUnique({
    where: {
      id,
    },
  });
};

/**
 * @description Get all messages from a conversation
 */
const getMessages = async (conversationId: string): Promise<Message[]> => {
  return await prisma.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

/**
 * Update a message by ID
 */
const updateMessage = async (
  id: string,
  data: Prisma.MessageUpdateInput
): Promise<Message | null> => {
  return await prisma.message.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Delete a message by ID
 */
const deleteMessage = async (id: string): Promise<Message | null> => {
  return await prisma.message.delete({
    where: {
      id,
    },
  });
};

export default {
  createMessage,
  getMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
