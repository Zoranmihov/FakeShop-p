import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../actions/productActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Productslistscreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user.email !== "admin@gmail.com") {
    window.location.href = "/";
  }

  const { loading, products, error } = useSelector(
    (state) => state.getAllProductsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      <h1 className="text-center mt-1 mb-2 ">Products list:</h1>
      <div className="table-responsive ms-3 me-3">
        <table className="table table-bordered text-center mt-1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            {products &&
              products.map((product) => {
                return (
                  <tr>
                    <td
                      className="tr-link"
                      onClick={() => {
                        window.location.href = `/product/${product._id}`;
                      }}
                    >
                      {product.name}
                    </td>
                    <td>{product.price}</td>
                    <td>{product.countInStock}</td>
                    <td>{product._id}</td>
                    <td>
                      <i
                        className="fas fa-trash-alt icon me-3"
                        onClick={() => {
                          dispatch(deleteProduct(product._id));
                        }}
                      ></i>
                      <Link to={`/admin/editproduct/${product._id}`}>
                        <i className="fas fa-edit"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
