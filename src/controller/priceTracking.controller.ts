import { Logger } from "@utils/logger.utils";
import { NextFunction, Request, Response } from "express";
import { priceTrackingService } from "@service/priceTracking.service";

export const priceTrackingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productUrl, triggerPrice, emailId } = req.body;
    const data = await priceTrackingService(productUrl, triggerPrice, emailId);

    res.status(200).send(data);
  } catch (error: any) {
    Logger.error(`Error logging in: ${error}`);
    next(error.message);
  }
};
