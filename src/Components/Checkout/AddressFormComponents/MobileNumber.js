import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsg from "./ErrorMsg";
import { addressDetailsActions } from "../../../Store/addressDetailsForm-slice";
import { Grid, TextField, List } from "@mui/material";

const MobileNumber = (props) => {
  const dispatch = useDispatch();
  const [isMobileNoTouched, setIsMobileNoTouched] = useState(false);
  const isMobileNoValid = useSelector((state) => state.address.isMobileNoValid);
  const enteredNumber = useRef();

  return (
    <Fragment>
      <Grid item xs={6} md={8}>
        <List>
          <TextField
            label="Mobile Number"
            type="number"
            minLength="10"
            onChange={mobileNumberHandler}
            inputRef={enteredNumber}
            required
          />

          {!isMobileNoValid && isMobileNoTouched && (
            <ErrorMsg>Enter Valid 10 digit Mobile No</ErrorMsg>
          )}
        </List>
      </Grid>
    </Fragment>
  );

  function mobileNumberHandler() {
    setIsMobileNoTouched(true);
    const number = enteredNumber.current.value;
    if (number.toString().length === 10) {
      dispatch(addressDetailsActions.mobileNumberReducer({ isValid: true }));
      // setIsMobileNoTouched(false);
    }
    if (number.toString().length !== 10) {
      dispatch(addressDetailsActions.mobileNumberReducer({ isValid: false }));
      setIsMobileNoTouched(true);
    }
  }
};
export default MobileNumber;
