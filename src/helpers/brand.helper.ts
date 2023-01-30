import axios from "axios";
import { Logger } from "@utils/logger.utils";
import { EcommerceBrandsType, globalConstants } from "./../constants/constants";
import { CreateError } from "./../middleware/errorHandlers";

export const getECommerceBrand = async (url: string) => {
  try {
    const splitArray: string[] = url.split(".");
    if (
      !splitArray ||
      splitArray.length < 1 ||
      !globalConstants.ECOMMERCE_BRAND[
        splitArray[1] as keyof EcommerceBrandsType
      ]
    ) {
      throw CreateError.BadRequest("Invalid Url provided");
    }
    await axios.get(url);
    return splitArray[1];
  } catch (err) {
    Logger.error(`Error getting the url response in brand name helper`);
    throw CreateError.BadRequest("Invalid Url provided");
  }
};
