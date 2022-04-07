import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const cartreducer = useSelector((state) => state.cartReducer);
  const { cartItems } = cartreducer;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          FakeShop
        </a>
        <button
          className="navbar-toggler btn-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i class="far fa-caret-square-down drop-icon"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center">
            {currentUser ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle user-btn"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentUser.name}
                </button>
                <ul
                  id="over-flow"
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {user.email == "admin@gmail.com" ? (
                    <li>
                      <a className="dropdown-item" href="/admin">
                        Admin Pannel
                      </a>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li>
                    <a className="dropdown-item" href="/profile">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/orders">
                      Orders
                    </a>
                  </li>
                  <li
                    className="dropdown-item"
                    href="/logout"
                    onClick={() => dispatch(logoutUser())}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/cart">
                <i className="fas fa-shopping-cart"></i>
                {cartItems.length}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
