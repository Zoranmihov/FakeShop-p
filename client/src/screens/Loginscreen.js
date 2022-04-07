import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { error, loading } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <h1 className="text-center m-2">Login</h1>
        {error && (
          <Error
            className="text-center"
            id="login"
            error="Invalid login credentials"
          />
        )}
        {loading && <Loading className="text-center" />}
        <form onSubmit={login}>
          <input
            required
            type="text"
            placeholder="Enter your email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            required
            type="password"
            placeholder="Enter password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-dark mx-auto mt-2 mb-1 submit-btn"
            >
              Login
            </button>
          </div>
        </form>
        <hr />
        <a id="register-btn" href="/register">
          Click here to sign up
        </a>
      </div>
    </div>
  );
}
