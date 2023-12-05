import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { login } from '@/store/slices/auth.slice';
import { setSession } from '@/lib/helper';

interface LoginResponse {
  accessToken: string;
}

// RTK Query API
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      LoginResponse,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: 'api/auth/login',
        method: 'POST',
        body: { email, password },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) {
            setSession(data.accessToken);
            dispatch(login(data.accessToken));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registerUser: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
