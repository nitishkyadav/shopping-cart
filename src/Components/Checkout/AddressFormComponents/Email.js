import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressDetailsActions } from "../../../Store/addressDetailsForm-slice";
import { Grid, List, TextField } from "@mui/material";
import ErrorMsg from "./ErrorMsg";

const Email = (props) => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(
    `Must not contain<b>["@", "#", "$", "%", "&", "*"]</b>`
  );
  const enteredEmail = useRef();
  const isEmailValid = useSelector((state) => state.address.isEmailValid);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  return (
    <Fragment>
      <Grid item md={8}>
        <List md={2}></List>
        <List>
          <TextField
            label="Email"
            type="email"
            onChange={emailBlurHandler}
            inputRef={enteredEmail}
            required
          />
          {!isEmailValid && isEmailTouched && <ErrorMsg>{errorMsg}</ErrorMsg>}
        </List>
        <List md={2}></List>
      </Grid>
    </Fragment>
  );

  function emailBlurHandler() {
    setIsEmailTouched(true);
    const email = enteredEmail.current.value.trim();
    if (!email.includes("@")) {
      dispatch(addressDetailsActions.emailReducer({ isValid: false }));
      setErrorMsg("Must contain '@'");
      return;
    }
    if (email.length < 6) {
      dispatch(addressDetailsActions.emailReducer({ isValid: false }));
      setErrorMsg("Must contain atleast 6 characters");
      return;
    } else {
      dispatch(addressDetailsActions.emailReducer({ isValid: true }));
      props.setOrderEmailId(enteredEmail.current.value);
    }
  }
};

export default Email;
