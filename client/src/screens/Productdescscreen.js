import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Review from "../components/Review";
import { getProductById } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

export default function Productdescscreen({ match }) {
  const productid = match.params.id;
  const dispatch = useDispatch();
  const [quantity, setquantity] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => state.getProductByIdReducer
  );

  let addtocart = () => {
    dispatch(addToCart(product, quantity));
  };

  useEffect(() => {
    dispatch(getProductById(productid));
  }, []);

  return (
    <div key={productid}>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error="Something went wrong" />
      ) : (
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card p-3 m-2">
              <h1 className>{product.name}</h1>
              <img
                alt="Product goes here"
                src={product.image}
                className="img-fluid single-product-img"
              />
              <p className="text-start">{product.description}</p>
              <p className="text-start">{product.id}</p>
            </div>
          </div>
          <div className="col-md-6 text-start">
            <div className="m-2">
              <h1>{`Price: ${product.price}€`}</h1>
              <hr />
              <h1>Select quantity:</h1>

              {
                // Remove add to cart if product stock is 0
                product.countInStock == 0 ? (
                  <h4 className="mt-1 mb-1">Out of stock</h4>
                ) : (
                  <div>
                    <select
                      value={quantity}
                      onChange={(e) => {
                        setquantity(e.target.value);
                      }}
                    >
                      {[...Array(product.countInStock).keys()].map(
                        (val, index) => {
                          return (
                            <option key={product.id} value={index + 1}>
                              {index + 1}
                            </option>
                          );
                        }
                      )}
                    </select>
                    <div className="text-end mb-1">
                      <button
                        className="btn btn-dark btn-costum text-end"
                        onClick={addtocart}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                )
              }
              <hr />
              <Review product={product} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
