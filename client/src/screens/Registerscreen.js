import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";
import { registerNewUser } from "../actions/userActions";

export default function Registerscreen() {
  const { loading, error, success } = useSelector(
    (state) => state.registerNewUserReducer
  );

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const dispatch = useDispatch();

  const emailcheck = (email) => {
    const emailfield = document.querySelector("#email-field");
    const subbtn = document.querySelector("#sub-btn");
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = regex.test(email);
    if (valid) {
      emailfield.setAttribute("style", "border-color: green !important");
      subbtn.disabled = false;
    } else {
      emailfield.setAttribute("style", "border-color: red !important");
      subbtn.disabled = true;
    }
  };

  const passcheck = (password) => {
    const passwordfield = document.querySelector("#pass-field");
    const subbtn = document.querySelector("#sub-btn");
    if (password.length < 8) {
      passwordfield.setAttribute("style", "border-color: red !important");
      subbtn.disabled = true;
    } else {
      passwordfield.setAttribute("style", "border-color: green !important");
      subbtn.disabled = false;
    }
  };

  const register = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
    };
    if (password == cpassword) {
      dispatch(registerNewUser(user));
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div>
            <h1 className="text-center">Register</h1>
            {loading && <Loading />}
            {error && <Error error="Email is already in use" />}
            {success && <Success success="Registration successful" />}
            <form onSubmit={register}>
              <input
                required
                type="text"
                maxLength="20"
                minLength="3"
                placeholder="Enter your name"
                className="form-control mt-5"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <input
                required
                id="email-field"
                type="text"
                placeholder="Enter your email"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                  emailcheck(e.target.value);
                }}
              />
              <input
                required
                type="password"
                id="pass-field"
                maxLength="20"
                minLength="8"
                placeholder="Enter password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                  passcheck(e.target.value);
                }}
              />
              <input
                required
                type="password"
                placeholder="Confirm password"
                className="form-control"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />
              <div className="text-end">
                <button
                  type="submit"
                  id="sub-btn"
                  className="btn btn-dark mx-auto mt-4 submit-btn"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
