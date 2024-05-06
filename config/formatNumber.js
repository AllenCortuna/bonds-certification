export const formatNumber = (number) => {
  return number.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
};