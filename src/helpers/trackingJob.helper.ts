import { getPrice } from "./scraper.helper";
import { PriceTracking } from "@models/priceTracking.model";
import { Logger } from "@utils/logger.utils";
import { sendSendgridMail } from "./sendMail.helper";

export const trackProductPrices = async () => {
  try {
    Logger.info(
      `Started tracking prices for products at ${new Date().toISOString()}`
    );

    const productsTrackingInfo = await PriceTracking.find({
      isPriceTriggered: false,
    });

    if (!productsTrackingInfo) {
      Logger.error(`Error getting products tracking info!`);
    }

    if (productsTrackingInfo.length > 0) {
      productsTrackingInfo.forEach(async (item) => {
        const productPrice = await trackPrice(item.productUrl as string);
        if (Number(productPrice) <= Number(item.triggerPrice)) {
          await PriceTracking.findOneAndUpdate(
            {
              _id: item._id,
            },
            {
              isPriceTriggered: true,
            }
          );

          Logger.info(
            `Trigger price reached reached for product for record ${item._id}!`
          );

          await sendSendgridMail(
            item.emailId as string,
            "Trigger price reached for product",
            `The product you added to be tracked for has reached it's trigger price ${item.productUrl}`,
            `<p>Reached trigger price</p><br /><a href="${item.productUrl}">Product link</a>`,
            `Sent product price trigger email for record id ${item._id}`
          );
        }
      });
    }
  } catch (error) {
    Logger.error(`Error occoured executing the tracking job ${error}`);
  }
};

const trackPrice = async (productUrl: string) => {
  const productPrice = getPrice(productUrl);
  return productPrice;
};
