import classes from "../../Header/HeaderCartButton.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../Store/cart-slice";

const AddToCartButton = (props) => {
  const dispatch = useDispatch();

  const buttonClickHandler = (event) => {
    event.preventDefault();
    dispatch(
      cartActions.addToCart({
        title: props.title,
        price: Number(props.price),
        quantity: Number(props.quantity),
        image: props.image,
        id: props.id,
      })
    );
  };

  return (
    <button className={classes.button} onClick={buttonClickHandler}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
