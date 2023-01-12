import classes from "./ProductDetails.module.css";
import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchProduct from "../../../api/fetchProduct";
import AddToCartButton from "./AddToCartButton";
import Loader from "../../UI/Loader";
import { Divider, MenuItem, Paper, TextField } from "@mui/material";

const ProductDetails = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cartItemsQty, setCartItemQty] = useState(1);
  const [productDetail, setProductDetail] = useState({});
  const [isFetched, setIsFetched] = useState({ isLoading: true, isOk: true });

  // Fetching Data from Api
  useEffect(() => {
    fetchProduct(id, setProductDetail, setIsFetched);
  }, [id]);

  return (
    <Fragment>
      <div className={classes.productDetailsContainer}>
        {isFetched.isLoading && isFetched.isOk && <Loader />}
        {!isFetched.isLoading && !isFetched.isOk && navigate("/404")}
        {!isFetched.isLoading && isFetched.isOk && (
          <Paper variant="elevation" elevation={3}>
            <div className={classes.productDetails}>
              {/* Product Image */}
              <div className={classes.imgContainer}>
                <img
                  className={classes.productImg}
                  src={productDetail.image}
                  alt={productDetail.title}
                />
              </div>

              {/* Product Details */}
              <div className={classes.aboutProduct}>
                <div className={classes.innerAbout}>
                  <h1>{productDetail.title}</h1>
                  <li className={classes.productCategory}>
                    {productDetail.category}
                  </li>

                  {/* Rating Container */}
                  <div className={classes.ratingContainer}>
                    <li className={classes.rating}>
                      {productDetail.rating.rate}⭐
                    </li>
                    <li className={classes.reviews}>123 Reviews</li>
                  </div>

                  {/* Horizontal Row */}
                  <Divider light="false" />

                  {/* Price */}
                  <h1>₹{productDetail.price}</h1>

                  {/* Quantity Selector */}
                  <div className={classes.quantitySelector}>
                    <TextField
                      select
                      label="Quantity"
                      onChange={cartQtyHandler}
                      size="small"
                      sx={{ marginTop: "20px" }}
                      defaultValue="1"
                      fullWidth
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                    </TextField>

                    {/* Add to Cart Button */}
                    <AddToCartButton
                      title={productDetail.title}
                      price={productDetail.price}
                      id={productDetail.id}
                      image={productDetail.image}
                      quantity={cartItemsQty}
                    />
                  </div>

                  {/* Product Description */}
                  <div className="classes.productDesc">
                    <h3>PRODUCT DETAILS</h3>
                    <p>{productDetail.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        )}
      </div>
    </Fragment>
  );

  //Helper Functions

  function cartQtyHandler(event) {
    event.preventDefault();
    setCartItemQty(event.target.value);
  }
};

export default ProductDetails;
