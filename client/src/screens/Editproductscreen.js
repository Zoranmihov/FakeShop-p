import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Success from "../components/Success";
import { getProductById, updateProduct } from "../actions/productActions";
export default function Editproductscreen({ match }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user.email !== "admin@gmail.com") {
    window.location.href = "/";
  }
  const { product } = useSelector((state) => state.getProductByIdReducer);
  const { success, error } = useSelector((state) => state.updateProductReducer);
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [countinstock, setcountinstock] = useState();
  const [imageurl, setimageurl] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  useEffect(() => {
    if (product) {
      if (product._id == match.params.productid) {
        setname(product.name);
        setprice(product.price);
        setcountinstock(product.countInStock);
        setimageurl(product.image);
        setcategory(product.category);
        setdescription(product.description);
      } else {
        dispatch(getProductById(match.params.productid));
      }
    } else {
      dispatch(getProductById(match.params.productid));
    }
  }, [dispatch, product]);

  const editproduct = (e) => {
    e.preventDefault();
    const updatedproduct = {
      name: name,
      price: price,
      countInStock: countinstock,
      image: imageurl,
      category: category,
      description: description,
    };
    dispatch(updateProduct(match.params.productid, updatedproduct));
  };

  return (
    <div>
      <h1 className="text-center">Edit product:</h1>
      {product && (
        <div>
          <form onSubmit={editproduct} className="text-center">
            <input
              type="text"
              placeholder="Add a name"
              required
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              className="form-control w-75 mt-2 ms-auto me-auto"
            />
            <input
              type="text"
              placeholder="Add a price"
              required
              value={price}
              onChange={(e) => {
                setprice(Number(e.target.value));
              }}
              className="form-control w-75 mt-2 ms-auto me-auto"
            />
            <input
              type="text"
              placeholder="Add a description"
              required
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              className="form-control w-75 mt-2 ms-auto me-auto"
            />
            <input
              type="text"
              placeholder="Add an image"
              required
              value={imageurl}
              onChange={(e) => {
                setimageurl(e.target.value);
              }}
              className="form-control w-75 mt-2 ms-auto me-auto"
            />
            <select
              placeholder="Pick a category"
              id="select-category"
              className="form-control w-75 mt-2 ms-auto me-auto"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              <option value="electronics">Electronics</option>
              <option value="accesories">Accesories</option>
              <option value="mobiles">Mobiles</option>
            </select>
            <input
              type="text"
              placeholder="Enter the amount of stock"
              required
              value={countinstock}
              onChange={(e) => {
                setcountinstock(Number(e.target.value));
              }}
              className="form-control w-75 mt-2 ms-auto me-auto"
            />
            <button
              type="submit"
              className="btn btn-dark mb-4 ms-auto me-auto ps-4 pe-4"
            >
              Submit
            </button>
          </form>
          {error && (
            <Error error="Something went wrong" className="w-75 mt-2" />
          )}
          {success && (
            <Success success="Product updated" className="w-75 mt-2" />
          )}
        </div>
      )}
    </div>
  );
}
