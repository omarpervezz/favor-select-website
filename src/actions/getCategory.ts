// import { Category, CategoryResponse } from "@/types/category";
// import { getCategoryUrl } from "@/utils/getApirUrl";
// import { handleError } from "@/utils/handleResponseError";

// export const getCategories = async (): Promise<Category[]> => {
//   const url = getCategoryUrl();
//   try {
//     const response = await fetch(url, {
//       next: { revalidate: 60 },
//     });

//     if (!response.ok) {
//       throw await handleError(response);
//     }

//     const responseData = (await response.json()) as CategoryResponse;

//     return responseData.categories;
//   } catch (error: unknown) {
//     console.error("Failed to fetch categories:", error);
//     throw new Error(`An error occurred while fetching categories: ${error}`);
//   }
// };

"use server";

import { Category, CategoryResponse } from "@/types/category";
import { getCategoryUrl } from "@/utils/getApirUrl";
// import { handleError } from "@/utils/handleResponseError";

export const getCategories = async (): Promise<Category[]> => {
  const url = getCategoryUrl();

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.log("⚠️ Skipping category fetch during build");
    }

    const responseData = (await response.json()) as CategoryResponse;

    return responseData.categories;
  } catch (error: unknown) {
    console.warn("⚠️ Skipping category fetch during build:", error);

    return [];
  }
};
