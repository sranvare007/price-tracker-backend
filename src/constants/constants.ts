export type EcommerceBrandsType = {
  [key: string]: string;
};

export const globalConstants = {
  ECOMMERCE_BRAND: {
    flipkart: "FLIPKART",
    amazon: "AMAZON",
  } as EcommerceBrandsType,
  STATUS: {
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
  },
};
