import { urlValidationController } from "./../controller/urlValidation.controller";
import { validationHandler, validators } from "../middleware/validator";
import express, { Router } from "express";
import { priceTrackingController } from "@controller/priceTracking.controller";

export const router: Router = express.Router();

router.post(
  "/trackPrice",
  validationHandler(validators.priceTrackingInfoValidator),
  priceTrackingController
);

router.post(
  "/validateUrl",
  validationHandler(validators.urlValidator),
  urlValidationController
);
