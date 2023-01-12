import { createSlice } from "@reduxjs/toolkit";

const addressDetailsSlice = createSlice({
  name: "addressDetails",
  initialState: {
    isFullNameValid: false,
    isMobileNoValid: false,
    isPincodeValid: false,
    isEmailValid: false,
    isAddressValid: false,
    isFormValid: false,
  },

  reducers: {
    fullNameStateReducer(state, action) {
      state.isFullNameValid = action.payload.isValid;
      if (
        state.isFullNameValid &&
        state.isMobileNoValid &&
        state.isPincodeValid &&
        state.isEmailValid &&
        state.isAddressValid
      ) {
        state.isFormValid = true;
      }
    },
    mobileNumberReducer(state, action) {
      state.isMobileNoValid = action.payload.isValid;
      if (
        state.isFullNameValid &&
        state.isMobileNoValid &&
        state.isPincodeValid &&
        state.isEmailValid &&
        state.isAddressValid
      ) {
        state.isFormValid = true;
      }
    },
    pincodeReducer(state, action) {
      state.isPincodeValid = action.payload.isValid;
      if (
        state.isFullNameValid &&
        state.isMobileNoValid &&
        state.isPincodeValid &&
        state.isEmailValid &&
        state.isAddressValid
      ) {
        state.isFormValid = true;
      } else {
        state.isFormValid = false;
      }
    },

    emailReducer(state, action) {
      state.isEmailValid = action.payload.isValid;
      if (
        state.isFullNameValid &&
        state.isMobileNoValid &&
        state.isPincodeValid &&
        state.isEmailValid &&
        state.isAddressValid
      ) {
        state.isFormValid = true;
      } else {
        state.isFormValid = false;
      }
    },

    addressReducer(state, action) {
      state.isAddressValid = action.payload.isValid;
      if (
        state.isFullNameValid &&
        state.isMobileNoValid &&
        state.isPincodeValid &&
        state.isEmailValid
      ) {
        state.isFormValid = true;
      } else {
        state.isFormValid = false;
      }
    },

    resetFormState(state) {
      state.isFullNameValid =
        state.isMobileNoValid =
        state.isFormValid =
        state.isPincodeValid =
        state.isAddressValid =
        state.isEmailValid =
          false;
    },
  },
});

export const addressDetailsActions = addressDetailsSlice.actions;

export default addressDetailsSlice;
