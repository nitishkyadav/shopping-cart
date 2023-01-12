import { Fragment } from "react";
import classes from "./ErrorMsg.module.css";

const ErrorMsg = (props) => {
  return (
    <Fragment>
      <p className={classes.errorMsg}>{props.children}</p>
    </Fragment>
  );
};

export default ErrorMsg;
