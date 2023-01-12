import { createSlice } from "@reduxjs/toolkit";

let initialLoggedInState;
if (localStorage.getItem("loginState")) {
  initialLoggedInState = JSON.parse(localStorage.getItem("loginState"));
} else {
  initialLoggedInState = {
    isLoggedIn: false,
    loggedInUser: { name: null, email: null },
  };
}

const authSlice = createSlice({
  name: "auth",

  initialState: initialLoggedInState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.loggedInUser.name = action.payload.name;
      state.loggedInUser.email = action.payload.email;

      localStorage.setItem(
        "loginState",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          loggedInUser: state.loggedInUser,
        })
      );
    },

    logout(state) {
      state.isLoggedIn = false;
      state.loggedInUser.name = state.loggedInUser.email = null;

      localStorage.setItem(
        "loginState",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          loggedInUser: state.loggedInUser,
        })
      );
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
