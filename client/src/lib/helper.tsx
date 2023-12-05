import { jwtDecode } from 'jwt-decode';

export const verifyToken = (accessToken: string | null) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode<{ exp: number }>(accessToken.split(' ')[1]);

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
