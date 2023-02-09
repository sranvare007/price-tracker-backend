import { urlValidationService } from "./../service/urlValidation.service";
import { globalConstants } from "./../constants/constants";
import { Logger } from "@utils/logger.utils";
import { NextFunction, Request, Response } from "express";

export const urlValidationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { productUrl } = req.body;
    productUrl = productUrl.split("?")[0];
    const productDetails = await urlValidationService(productUrl);
    res.status(200).send({
      status: globalConstants.STATUS.SUCCESS,
      message: productDetails,
    });
  } catch (error: any) {
    Logger.error(`Error validating URL in: ${error}`);
    next(error);
  }
};
