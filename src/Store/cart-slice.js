import { createSlice } from "@reduxjs/toolkit";
let initialCartState = {};
if (localStorage.getItem("cart")) {
  initialCartState = JSON.parse(localStorage.getItem("cart"));
} else {
  initialCartState = { cartItems: [], totalPrice: 0, isCartEmpty: true };
}

const cartSlice = createSlice({
  name: "cart",

  initialState: initialCartState,
  // Will push 1. title, 2. Quantity, 3. Price, 4. id, 5. image
  reducers: {
    addToCart(state, action) {
      state.isCartEmpty = false;
      state.totalPrice =
        state.totalPrice +
        action.payload.price.toFixed(2) * action.payload.quantity;
      if (state.cartItems.length > 0) {
        const cartItem = state.cartItems.find(
          (item) => item.title === action.payload.title
        );
        if (!cartItem) {
          state.cartItems = state.cartItems.concat(action.payload);
        }
        if (cartItem) {
          const index = state.cartItems.findIndex(
            (item) => item.title === cartItem.title
          );
          const tempItem = {
            ...cartItem,
            quantity: cartItem.quantity + action.payload.quantity,
          };
          state.cartItems[index] = tempItem;
        }
      }

      if (state.cartItems.length === 0) {
        state.cartItems = state.cartItems.concat(action.payload);
      }
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          totalPrice: state.totalPrice,
          isCartEmpty: state.isCartEmpty,
        })
      );
    },

    removeFromCart(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      const itemDetail = state.cartItems[index];
      state.totalPrice = state.totalPrice - itemDetail.price.toFixed();

      if (itemDetail.quantity === 1) {
        state.cartItems.splice(index, 1);
      }
      if (itemDetail.quantity > 1) {
        const tempDetails = {
          ...itemDetail,
          quantity: itemDetail.quantity - 1,
        };
        console.log(tempDetails);
        state.cartItems[index] = tempDetails;
      }

      if (state.cartItems.length === 0) {
        state.isCartEmpty = true;
      }
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          totalPrice: state.totalPrice,
          isCartEmpty: state.isCartEmpty,
        })
      );
    },

    emptyCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.isCartEmpty = true;

      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          totalPrice: state.totalPrice,
          isCartEmpty: state.isCartEmpty,
        })
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
