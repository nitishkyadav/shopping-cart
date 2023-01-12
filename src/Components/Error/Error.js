import { Fragment } from "react";
import classes from "./Error.module.css";

const Error = () => {
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.errorName}>
          <h1>404! Page Not Found</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default Error;
