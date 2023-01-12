import { configureStore } from "@reduxjs/toolkit";
import addressDetailsSlice from "./addressDetailsForm-slice";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";
import ordersSlice from "./orders-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
    address: addressDetailsSlice.reducer,
  },
});

export default store;
