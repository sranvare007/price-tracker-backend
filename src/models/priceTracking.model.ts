import mongoose from "mongoose";

const priceTrackingSchema = new mongoose.Schema({
  productUrl: String,
  triggerPrice: Number,
  emailId: String,
  isPriceTriggered: Boolean,
  createdAt: String,
});

export const PriceTracking = mongoose.model(
  "PriceTracking",
  priceTrackingSchema
);
