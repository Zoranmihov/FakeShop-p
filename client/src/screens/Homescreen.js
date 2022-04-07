import { React, useEffect } from "react";
import Product from "../components/Product";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productActions";

export default function Homescreen() {
  const getallproductsstate = useSelector(
    (state) => state.getAllProductsReducer
  );
  const { loading, products, error } = getallproductsstate;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      {products && <Filter />}
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error="Something went wrong" />
        ) : (
          products.map((product) => {
            return <Product product={product} key={product._id} />;
          })
        )}
      </div>
    </div>
  );
}
