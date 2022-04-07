import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { getOrderById } from "../actions/orderActions";

export default function Orderinfoscreen({ match }) {
  const dispatch = useDispatch();
  const { loading, order, error } = useSelector(
    (state) => state.getOrderByIdReducer
  );

  useEffect(() => {
    dispatch(getOrderById(match.params.orderid));
  }, [dispatch]);
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      {order && (
        <div>
          <div className="row justify-content-center">
            <div className="col-md-5 card m-1 p-2">
              <h2 className="text-center">Ordered items:</h2>
              <hr />
              {order.orderItems.map((item) => {
                return (
                  <div className="text-start p-2">
                    <p>Name: {item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: {item.quantity * item.price}€</p>
                  </div>
                );
              })}
            </div>
            <div className="col-md-5 card m-1 p-2">
              <h1 className="text-center">Order Details:</h1>
              <hr />
              <p>Order id: {order._id}</p>
              <p>Total amount: {order.orderAmount}</p>
              <p>Date ordered: {order.createdAt.substring(0, 10)}</p>
              <p>Transaction id: {order.transactionId}</p>
              {order.isDelivered ? (
                <p>Status: Delivered</p>
              ) : (
                <p>Status: Pending delivery</p>
              )}
              <hr className="mt-2 mb-2" />
              <div className="p-2">
                <h1 className="text-center">Shipping Details:</h1>
                <p>Address: {order.shippingAdress.address}</p>
                <p>
                  City: {order.shippingAdress.city},{" "}
                  {order.shippingAdress.country}
                </p>
                <p>Postal code: {order.shippingAdress.postalCode}</p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-center">Refund policy:</h1>
            <p className="text-start">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Dignissimos nesciunt vitae dolorum nemo magni perferendis nihil
              aspernatur at pariatur itaque minima, dolorem voluptatibus
              officia! Animi voluptatem repellat dignissimos voluptas
              architecto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
