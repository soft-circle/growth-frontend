/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProductCreateDTO {
  name?: string;
  brandName?: string;
  growthDisplayName?: string;
  growthProductCode?: string;
  growthHashTags?: string[];
  coupangDisplayName?: string;
  coupangProductCode?: string;
  coupangHashTags?: string[];
  naverDisplayName?: string;
  naverProductCode?: string;
  naverHashTags?: string[];
  gmarketDisplayName?: string;
  gmarketProductCode?: string;
  gmarketHashTags?: string[];
  auctionDisplayName?: string;
  auctionProductCode?: string;
  auctionHashTags?: string[];
  elevenStreetDisplayName?: string;
  elevenStreetProductCode?: string;
  elevenStreetHashTags?: string[];
  accountType?: string;
  seasonMonths?: string[];
  seasonThemes?: string[];
  originalSeller?: string;
  options?: ProductOptionCreateDTO[];
}

export interface ProductOptionCreateDTO {
  name?: string;
  optionImage?: string;
  growthProductOptionCode?: string;
  coupangProductOptionCode?: string;
  naverProductOptionCode?: string;
  gmarketProductOptionCode?: string;
  auctionProductOptionCode?: string;
  elevenStreetProductOptionCode?: string;
  /** @format int32 */
  growthSalesUnit?: number;
  /** @format int32 */
  coupangSalesUnit?: number;
  /** @format int32 */
  naverSalesUnit?: number;
  /** @format int32 */
  gmarketSalesUnit?: number;
  /** @format int32 */
  auctionSalesUnit?: number;
  /** @format int32 */
  elevenStreetSalesUnit?: number;
  /** @format float */
  width?: number;
  /** @format float */
  length?: number;
  /** @format float */
  height?: number;
  /** @format float */
  weight?: number;
  /** @format int32 */
  customerDeliveryFee?: number;
  growthBarcode?: string;
  growthBarcodeImage?: string;
  warehouseSection?: string;
}

export interface CreateProductPayload {
  dto: ProductCreateDTO;
  optionImages?: File[];
  growthBarcodeImages?: File[];
}

export type CreateProductData = string;
