import { Typography } from "@mui/material";
import { Fragment } from "react";
import AddressDetailsForm from "./AddressDetailsForm";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  return (
    <Fragment>
      <div className={classes.formContainer}>
        <Typography
          variant="h4"
          component="h1"
          marginLeft="25px"
          marginBottom="15px"
        >
          Checkout Page
        </Typography>
        <AddressDetailsForm />
      </div>
    </Fragment>
  );
};

export default Checkout;
