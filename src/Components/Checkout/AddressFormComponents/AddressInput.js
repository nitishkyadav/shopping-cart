import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressDetailsActions } from "../../../Store/addressDetailsForm-slice";
import { Grid, List, TextField } from "@mui/material";
import ErrorMsg from "./ErrorMsg";

const AddressInput = (props) => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(
    `Must not contain<b>["@", "#", "$", "%", "&", "*"]</b>`
  );
  const enteredName = useRef();
  const isAddressValid = useSelector((state) => state.address.isAddressValid);
  const [isAddressTouched, setIsAddressTouched] = useState(false);

  return (
    <Fragment>
      <Grid item md={8}>
        <List md={2}></List>
        <List>
          <TextField
            label="Address"
            type="text"
            onChange={nameBlurHandler}
            inputRef={enteredName}
            required
          />
          {!isAddressValid && isAddressTouched && (
            <ErrorMsg>{errorMsg}</ErrorMsg>
          )}
        </List>
        <List md={2}></List>
      </Grid>
    </Fragment>
  );

  function nameBlurHandler() {
    setIsAddressTouched(true);
    const name = enteredName.current.value.trim();
    if (name.length < 6) {
      dispatch(addressDetailsActions.addressReducer({ isValid: false }));
      setErrorMsg("Must contain atleast 6 characters");
      return;
    } else if (name.includes("@")) {
      dispatch(addressDetailsActions.addressReducer({ isValid: false }));
      setErrorMsg("Must not contain '@'");
      return;
    } else {
      dispatch(addressDetailsActions.addressReducer({ isValid: true }));
    }
  }
};

export default AddressInput;
