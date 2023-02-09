import { getFormattedEmail } from "./formattedEmail.helper";
import { getProductName, getProductPrice } from "./scraper.helper";
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

    if (productsTrackingInfo.length <= 0) {
      Logger.info(`Product tracking list is empty!`);
    }

    if (!productsTrackingInfo) {
      Logger.error(`Error getting products tracking info!`);
    }

    if (productsTrackingInfo.length > 0) {
      productsTrackingInfo.forEach(async (item) => {
        Logger.info(`Tracking product with id: ${item._id}`);
        const productPrice = await getProductPrice(item.productUrl as string);
        const productName = await getProductName(item.productUrl as string);
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
            `Trigger price reached reached for product for record ${item._id} with product name ${productName}!`
          );

          await sendSendgridMail(
            item.emailId as string,
            `Trigger price reached for product ${productName}`,
            `The product you added to be tracked has reached it's trigger price`,
            getFormattedEmail(productName, item.productUrl as string),
            `Sent product price trigger email for product ${productName} with record id ${item._id}`
          );
        }
      });
    }
  } catch (error) {
    Logger.error(`Error occoured executing the tracking job ${error}`);
  }
};
