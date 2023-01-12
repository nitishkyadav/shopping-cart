import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: [] }, // will enter array of object with orderItems Array and Total Price
  reducers: {
    addToOrders(state, action) {
      state.orders.push({
        orderItems: action.payload.orderItems,
        totalPrice: action.payload.totalPrice,
        isOrdered: true,
      });
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;
