/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => {
  let token = "";
  try {
    token = localStorage.getItem("login_token");
  } catch (error) {
    console.log("token not found");
  }
  return token;
};

const ProductsAPI = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getProducts: builder.query({
        query: () => "/products/",
      }),
      getTheProduct: builder.query({
        query: ({ id }) => `/products/${id}/`,
      }),
      getCartItems: builder.query({
        providesTags: (result, error, arg) => {
          const tags = [{ type: "cart-items" }];
          return tags;
        },
        query: () => "/carts/user/",
      }),
      getTheCartItems: builder.query({
        providesTags: (result, error, arg) => {
          const tags = [{ type: "cart-items" }];
          return tags;
        },
        query: ({ id }) => `/carts/user/${id}/`,
      }),
      addToCart: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          const tags = [{ type: "cart-items" }];
          return tags;
        },
        query: ({ productId, amount }) => {
          return {
            url: `/carts/user/`,
            method: "POST",
            body: { product_id: productId, amount },
          };
        },
      }),
      editCartItems: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          const tags = [{ type: "cart-items" }];
          return tags;
        },
        query: ({ productId, amount }) => {
          return {
            url: `/carts/user/`,
            method: "PUT",
            body: { product_id: productId, amount },
          };
        },
      }),
      deleteCartItems: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          const tags = [{ type: "cart-items" }];
          return tags;
        },
        query: ({ cart_item_id }) => {
          return {
            url: `/carts/user/`,
            method: "DELETE",
            body: { cart_item_id },
          };
        },
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useGetTheProductQuery,
  useGetCartItemsQuery,
  useGetTheCartItemsQuery,
  useAddToCartMutation,
  useDeleteCartItemsMutation,
  useEditCartItemsMutation,
} = ProductsAPI;
export { ProductsAPI };
