import React from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating";

export default function Product({ product }) {
  return (
    <div className="col-md-3 m-3 card p-2 text-start shadow rounded">
      <div>
        <Link to={`product/${product._id}`}>
          <img
            src={product.image}
            className="img-fluid"
            alt="A product should be here. Something went wrong"
          />
          <h1>{product.name}</h1>
          <Rating
            alt="A product image should be here. Something went wrong"
            style={{ color: "#e68a00" }}
            initialRating={product.rating}
            emptySymbol="far fa-star fa-lg"
            fullSymbol="fas fa-star fa-lg"
            readonly={true}
          />
          <h1>Price: {product.price} €</h1>
        </Link>
      </div>
    </div>
  );
}
