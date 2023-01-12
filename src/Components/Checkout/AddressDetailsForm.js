import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Address.module.css";
import { ordersActions } from "../../Store/orders-slice";
import { cartActions } from "../../Store/cart-slice";
import FullNameInput from "./AddressFormComponents/FullNameInput";
import MobileNumber from "./AddressFormComponents/MobileNumber";
import Pincode from "./AddressFormComponents/Pincode";
import { addressDetailsActions } from "../../Store/addressDetailsForm-slice";
import { Button, Grid } from "@mui/material";
import Email from "./AddressFormComponents/Email";
import AddressInput from "./AddressFormComponents/AddressInput";
import { useState } from "react";

const AddressDetailsForm = (props) => {
  const navigate = useNavigate();
  const [orderedBy, setOrderedBy] = useState("");
  const [orderEmailId, setOrderEmailId] = useState("");
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const isFormValid = useSelector((state) => state.address.isFormValid);
  const dispatch = useDispatch();

  return (
    <Grid container direction="column" spacing={2}>
      <form className={classes.addressForm} onSubmit={formSubmitHandler}>
        <FullNameInput setOrderedBy={setOrderedBy} />
        <MobileNumber />
        <Email setOrderEmailId={setOrderEmailId} />
        <AddressInput />
        <Pincode />

        {isFormValid && (
          <Button variant="contained" onClick={formSubmitHandler}>
            Proceed
          </Button>
        )}
      </form>
    </Grid>
  );

  // Helper Functions

  function formSubmitHandler(event) {
    event.preventDefault();
    dispatch(
      ordersActions.addToOrders({
        orderItems: cartItems,
        totalPrice,
      })
    );
    dispatch(cartActions.emptyCart());
    navigate("/order-success", { replace: true });
    dispatch(addressDetailsActions.resetFormState());
  }
};

export default AddressDetailsForm;
