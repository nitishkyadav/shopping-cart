import { Fragment } from "react";
import classes from "./Loader.module.css";

const Loader = (props) => {
  return (
    <Fragment>
      <div className={classes.loader}>
        <div className={classes.ldsDualRing}></div>
      </div>
    </Fragment>
  );
};

export default Loader;
