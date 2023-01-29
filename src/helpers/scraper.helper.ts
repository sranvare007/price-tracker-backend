import { CreateError } from "./../middleware/errorHandlers";
import { load } from "cheerio";
import axios from "axios";
import { globalConstants } from "./../constants/constants";
import { getECommerceBrand } from "./brand.helper";

export const getPrice = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    },
  });

  // Get the HTML code of the webpage
  const html = response.data;
  const $ = load(html);

  const ecommBrand = getECommerceBrand(url);
  if (ecommBrand.toUpperCase() == globalConstants.ECOMMERCE_BRAND["flipkart"]) {
    const productCurrentPrice = $("div._30jeq3 _16Jk6d")
      .text()
      .replace(/[^0-9]/g, "");
    if (isNaN(Number(productCurrentPrice))) {
      throw CreateError.BadRequest("Could not find product info");
    }
    return productCurrentPrice;
  } else if (
    ecommBrand.toUpperCase() == globalConstants.ECOMMERCE_BRAND["amazon"]
  ) {
    const productCurrentPrice = $("span.priceToPay span.a-price-whole")
      .text()
      .replace(/[^0-9]/g, "");
    if (isNaN(Number(productCurrentPrice))) {
      throw CreateError.BadRequest("Could not find product info");
    }
    return productCurrentPrice;
  } else {
    throw CreateError.BadRequest(
      "Currently Only Tracking Amazon and Flipkart products."
    );
  }
};
