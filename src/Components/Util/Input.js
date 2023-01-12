import { Fragment } from "react";

const Input = (props) => {
  return (
    <Fragment>
      <label>{props.children}</label>
      <input type="text"></input>
    </Fragment>
  );
};

export default Input;
