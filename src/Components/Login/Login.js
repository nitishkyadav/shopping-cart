import { Fragment, useRef, useState } from "react";
import classes from "./Login.module.css";
import LoginData from "../../Data/LoginData.json";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../Store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/system";
import { Button, Card, Paper, TextField } from "@mui/material";
import { Pages } from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const navigate = useNavigate();
  const isCartEmpty = useSelector((state) => state.cart.isCartEmpty);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [emailFieldStatus, setEmailFieldStatus] = useState({
    isValid: false,
    msg: "",
  });
  const [isPasswordTouched, setisPasswordTouched] = useState(false);
  const [passwordState, setPasswordState] = useState({
    isValid: false,
    msg: "",
  });

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <Card>
          <Paper
            variant="elevation"
            elevation={3}
            sx={{ background: "blanchedalmond" }}
          >
            <div className={classes.LoginFormContainer}>
              <Stack direction="column" spacing={2}>
                {/* Email Input */}
                {!isEmailTouched && !emailFieldStatus.isValid && (
                  <TextField
                    variant="filled"
                    label="Email"
                    type="email"
                    inputRef={enteredEmail}
                    onBlur={emailOnBlurAction}
                    required
                  />
                )}

                {isEmailTouched && emailFieldStatus.isValid && (
                  <TextField
                    variant="filled"
                    label="Email"
                    type="email"
                    inputRef={enteredEmail}
                    defaultValue={enteredEmail.current.value}
                    onBlur={emailOnBlurAction}
                    required
                  />
                )}

                {isEmailTouched && !emailFieldStatus.isValid && (
                  <TextField
                    variant="filled"
                    label="Email"
                    type="email"
                    inputRef={enteredEmail}
                    onBlur={emailOnBlurAction}
                    defaultValue={enteredEmail.current.value}
                    helperText={emailFieldStatus.msg}
                    required
                    error
                  />
                )}

                {/* Password Input */}
                {!passwordState.isValid && !isPasswordTouched && (
                  <TextField
                    variant="filled"
                    label="Password"
                    type="password"
                    inputRef={enteredPassword}
                    onBlur={passwordBlurAction}
                    required
                  />
                )}

                {passwordState.isValid && isPasswordTouched && (
                  <TextField
                    variant="filled"
                    label="Password"
                    type="password"
                    defaultValue={enteredPassword.current.value}
                    inputRef={enteredPassword}
                    onBlur={passwordBlurAction}
                    required
                  />
                )}

                {!passwordState.isValid && isPasswordTouched && (
                  <TextField
                    variant="filled"
                    label="Password"
                    type="password"
                    defaultValue={enteredPassword.current.value}
                    inputRef={enteredPassword}
                    helperText={passwordState.msg}
                    onBlur={passwordBlurAction}
                    required
                    error
                  />
                )}

                <Button
                  variant="contained"
                  // size="large"
                  sx={{ paddingLeft: 4, paddingRight: 4 }}
                  onClick={formSubmitHandler}
                >
                  Login
                </Button>
              </Stack>
            </div>
          </Paper>
        </Card>
      </div>
    </Fragment>
  );

  //<<<<Helper Functions >>>>//
  // butoon submit handler
  function formSubmitHandler(event) {
    event.preventDefault();
    console.log(event);
    if (matchLoginUserData()) {
      const loggedUserData = matchLoginUserData();
      dispatch(
        authActions.login({
          email: loggedUserData.email,
          name: loggedUserData.name,
        })
      );
      if (isCartEmpty) {
        navigate("/products");
      } else {
        navigate("/checkout");
      }
    }
  }

  // Logic for Data Validation
  function matchLoginUserData() {
    const emailData = LoginData.find(
      (data) => data.email === enteredEmail.current.value
    );

    if (!emailData) {
      setEmailFieldStatus({ isValid: false, msg: "User doesn't exist" });
      return;
    }
    if (emailData.password !== enteredPassword.current.value) {
      setPasswordState({ isValid: false, msg: "Wrong Password" });
      return;
    } else {
      setPasswordState({ isValid: true, msg: "" });
      return emailData;
    }
  }

  // On Blur Handlers
  function emailOnBlurAction() {
    setIsEmailTouched(true);
    const email = enteredEmail.current.value;
    if (!email.toString().includes("@")) {
      setEmailFieldStatus({ isValid: false, msg: "Email is not valid" });
    } else {
      setEmailFieldStatus({ isValid: true, msg: "" });
    }
  }
  function passwordBlurAction() {
    setisPasswordTouched(true);
    const password = enteredPassword.current.value;
    if (password.toString().length < 6) {
      setPasswordState({
        isValid: false,
        msg: "Password must be 6 characters long",
      });
    }
  }
};

export default Login;
