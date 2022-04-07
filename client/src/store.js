import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  getAllProductsReducer,
  getProductByIdReducer,
  addProductReviewReducer,
  deleteProductReducer,
  addProductReducer,
  updateProductReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  registerNewUserReducer,
  loginReducer,
  updateReducer,
  getAllUsersReducer,
  deleteUserReducer,
} from "./reducers/userReducer";
import {
  placeOrderReducer,
  getOrdersByUserIdReducer,
  getOrderByIdReducer,
  getAllOrdersReducer,
  deleteOrderReducer,
  toggleOrderReducer,
} from "./reducers/orderReducer";

const finalReducer = combineReducers({
  getAllProductsReducer: getAllProductsReducer,
  getProductByIdReducer: getProductByIdReducer,
  cartReducer: cartReducer,
  registerNewUserReducer: registerNewUserReducer,
  loginReducer: loginReducer,
  placeOrderReducer: placeOrderReducer,
  getOrdersByUserIdReducer: getOrdersByUserIdReducer,
  getOrderByIdReducer: getOrderByIdReducer,
  addProductReviewReducer: addProductReviewReducer,
  updateReducer: updateReducer,
  getAllUsersReducer: getAllUsersReducer,
  deleteUserReducer: deleteUserReducer,
  deleteProductReducer: deleteProductReducer,
  addProductReducer: addProductReducer,
  updateProductReducer: updateProductReducer,
  getAllOrdersReducer: getAllOrdersReducer,
  deleteOrderReducer: deleteOrderReducer,
  toggleOrderReducer: toggleOrderReducer,
});

// Pulling items from local storage and if there's none we asign an empty array to the state

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginReducer: {
    currentUser: currentUser,
  },
};

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
