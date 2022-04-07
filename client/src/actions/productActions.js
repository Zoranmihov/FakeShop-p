import axios from "axios";
import { getState } from "react-redux";

export const getAllProducts = () => (dispatch) => {
  dispatch({ type: "GET_PRODUCTS_REQUEST" });
  axios
    .get("/api/products/getallproducts")
    .then((res) => {
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};

export const getProductById = (productid) => (dispatch) => {
  dispatch({ type: "GET_PRODUCTBYID_REQUEST" });
  axios
    .post("/api/products/getproductbyid", { productid })
    .then((res) => {
      dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTBYID_FAILED", payload: err });
    });
};

export const filterProducts = (searchKey, sortKey, category) => (dispatch) => {
  dispatch({ type: " GET_PRODUCTS_REQUEST" });
  let filteredproducts;

  axios
    .get("/api/products/getallproducts")
    .then((res) => {
      filteredproducts = res.data;

      // This is used to filter the products by name
      if (searchKey) {
        filteredproducts = res.data.filter((product) => {
          return product.name.toLowerCase().includes(searchKey);
        });
      }
      //This is used to sort by price htl or lth
      if (sortKey !== "popular") {
        if (sortKey == "htl") {
          filteredproducts = res.data.sort((a, b) => {
            return -a.price + b.price;
          });
        } else {
          filteredproducts = res.data.sort((a, b) => {
            return a.price - b.price;
          });
        }
      }

      if (category != "all") {
        filteredproducts = res.data.filter((product) => {
          return product.category.toLowerCase().includes(category);
        });
      }
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: filteredproducts });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTS_FAILED" });
    });
};

export const addProductReview = (review, productid) => (dispatch, getState) => {
  dispatch({ type: "ADD_PRODUCT_REVIEW_REQUEST" });
  const currentUser = getState().loginReducer.currentUser;

  axios
    .post("/api/products/addreview", { review, productid, currentUser })
    .then((res) => {
      dispatch({ type: "ADD_PRODUCT_REVIEW_SUCCESS" });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_REVIEW_FAILED" });
    });
};

export const deleteProduct = (productid) => (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_REQUEST" });
  axios
    .post("/api/products/deleteproduct", { productid })
    .then((res) => {
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: res.data });
      alert("Product deleted successfuly");
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_PRODUCT_FAILED", payload: err });
    });
};

export const addProduct = (product) => (dispatch) => {
  dispatch({ type: "ADD_PRODUCT_REQUEST" });
  axios
    .post("/api/products/addproduct", { product })
    .then((res) => {
      dispatch({ type: "ADD_PRODUCT_SUCCESS" });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_FAILED" });
    });
};

export const updateProduct = (productid, updatedproduct) => (dispatch) => {
  dispatch({ type: "UPDATE_PRODUCT_REQUEST" });
  axios
    .post("/api/products/updateproduct", { productid, updatedproduct })
    .then((res) => {
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch((err) => {
      dispatch({ type: "UPDATE_PRODUCT_FAILED" });
    });
};
