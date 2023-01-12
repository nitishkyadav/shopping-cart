import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../Store/cart-slice";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, isCartEmpty } = useSelector(
    (state) => state.cart
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const Items = (
    <Fragment>
      <ul className={classes["cart-items"]}>
        {cartItems.length === 0 && <h1>No Items are added to cart</h1>}
        {cartItems.length > 0 &&
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              title={item.title}
              quantity={item.quantity}
              price={item.price}
              id={item.id}
              image={item.image}
              onAdd={cartItemAddHandler.bind(null, item)}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
          ))}
      </ul>
    </Fragment>
  );

  return (
    // <Modal onClose={props.onClose}>
    <Fragment>
      <div className={classes.cartItems}>
        {Items}
        <div className={classes.buttons}>
          <div className={classes.total}>
            <span>{`Total Amount : ₹`}</span>
            <span>{`${totalPrice}`}</span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={closeButtonHandler}
            >
              Close
            </button>

            {isCartEmpty && (
              <Fragment>
                <button
                  className={classes.button}
                  onClick={checkOutHandler}
                  disabled
                >
                  Order
                </button>

                <button
                  className={classes.button}
                  onClick={cartEmptyHandler}
                  disabled
                >
                  Empty Cart
                </button>
              </Fragment>
            )}

            {!isCartEmpty && (
              <Fragment>
                <button className={classes.button} onClick={checkOutHandler}>
                  Order
                </button>

                <button className={classes.button} onClick={cartEmptyHandler}>
                  Empty Cart
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
    // </Modal>
  );

  function cartItemRemoveHandler(id) {
    console.log(id);
    dispatch(cartActions.removeFromCart(id));
  }

  function cartItemAddHandler(item) {
    console.log(item);
    dispatch(cartActions.addToCart({ ...item, quantity: 1 }));
  }

  function closeButtonHandler(event) {
    event.preventDefault();
    navigate(-1);
  }

  function checkOutHandler(event) {
    event.preventDefault();
    if (isLoggedIn) {
      navigate("/checkout");
    }
    if (!isLoggedIn) {
      navigate("/login");
    }
  }

  function cartEmptyHandler(event) {
    event.preventDefault();
    dispatch(cartActions.emptyCart());
  }
};

export default Cart;
