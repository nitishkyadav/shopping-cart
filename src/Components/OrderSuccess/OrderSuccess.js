import { Fragment } from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import classes from "./OrderSuccess.module.css";

const OrderSuccess = (props) => {
  const {
    isLoggedIn,
    loggedInUser: { email, name },
  } = useSelector((state) => state.auth);

  const orders = useSelector((state) => state.orders.orders);
  const firstName = name.split(" ")[0];

  const lastOrderDetails = getLastOrderDetails();

  //prettier-ignore
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

  //prettier-ignore
  const months = ["January", "February", "March", "April", "May", "June", "July",
   "August", "September", "October", "November", "December"];
  const deliveryDate = getDeliveryDate();

  return (
    <Fragment>
      <div className={classes.orderWrapper}>
        <div className={classes.orderDetailsWrapper}>
          <div className={classes.orderDetails}>
            <h1>Order Placed Successfully</h1>
            <p>
              <span>{firstName}</span>, Your Order will be delivered on{" "}
              <span>{deliveryDate}</span> by <span>09:00 pm</span>
            </p>
            <p>
              An email will be shortly sent to <span>{email}</span>
            </p>
          </div>
        </div>

        <div className={classes.outer}>
          <div className={classes.orderContentWrapper}>
            {lastOrderDetails.orderItems.map((item) => (
              <OrderItem
                key={item.id}
                title={item.title}
                image={item.image}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );

  function getDeliveryDate() {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const day = days[date.getDay()];
    const updatedDate = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const deliveryDate = `${day}, ${month} ${updatedDate}th, ${year}`;
    return deliveryDate;
  }

  function getLastOrderDetails() {
    const lastOrderIndex = orders.length - 1;
    const lastOrder = orders[lastOrderIndex];
    return lastOrder;
  }
};

export default OrderSuccess;
