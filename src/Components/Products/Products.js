import { Fragment, useEffect, useState } from "react";
import fetchProductsData from "../../api/fetchProductsData";
import Loader from "../UI/Loader";
import classes from "./Products.module.css";
import ProductItem from "./ProductsGrid/ProductItem";

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProductsData(setData, setIsLoading);
  }, []);

  return (
    <Fragment>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={classes.productsContainer}>
          {data.map((data1) => (
            <ProductItem
              key={data1.id}
              id={data1.id}
              title={data1.title}
              image={data1.image}
              description={data1.description}
              rating={data1.rating}
              price={data1.price}
              category={data1.category}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Products;
