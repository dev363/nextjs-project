export const getHours = (hours = 12) => {
  return [...Array(Number(hours || 12) + 1).keys()];
};

export const currencyValue = (value = 0) => {
  return Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
