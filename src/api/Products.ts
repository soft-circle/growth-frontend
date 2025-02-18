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

import { CreateProductData, CreateProductPayload } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Products<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags product-controller
   * @name CreateProduct
   * @request POST:/products/create
   * @response `200` `CreateProductData` OK
   */
  createProduct = (data: CreateProductPayload, params: RequestParams = {}) =>
    this.request<CreateProductData, any>({
      path: `/products/create`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
}
