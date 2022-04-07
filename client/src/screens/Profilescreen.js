import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/userActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";
export default function Profilescreen() {
  const loginstate = useSelector((state) => state.loginReducer);
  const currentUser = loginstate.currentUser;
  if (!currentUser) {
    window.location.href = "/";
  }
  const { loading, error, success } = useSelector(
    (state) => state.updateReducer
  );
  const [name, setname] = useState(currentUser.name);
  const [email, setemail] = useState(currentUser.email);
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const dispatch = useDispatch();

  const update = (e) => {
    e.preventDefault();
    if (password == cpassword) {
      const updatedUser = {
        name: name,
        email: email,
        password: password,
      };
      dispatch(updateUser(updatedUser, currentUser._id));
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div>
            <h1 className="text-center">Update your profile</h1>
            {loading && <Loading />}
            {error && <Error error="Email is already in use" />}
            {success && (
              <Success success="Update successful, please re-login" />
            )}
            <form onSubmit={update}>
              <input
                required
                type="text"
                placeholder="Enter your name"
                className="form-control mt-5"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
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
