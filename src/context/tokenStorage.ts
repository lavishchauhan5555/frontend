let inMemoryToken: string | null = null;

export const getAccessToken = () => inMemoryToken;

export const setAccessToken = (token: string | null) => {
  inMemoryToken = token;
  if (token) {
    localStorage.setItem('access_token', token);
  } else {
    localStorage.removeItem('access_token');
  }
};

export const loadTokenFromStorage = () => {
  const token = localStorage.getItem('access_token');
  inMemoryToken = token;
  return token;
};
