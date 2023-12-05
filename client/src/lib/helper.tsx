import { jwtDecode } from 'jwt-decode';

import { JwtToken } from './types';

export const decodeToken = (accessToken: string): JwtToken => {
  return jwtDecode(accessToken.split(' ')[1]);
};

export const verifyToken = (accessToken: string) => {
  const decoded: JwtToken = decodeToken(accessToken);

  return decoded.exp > Date.now() / 1000;
};

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  } else {
    // clearing entire localStorage upon logout
    localStorage.clear();
  }
};
