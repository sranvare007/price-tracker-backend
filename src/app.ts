import expressWinston from "express-winston";
import { auditLogMiddleware } from "./middleware/auditLog";
import { CreateError } from "./middleware/errorHandlers";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes/parentRouter.routes";
import { HandleError } from "@middleware/errorHandlers";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Logger } from "@utils/logger.utils";
import { trackProductPrices } from "./helpers/trackingJob.helper";

dotenv.config({});

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.hhysvmt.mongodb.net/trackinginfo?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {})
  .then(() => {
    Logger.info(`✔ Connected to database successfully!`);
  })
  .catch((error: unknown) => {
    Logger.error(`✘ Error connecting to database: ${error}`);
    process.exit(1);
  });

export const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
expressWinston.requestWhitelist.push("body");
expressWinston.responseWhitelist.push("body");
app.use(auditLogMiddleware);
app.use(router);
app.use((err: CreateError, req: Request, res: Response, next: NextFunction) => {
  HandleError(err, req, res, next);
});

setInterval(() => {
  trackProductPrices();
}, 10000);
