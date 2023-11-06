import { Prisma, prisma } from '@/utils/prisma';
import { Conversation, ConversationMember } from '@prisma/client';

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
          {
            isGroup: false,
          },
          {
            conversationMember: {
              some: {
                profileId: members[0],
              },
            },
          },
          {
            conversationMember: {
              some: {
                profileId: members[1],
              },
            },
          },
        ],
      },
    });

    if (existingConversation) {
      return existingConversation;
    }
  }

  return await prisma.$transaction(async (tx) => {
    const conversation = await tx.conversation.create({
      data,
    });

    // Wait for all member creation promises to complete
    await Promise.all(
      members.map(async (member) => {
        return tx.conversationMember.create({
          data: {
            profileId: member,
            coversationId: conversation.id,
          },
        });
      })
    );

    return conversation;
  });
};

/**
 * Get a conversation by ID
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
      conversationMember: {
        select: {
          id: true,
          profile: {
            select: {
              id: true,
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
      conversation.conversationMember[0].id === senderId
        ? conversation.conversationMember[1]
        : conversation.conversationMember[0];

    conversation.name = `${receiver.profile.firstName} ${receiver.profile.lastName}`;
  }

  return conversation;
};

/**
 * Get all conversations
 */
const getConversations = async (): Promise<Conversation[]> => {
  return await prisma.conversation.findMany();
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
