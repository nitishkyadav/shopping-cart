import { Fragment } from "react";
import Header from "./Components/Header/Header";
import Products from "./Components/Products/Products";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProductDetails from "./Components/Products/ProductDetails/ProductDetails";
import Login from "./Components/Login/Login";
import { useSelector } from "react-redux";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess";
import Error from "./Components/Error/Error";

function App() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isCartEmpty = useSelector((state) => state.cart.isCartEmpty);
  // const isOrdered = useSelector((state) => state.orders?[state.orders.length-1].isOrdered);
  return (
    <Fragment>
      {/* <Header></Header> */}
      <Routes>
        <Route path="/" element={<Navigate to="/products" />}></Route>
        <Route path="products" element={<Products />}></Route>
        <Route path="/products/:id" element={<ProductDetails />} />
        {!isLoggedIn && <Route path="login" element={<Login />} />}
        <Route path="/cart" element={<Cart />} />
        {isLoggedIn && !isCartEmpty && (
          <Route path="/checkout" element={<Checkout />}></Route>
        )}
        {/* {isOrdered && isLoggedIn && (
          <Route path="/order-success" element={<OrderSuccess />} />
        )} */}
        {/* {!isOrdered && navigate("/404")}; */}
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Fragment>
  );
}

export default App;
