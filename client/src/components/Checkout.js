import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";
import Loading from "./Loading";
import Error from "./Error";
import Success from "./Success";

export default function Checkout({ amount }) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.placeOrderReducer
  );
  const tokenHandler = (token) => {
    dispatch(placeOrder(token, amount));
  };

  const validate = () => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {success && <Success success="Ordered placed" />}
      {error && <Error error="Something went wrong" />}
      <StripeCheckout
        token={tokenHandler}
        amount={amount * 100}
        currency="EUR"
        shippingAddress
        stripeKey="pk_test_51JWHDPELOgaxNHUmqStEFknEy65zfI6dIUE7v123Q4f8OillAaBM4cN8P64943KFBcCXRmmM7ZXUWmXMs5hIEvmk00FqlsUsTs"
      >
        <button className="btn btn-dark p-2 m-2" onClick={validate}>
          Pay with Stripe
        </button>
      </StripeCheckout>
    </div>
  );
}
