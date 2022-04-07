import { React, useState } from "react";
import { useDispatch } from "react-redux";
import Rating from "react-rating";
import { addProductReview } from "../actions/productActions";

export default function Review({ product }) {
  const dispatch = useDispatch();
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");

  const sendreview = (rating, comment) => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    } else {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let alreadyreviewed = false;
      product.reviews.forEach((element) => {
        if (element.userid == currentUser._id) {
          alreadyreviewed = true;
        }
      });
      if (alreadyreviewed) {
        alert("You have already reviewed this product");
        setcomment("");
      } else {
        const review = {
          rating: rating,
          comment: comment,
        };

        dispatch(addProductReview(review, product._id));
        setcomment("");
      }
    }
  };

  return (
    <div className="mt-1">
      <h2 className="text-center">Review this product:</h2>
      <Rating
        className="mt-1"
        initialRating={rating}
        style={{ color: "#e68a00" }}
        emptySymbol="far fa-star fa-lg"
        fullSymbol="fas fa-star fa-lg"
        onChange={(e) => {
          setrating(e);
        }}
      />
      <input
        type="text"
        placeholder="Write your review"
        className="form-control mt-2"
        value={comment}
        onChange={(e) => {
          setcomment(e.target.value);
        }}
      />
      <button
        className="btn btn-dark mt-1 mb-1"
        onClick={() => {
          sendreview(rating, comment);
        }}
      >
        Submit
      </button>
      <hr />
      <h2>Reviews:</h2>
      {product.reviews &&
        product.reviews.map((review) => {
          return (
            <div className="card">
              <Rating
                className="mt-1 text-center"
                initialRating={review.rating}
                style={{ color: "#e68a00" }}
                emptySymbol="far fa-star fa-lg"
                fullSymbol="fas fa-star fa-lg"
                readonly={true}
              />
              <h3 className="p-2">
                User {review.name}: {review.comment}
              </h3>
            </div>
          );
        })}
    </div>
  );
}
