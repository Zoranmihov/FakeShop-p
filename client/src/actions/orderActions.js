import axios from "axios";

export const placeOrder = (token, total) => (dispatch, getState) => {
  const currentUser = getState().loginReducer.currentUser;
  const demoItems = getState().cartReducer.cartItems;
  let cartItems = [];
  for (let i = 0; i < demoItems.length; i++) {
    let item = {
      name: demoItems[i].name,
      quantity: demoItems[i].quantity,
      price: demoItems[i].price,
      _id: demoItems[i]._id,
    };
    cartItems.push(item);
  }
  dispatch({ type: "PLACE_ORDER_REQUEST" });

  axios
    .post("api/orders/placeorder", { token, total, currentUser, cartItems })
    .then((res) => {
      dispatch({ type: "PLACE_ORDER_SUCCESS" });
      setTimeout(() => {
        localStorage.removeItem("cartItems");
        window.location.href = "/";
      }, 3000);
    })
    .catch((err) => {
      dispatch({ tpye: "PLACE_ORDER_FAILED" });
    });
};

export const getOrdersByUserId = () => (dispatch, getState) => {
  const userid = getState().loginReducer.currentUser._id;
  dispatch({ type: "GET_ORDERSBYUSERID_REQUEST" });
  axios
    .post("/api/orders/getordersbyuserid", { userid: userid })
    .then((res) => {
      dispatch({ type: "GET_ORDERSBYUSERID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ORDERSBYUSERID_FAILED", payload: err });
    });
};

export const getOrderById = (orderid) => (dispatch) => {
  dispatch({ type: "GET_ORDERBYID_REQUEST" });
  axios
    .post("/api/orders/getorderbyid", { orderid: orderid })
    .then((res) => {
      dispatch({ type: "GET_ORDERBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ORDERBYID_FAILED", payload: err });
    });
};

export const getAllOrders = () => (dispatch) => {
  dispatch({ type: "GET_ALL_ORDERS_REQUEST" });
  axios
    .get("/api/orders/getallorders")
    .then((res) => {
      dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ALL_ORDERS_FAILED", payload: err });
    });
};

export const deleteOrder = (orderid) => (dispatch) => {
  dispatch({ type: "DELETE_ORDER_REQUEST" });
  axios
    .post("/api/orders/deleteorder", { orderid })
    .then((res) => {
      dispatch({ type: "DELETE_ORDER_SUCCESS", payload: res.data });
      alert("Order deleted successfuly");
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_ORDER_FAILED", payload: err });
    });
};

export const toggleOrder = (orderid, orderstatus) => (dispatch) => {
  dispatch({ type: "TOGGLE_ORDER_REQUEST" });
  axios
    .post("/api/orders/toggleorder", { orderid, orderstatus })
    .then((res) => {
      dispatch({ type: "TOGGLE_ORDER_SUCCESS", payload: res.data });
      alert("Order updated successfuly");
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "TOGGLE_ORDER_FAILED", payload: err });
    });
};
