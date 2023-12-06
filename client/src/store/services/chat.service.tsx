import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithToken } from '../utils';

export const chatApi = createApi({
  reducerPath: 'chat',
  baseQuery: baseQueryWithToken,
  tagTypes: ['Conversations', 'Messages'],
  endpoints: (builder) => ({
    readChats: builder.query<any, void>({
      query: () => 'api/conversation',
      providesTags: ['Conversations'],
    }),
    readMessages: builder.query<any, string>({
      query: (chatId) => `api/message/${chatId}`,
      providesTags: ['Messages'],
    }),
    sendMessage: builder.mutation<any, any>({
      query: ({ conversationId, messageText }) => ({
        url: 'api/message',
        method: 'POST',
        body: { conversationId, messageText },
      }),
      invalidatesTags: ['Conversations', 'Messages'],
    }),
  }),
});

export const {
  useReadChatsQuery,
  useReadMessagesQuery,
  useSendMessageMutation,
} = chatApi;
