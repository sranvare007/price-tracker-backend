import { EcommerceBrandsType, globalConstants } from "./../constants/constants";
import { CreateError } from "./../middleware/errorHandlers";

export const getECommerceBrand = (url: string) => {
  const splitArray: string[] = url.split(".");
  if (
    !splitArray ||
    splitArray.length < 1 ||
    !globalConstants.ECOMMERCE_BRAND[splitArray[1] as keyof EcommerceBrandsType]
  ) {
    throw CreateError.BadRequest("Invalid Url provided");
  }
  return splitArray[1];
};
