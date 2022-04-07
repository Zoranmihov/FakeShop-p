import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";

export default function Cartscreen() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  let totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-8 card">
        <h1 className="text-center m-2">Cart:</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="text-center">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(addToCart(item, e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(
                          (val, index) => {
                            return (
                              <option value={index + 1}>{index + 1}</option>
                            );
                          }
                        )}
                      </select>
                    </td>
                    <td>{item.quantity * item.price}</td>
                    <td>
                      <i
                        className="fas fa-trash-alt icon"
                        onClick={() => dispatch(deleteFromCart(item))}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <h1 className="text-center m-2">Total:{totalAmount} €</h1>
        <hr />
        <div className="text-center">
          <Checkout amount={totalAmount} />
        </div>
      </div>
    </div>
  );
}
