import classes from "./OrderItems.module.css";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Divider, Typography } from "@mui/material";

const OrderItem = (props) => {
  const price = (props.price * 2).toFixed(2);
  return (
    <Fragment>
      <div className={classes.cartItem}>
        <div className={classes.imgContainer}>
          <img
            className={classes.orderItemImg}
            src={props.image}
            alt={props.name}
          />
        </div>
        <div>
          <ul>
            <Typography component="h3" variant="h6">
              {props.title}
            </Typography>

            <Typography component="li" variant="li">
              Quantity: x{props.quantity}
            </Typography>

            <Typography component="h3" variant="h6">
              Price: {price}
            </Typography>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderItem;
