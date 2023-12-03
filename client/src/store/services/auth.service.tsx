import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    // loginUser: builder.mutation<
    //   LoginResponse,
    //   { email: string; password: string }
    // >({
    //   query: ({ email, password }) => ({
    //     url: 'auth/login',
    //     method: 'POST',
    //     body: { email, password },
    //   }),
    //   onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
    //     try {
    //       const { data } = await queryFulfilled;
    //       if (data.accessToken) {
    //         setSession(data.accessToken);
    //         dispatch(
    //           login({
    //             role: getUserRole(data.accessToken),
    //           })
    //         );
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   },
    // }),
    registerUser: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
