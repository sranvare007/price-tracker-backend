import { CreateError } from "./../middleware/errorHandlers";
import { load } from "cheerio";
import axios from "axios";
import { globalConstants } from "./../constants/constants";
import { getECommerceBrand } from "./brand.helper";

export const getProductPrice = async (url: string) => {
  const randomUserAgentIndex =
    Math.random() * (globalConstants.USER_AGENT_LIST.length - 0) + 0;
  const randomUserAgentIndexInt = Number(randomUserAgentIndex.toFixed());
  const response = await axios.get(url, {
    headers: {
      "User-Agent": globalConstants.USER_AGENT_LIST[randomUserAgentIndexInt],
    },
  });

  // Get the HTML code of the webpage
  const html = response.data;
  const $ = load(html);

  const ecommBrand = await getECommerceBrand(url);
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

export const getProductName = async (url: string) => {
  const randomUserAgentIndex =
    Math.random() * (globalConstants.USER_AGENT_LIST.length - 0) + 0;
  const randomUserAgentIndexInt = Number(randomUserAgentIndex.toFixed());
  const response = await axios.get(url, {
    headers: {
      "User-Agent": globalConstants.USER_AGENT_LIST[randomUserAgentIndexInt],
    },
  });

  // Get the HTML code of the webpage
  const html = response.data;
  const $ = load(html);

  const ecommBrand = await getECommerceBrand(url);
  if (ecommBrand.toUpperCase() == globalConstants.ECOMMERCE_BRAND["flipkart"]) {
    const productName = $("span.B_NuCI").text();
    return productName;
  } else if (
    ecommBrand.toUpperCase() == globalConstants.ECOMMERCE_BRAND["amazon"]
  ) {
    const productName = $("span#productTitle").text();
    return productName;
  } else {
    throw CreateError.BadRequest(
      "Currently Only Tracking Amazon and Flipkart products."
    );
  }
};

export const getProductDetails = async (url: string) => {
  const randomUserAgentIndex =
    Math.random() * (globalConstants.USER_AGENT_LIST.length - 0) + 0;
  const randomUserAgentIndexInt = Number(randomUserAgentIndex.toFixed());
  const response = await axios.get(url, {
    headers: {
      "User-Agent": globalConstants.USER_AGENT_LIST[randomUserAgentIndexInt],
    },
  });

  // Get the HTML code of the webpage
  const html = response.data;
  const $ = load(html);

  const ecommBrand = await getECommerceBrand(url);
  if (ecommBrand.toUpperCase() == globalConstants.ECOMMERCE_BRAND["flipkart"]) {
    const productName = $("span.B_NuCI").text();
    const productPrice = $("div._16Jk6d").text();
    const productImageUrl = $("img._2amPTt").attr("src");
    const productMrp = $("div._2p6lqe").text();
    const productDiscount = $("div._31Dcoz").text();
    return {
      productName,
      productPrice,
      productImageUrl,
      productMrp,
      productDiscount,
    };
  } else if (
    ecommBrand.toUpperCase() == globalConstants.ECOMMERCE_BRAND["amazon"]
  ) {
    const productName = $("span#productTitle").text().trim();
    const productPrice =
      $(
        "span.reinventPricePriceToPayMargin.priceToPay span.a-offscreen"
      ).text() || $("span.apexPriceToPay span.a-offscreen").text();
    const productImageUrl = $("img#landingImage").attr("src");
    const productMrp =
      $("span.basisPrice span.a-offscreen").text() ||
      $(
        "div#corePrice_desktop span.a-price.a-text-price.a-size-base span.a-offscreen"
      )
        .first()
        .text();
    const productDiscount =
      $("span.savingsPercentage").text() ||
      $(
        "div#corePrice_desktop td.a-span12.a-color-price.a-size-base span.a-color-price"
      )
        .children()
        .remove()
        .end()
        .text()
        .replace(/[^0-9%-]/g, "");
    return {
      productName,
      productPrice,
      productMrp,
      productImageUrl,
      productDiscount,
    };
  } else {
    throw CreateError.BadRequest(
      "Currently Only Tracking Amazon and Flipkart products."
    );
  }
};
