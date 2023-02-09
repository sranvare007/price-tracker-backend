import { Logger } from "@utils/logger.utils";
import { NextFunction, Request, Response } from "express";
import { priceTrackingService } from "@service/priceTracking.service";

export const priceTrackingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { productUrl, triggerPrice, emailId } = req.body;
    productUrl = productUrl.split("?")[0];
    const data = await priceTrackingService(productUrl, triggerPrice, emailId);
    res.status(200).send(data);
  } catch (error: any) {
    Logger.error(`Error adding price tracker in: ${error}`);
    next(error);
  }
};
