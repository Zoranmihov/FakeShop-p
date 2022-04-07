import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../actions/productActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

export default function Addproductscreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user.name !== "Admin" && user.email !== "admin@gmail.com") {
    window.location.href = "/";
  }
  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [countinstock, setcountinstock] = useState();
  const [imageurl, setimageurl] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const dispatch = useDispatch();

  const addproduct = (e) => {
    if (price == NaN && countinstock == NaN) {
      alert("Please enter a valid number");
    } else {
      e.preventDefault();
      const product = {
        name: name,
        price: price,
        countInStock: countinstock,
        image: imageurl,
        description: description,
        category,
      };
      dispatch(addProduct(product));
    }
  };

  const { loading, success, error } = useSelector(
    (state) => state.addProductReducer
  );

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h1 className="text-center">Add a new product</h1>
          <form onSubmit={addproduct} className="text-center">
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
              className="btn btn-dark ms-auto me-auto ps-4 pe-4"
            >
              Submit
            </button>
          </form>
          {loading && <Loading />}
          {error && <Error error="Something went wrong" className="mt-2" />}
          {success && <Success success="Product added" className="mt-2" />}
        </div>
      </div>
    </div>
  );
}
