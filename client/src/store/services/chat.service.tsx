import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithToken } from '../utils';

export const chatApi = createApi({
  reducerPath: 'chat',
  baseQuery: baseQueryWithToken,
  tagTypes: ['Chats'],
  endpoints: (builder) => ({
    readChats: builder.query<any, void>({
      query: () => 'api/conversation',
      providesTags: ['Chats'],
    }),
    readMessages: builder.query<any, string>({
      query: (chatId) => `api/message/${chatId}`,
      providesTags: ['Chats'],
    }),
  }),
});

export const { useReadChatsQuery, useReadMessagesQuery } = chatApi;
