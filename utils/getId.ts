export const getId = (): number => {
  const randomId = Math.floor(Math.random() * 12345);
  return randomId;
};
