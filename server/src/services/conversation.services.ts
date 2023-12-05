import { Prisma, prisma } from '@/utils/prisma';
import { Conversation } from '@prisma/client';

import ApiError from '@/utils/error-handling/ApiError';

/**
 * Create a new conversation
 */
const createConversation = async (
  data: Prisma.ConversationCreateInput
): Promise<Conversation> => {
  return await prisma.conversation.create({
    data,
  });
};

/**
 * @description Create a new conversation with converstaion members
 * @returns Newly created conversation or existing conversation
 */
const createConversationWithMembers = async (
  data: Prisma.ConversationCreateInput,
  members: string[]
) => {
  // Check for existing non-group conversation
  if (!data.isGroup && members.length === 2) {
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { isGroup: false },
          { userIds: { has: members[0] } },
          { userIds: { has: members[1] } },
        ],
      },
    });

    if (existingConversation) {
      return existingConversation;
    }

    // if not exist, create new non-group conversation
    return await prisma.conversation.create({
      data: {
        isGroup: false,
        userIds: members,
      },
    });
  }

  // create group conversation;
  return await prisma.conversation.create({
    data: {
      ...data,
      userIds: members,
    },
  });
};

/**
 * @description Get a conversation by its ID
 */
const getConversation = async (id: string, senderId: string) => {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      isGroup: true,
      lastMessageAt: true,
      users: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
              gender: true,
              phoneNumber: true,
              profilePhoto: true,
            },
          },
        },
      },
    },
  });

  // set conversation name according to receiver name
  if (conversation && !conversation.isGroup) {
    const receiver =
      conversation.users[0].id === senderId
        ? conversation.users[1].profile
        : conversation.users[0].profile;

    conversation.name = `${receiver?.firstName} ${receiver?.lastName}`;
  }

  return conversation;
};

/**
 * @description Get all conversations of a user
 */
const getConversations = async (userId: string) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      userIds: {
        has: userId,
      },
    },
    orderBy: {
      lastMessageAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      isGroup: true,
      lastMessageAt: true,
      users: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
              gender: true,
              phoneNumber: true,
              profilePhoto: true,
            },
          },
        },
      },
      messages: {
        take: 1,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          messageText: true,
          seenIds: true,
        },
      },
    },
  });

  // set non-group conversation name according to receiver name
  return conversations.map((conversation) => {
    if (!conversation.isGroup) {
      const receiver =
        conversation.users[0].id === userId
          ? conversation.users[1].profile
          : conversation.users[0].profile;

      conversation.name = `${receiver?.firstName} ${receiver?.lastName}`;
    }

    return conversation;
  });
};

/**
 * Update a conversation by ID
 */
const updateConversation = async (
  id: string,
  data: Prisma.ConversationUpdateInput
): Promise<Conversation | null> => {
  return await prisma.conversation.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Delete a conversation by ID
 */
const deleteConversation = async (id: string): Promise<Conversation | null> => {
  return await prisma.conversation.delete({
    where: {
      id,
    },
  });
};

export default {
  createConversation,
  createConversationWithMembers,
  getConversation,
  getConversations,
  updateConversation,
  deleteConversation,
};
