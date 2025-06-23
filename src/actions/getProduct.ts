// "use server";
// import { getProductUrl } from "@/utils/getApirUrl";
// import { handleError } from "@/utils/handleResponseError";
// import {
//   ProductT,
//   ProductApiResponse,
//   RecommendationApiResponse,
//   SimilarProductsApiResponse,
// } from "@/types/real.product";

// // favor select backend api
// export const getPopularProduct = async (): Promise<ProductT[]> => {
//   const url = getProductUrl("api/general/products");

//   try {
//     const response = await fetch(url, {
//       next: { revalidate: 60 },
//     });
//     if (!response.ok) {
//       throw await handleError(response);
//     }

//     const responseData = (await response.json()) as ProductApiResponse;
//     return responseData.products;
//   } catch (error: unknown) {
//     console.error(error);
//     throw new Error(`An error occurred: ${error}`);
//   }
// };

// export const getCozyEveningProduct = async (): Promise<ProductT[]> => {
//   const url = getProductUrl("api/general/products/category/lotion");

//   try {
//     const response = await fetch(url, {
//       next: { revalidate: 60 },
//     });
//     if (!response.ok) {
//       throw await handleError(response);
//     }

//     const responseData = (await response.json()) as ProductApiResponse;
//     return responseData.products;
//   } catch (error: unknown) {
//     console.error(error);
//     throw new Error(`An error occurred: ${error}`);
//   }
// };

// export const getRecommendationProduct = async (): Promise<ProductT[]> => {
//   const url = getProductUrl("api/recommendation");

//   try {
//     const response = await fetch(url, {
//       next: { revalidate: 60 },
//       credentials: "include",
//     });
//     if (!response.ok) {
//       throw await handleError(response);
//     }

//     const responseData = (await response.json()) as RecommendationApiResponse;
//     return responseData.recommended;
//   } catch (error: unknown) {
//     console.error(error);
//     throw new Error(`An error occurred: ${error}`);
//   }
// };

// export const getProductByCategoriesAndBrands = async (
//   queryParams: Record<string, string>
// ): Promise<ProductT[]> => {
//   const query = new URLSearchParams(queryParams).toString();
//   const url = getProductUrl(`api/general/products?${query}`);

//   try {
//     const response = await fetch(url, {
//       next: { revalidate: 60 },
//       credentials: "include",
//     });
//     if (!response.ok) throw await handleError(response);
//     const responseData = (await response.json()) as ProductApiResponse;
//     return responseData.products;
//   } catch (error) {
//     console.error(error);
//     throw new Error(`An error occurred: ${error}`);
//   }
// };

// export const getSimilarProducts = async (): Promise<ProductT[]> => {
//   const url = getProductUrl("api/general/products/similar/79");

//   try {
//     const response = await fetch(url, {
//       next: { revalidate: 60 },
//       credentials: "include",
//     });

//     if (!response.ok) {
//       throw await handleError(response);
//     }

//     const responseData = (await response.json()) as SimilarProductsApiResponse;
//     return responseData.similarProducts;
//   } catch (error: unknown) {
//     console.error(error);
//     throw new Error(`An error occurred: ${error}`);
//   }
// };

import { safeProductFetch } from "@/lib/api/productHelper";

export const getPopularProduct = () =>
  safeProductFetch("api/general/products", "products");

export const getCozyEveningProduct = () =>
  safeProductFetch("api/general/products/category/lotion", "products");

export const getRecommendationProduct = () =>
  safeProductFetch("api/recommendation", "recommended", true);

export const getSimilarProducts = () =>
  safeProductFetch("api/general/products/similar/79", "similarProducts", true);

export const getProductByCategoriesAndBrands = async (
  queryParams: Record<string, string>
) => {
  const query = new URLSearchParams(queryParams).toString();
  const fullPath = `api/general/products?${query}`;
  return safeProductFetch(fullPath, "products", true);
};
