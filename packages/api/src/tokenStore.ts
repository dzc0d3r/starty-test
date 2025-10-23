let accessToken: string | null = null;

export const setToken = (token: string | null): void => {
  accessToken = token;
};

export const getToken = (): string | null => {
  return accessToken;
};
