import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { dispatch } from '.';
import { logout } from './slices/auth.slice';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

export const baseQueryWithToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Get the access token from local storage
  const accessToken = localStorage.getItem('accessToken');

  // Add the access token to the request headers
  let result: any;
  if (typeof args === 'string') {
    result = await baseQuery(
      {
        url: args,
        headers: {
          Authorization: accessToken ?? undefined,
        },
      },
      api,
      extraOptions
    );
  } else {
    result = await baseQuery(
      {
        ...args,
        headers: {
          ...args.headers,
          Authorization: accessToken ?? undefined,
        },
      },
      api,
      extraOptions
    );
  }

  // If the access token is expired, log the user out
  if (result?.error?.status === 401 || result?.error?.status === 403) {
    dispatch(logout());
  }

  return result;
};
