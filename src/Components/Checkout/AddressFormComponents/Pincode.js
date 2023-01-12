import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressDetailsActions } from "../../../Store/addressDetailsForm-slice";
import { Grid, List, TextField } from "@mui/material";
import ErrorMsg from "./ErrorMsg";

const Pincode = (props) => {
  const isPincodeValid = useSelector((state) => state.address.isPincodeValid);
  const [isPincodeTouched, setIsPincodeTouched] = useState(false);
  const enteredPincode = useRef();
  const dispatch = useDispatch();
  return (
    <Fragment>
      <Grid item xs={6} md={8}>
        <List>
          <TextField
            label="Pincode"
            type="number"
            placeholder="6 digits [0-9] Pin code"
            minLength="6"
            onChange={pincodeHandler}
            inputRef={enteredPincode}
            required
          />
          {!isPincodeValid && isPincodeTouched && (
            <ErrorMsg>"Enter Valid 6 digit Pincode</ErrorMsg>
          )}
        </List>
      </Grid>
    </Fragment>
  );

  function pincodeHandler() {
    setIsPincodeTouched(true);
    const pincode = enteredPincode.current.value;

    if (pincode.toString().length !== 6) {
      dispatch(addressDetailsActions.pincodeReducer({ isValid: false }));
    } else {
      dispatch(addressDetailsActions.pincodeReducer({ isValid: true }));
    }
  }
};

export default Pincode;
