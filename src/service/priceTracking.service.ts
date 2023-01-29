import { globalConstants } from "./../constants/constants";
import { CreateError } from "@middleware/errorHandlers";
import { PriceTracking } from "@models/priceTracking.model";

export const priceTrackingService = async (
  productUrl: string,
  triggerPrice: number,
  emailId: string
) => {
  const priceTrackingInfo = new PriceTracking({
    productUrl,
    triggerPrice,
    emailId,
    isPriceTriggered: false,
    createdAt: new Date().toISOString(),
  });
  const insertResponse = await priceTrackingInfo.save();
  if (!insertResponse) {
    throw CreateError.InternalServerError(
      "Error adding price tracker for the product."
    );
  }
  return {
    status: globalConstants.STATUS.SUCCESS,
    message: "Added price tracker for product successfully.",
  };
};
