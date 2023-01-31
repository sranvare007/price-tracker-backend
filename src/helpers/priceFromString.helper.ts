export const getPriceFromString = (priceString: string) => {
  return Number(priceString.replace(/[^0-9-]/g, ""));
};
