import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  deleteOrder,
  toggleOrder,
} from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Orderslistscreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user.email !== "admin@gmail.com") {
    window.location.href = "/";
  }

  const { loading, orders, error } = useSelector(
    (state) => state.getAllOrdersReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  return (
    <div>
      <h1 className="text-center">Orders list:</h1>
      <div className="table-responsive ms-3 me-3">
        <table className="table table-bordered text-center mt-1">
          <thead>
            <tr>
              <th>Order id</th>
              <th>Date</th>
              <th>Transaction id</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            {orders &&
              orders.map((order) => {
                return (
                  <tr
                    className="tr-link"
                    onClick={() => {
                      window.location.href = `/ordersinfo/${order._id}`;
                    }}
                  >
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.transactionId}</td>
                    <td>
                      {order.isDelivered ? (
                        <p>Delivered</p>
                      ) : (
                        <p>Order placed</p>
                      )}
                    </td>
                    <td>
                      <i
                        className="fas fa-trash-alt icon me-3"
                        onClick={() => {
                          dispatch(deleteOrder(order._id));
                        }}
                      ></i>
                      {order.isDelivered ? (
                        <i
                          class="fas fa-times icon"
                          onClick={() => {
                            dispatch(toggleOrder(order._id, false));
                          }}
                        ></i>
                      ) : (
                        <i
                          class="fas fa-check icon"
                          onClick={() => {
                            dispatch(toggleOrder(order._id, true));
                          }}
                        ></i>
                      )}
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
