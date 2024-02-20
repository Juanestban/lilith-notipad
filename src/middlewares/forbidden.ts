export const forbidden = () => {
  return { error: 403, message: 'token missing or invalid' };
};
