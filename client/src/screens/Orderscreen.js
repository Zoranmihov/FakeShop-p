import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Orderscreen() {
  const { orders, error, loading } = useSelector(
    (state) => state.getOrdersByUserIdReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      dispatch(getOrdersByUserId());
    } else {
      window.location.href = "/login";
    }
  }, [dispatch]);
  return (
    <div>
      <div className="row justify-content-center ">
        <div className="col-md-8 text-center">
          <h2 className="m-2">My orders:</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Order id</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Transaction id</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading && <Loading />}
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
                        <td>{order.orderAmount}€</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.transactionId}</td>
                        <td>
                          {order.isDelivered ? (
                            <p>Delivered</p>
                          ) : (
                            <p>Order placed</p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                {error && <Error error="Something went wrong" />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
