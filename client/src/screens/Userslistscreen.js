import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../actions/userActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
export default function Userslistscreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user.email !== "admin@gmail.com") {
    window.location.href = "/";
  }

  const { loading, users, error } = useSelector(
    (state) => state.getAllUsersReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <div>
      <h1 className="text-center mt-1 mb-2">Users list:</h1>
      <div className="table-responsive ms-2 me-2">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>User id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <i
                        className="fas fa-trash-alt icon"
                        onClick={() => {
                          dispatch(deleteUser(user._id));
                        }}
                      ></i>
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
