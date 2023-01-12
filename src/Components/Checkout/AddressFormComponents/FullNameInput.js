import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressDetailsActions } from "../../../Store/addressDetailsForm-slice";
import { Grid, List, TextField } from "@mui/material";
import ErrorMsg from "./ErrorMsg";

const FullNameInput = (props) => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(
    `Must not contain<b>["@", "#", "$", "%", "&", "*"]</b>`
  );
  const enteredName = useRef();
  const isFullNameValid = useSelector((state) => state.address.isFullNameValid);
  const [isFullNameTouched, setIsFullNameTouched] = useState(false);

  return (
    <Fragment>
      <Grid item md={8}>
        <List md={2}></List>
        <List>
          <TextField
            label="Full Name"
            type="text"
            onChange={nameBlurHandler}
            inputRef={enteredName}
            required
          />
          {!isFullNameValid && isFullNameTouched && (
            <ErrorMsg>{errorMsg}</ErrorMsg>
          )}
        </List>
        <List md={2}></List>
      </Grid>
    </Fragment>
  );

  function nameBlurHandler() {
    setIsFullNameTouched(true);
    const name = enteredName.current.value.trim();

    if (name.length < 6) {
      dispatch(addressDetailsActions.fullNameStateReducer({ isValid: false }));
      setErrorMsg("Must contain atleast 6 characters");
      return;
    } else if (name.includes("@")) {
      dispatch(addressDetailsActions.fullNameStateReducer({ isValid: false }));
      setErrorMsg("Must not contain '@'");
      return;
    } else if (name.includes("#")) {
      dispatch(addressDetailsActions.fullNameStateReducer({ isValid: false }));
      setErrorMsg("Must not contain '#'");
      return;
    } else if (name.includes("$")) {
      dispatch(addressDetailsActions.fullNameStateReducer({ isValid: false }));
      setErrorMsg("Must not contain '$'");
      return;
    } else if (name.includes("%")) {
      dispatch(addressDetailsActions.fullNameStateReducer({ isValid: false }));
      setErrorMsg("Must not contain '%'");
      return;
    } else if (name.includes("&")) {
      dispatch(addressDetailsActions.fullNameStateReducer({ isValid: false }));
      setErrorMsg("Must not contain '&'");
      return;
    } else if (name.includes("*")) {
      dispatch(addressDetailsActions.fullNameStateReducer({ isValid: false }));
      setErrorMsg("Must not contain '*'");
      return;
    } else {
      dispatch(addressDetailsActions.fullNameStateReducer({ isValid: true }));
      props.setOrderedBy(enteredName.current.value);
    }
  }
};

export default FullNameInput;
