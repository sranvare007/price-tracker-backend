import { getProductDetails } from "./../helpers/scraper.helper";

export const urlValidationService = async (productUrl: string) => {
  const productDetails = await getProductDetails(productUrl);
  return productDetails;
};
