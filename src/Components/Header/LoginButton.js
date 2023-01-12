import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../Store/auth-slice";
import { cartActions } from "../../Store/cart-slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import classes from "./HeaderCartButton.module.css";

const LoginButton = () => {
  const buttonTxt = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginButtonText, setLoginButtonText] = useState("Login");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      setLoginButtonText("Logout");
    }
    if (!isLoggedIn) {
      setLoginButtonText("Login");
    }
  }, [isLoggedIn]);

  const buttonClickHandler = (event) => {
    event.preventDefault();
    const buttonText = buttonTxt.current.innerText;
    if (buttonText === "Login") {
      navigate("/login");
    }
    if (buttonText === "Logout") {
      dispatch(authActions.logout());
      dispatch(cartActions.emptyCart());
      setLoginButtonText("Login");
      navigate("/");
    }
  };

  return (
    <Fragment>
      <button
        className={classes.button}
        ref={buttonTxt}
        onClick={buttonClickHandler}
      >
        {loginButtonText}
      </button>
    </Fragment>
  );
};

export default LoginButton;
