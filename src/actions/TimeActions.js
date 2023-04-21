export const getHours = (hours = 12) => {
  return [...Array(Number(hours || 12) + 1).keys()];
};
