import CartIcon from "../../Assets/CartIcon";
import classes from "./HeaderCartButton.module.css";
import fetchProducts from "../../api/fetchProductsData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderCartButton = (props) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [cartItemsCount, setcartItemsCount] = useState(0);

  useEffect(() => {
    const count = cart.cartItems.reduce(
      (count, item) => (count += item.quantity),
      0
    );
    setcartItemsCount(count);
  }, [cart, cartItemsCount]);

  const buttonClickHandler = (event) => {
    navigate("/cart");
  };

  return (
    <button onClick={buttonClickHandler} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{cartItemsCount}</span>
    </button>
  );
};

export default HeaderCartButton;
