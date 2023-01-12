import { Fragment } from "react";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <Fragment>
      <li className={classes["cart-item"]}>
        <div>
          <h2>{props.title}</h2>
          <div className={classes.summary}>
            <span className={classes.price}>{`₹${props.price}/item`}</span>
            <span className={classes.amount}>x {props.quantity}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onRemove}>−</button>
          <button onClick={props.onAdd}>+</button>
        </div>
      </li>
    </Fragment>
  );
};

export default CartItem;
