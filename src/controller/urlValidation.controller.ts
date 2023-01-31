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
    const { productUrl } = req.body;
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
