import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../ProductsApi/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from '../cartSlice/cartSlice'
import { authApi } from "../AuthApi/authApi";
import { reviewsApi } from "../reviewsAPI/reviewsApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer, 
    [authApi.reducerPath]: authApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware,authApi.middleware,reviewsApi.middleware),
});

setupListeners(store.dispatch); // 
