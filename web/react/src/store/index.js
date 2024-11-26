import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersAPI } from "./APIs/UsersAPI";
import { ProductsAPI } from "./APIs/ProductsAPI";
export const Store = configureStore({
  reducer: {
    // not an array, just a bracket notation
    [UsersAPI.reducerPath]: UsersAPI.reducer,
    [ProductsAPI.reducerPath]: ProductsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(UsersAPI.middleware)
      .concat(ProductsAPI.middleware);
  },
});
setupListeners(Store.dispatch);
export {
  useGetUserQuery,
  useLoginMutation,
  useAddUserMutation,
} from "./APIs/UsersAPI";

export {
  useGetProductsQuery,
  useGetTheProductQuery,
  useGetCartItemsQuery,
  useGetTheCartItemsQuery,
  useAddToCartMutation,
  useDeleteCartItemsMutation,
  useEditCartItemsMutation,
} from "./APIs/ProductsAPI";
