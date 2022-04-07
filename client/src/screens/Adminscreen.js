import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Userslistscreen from "./Userslistscreen";
import Productslistscreen from "./Productslistscreen";
import Orderslistscreen from "./Orderslistscreen";
import Addproductscreen from "./Addproductscreen";
import Editproductscreen from "./Editproductscreen";

export default function Adminscreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user.email !== "admin@gmail.com") {
    window.location.href = "/";
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-12 p-0">
          <ul className="adminpanel w-100 p-0">
            <li>
              <Link className="adminlink p-2" to="/admin/userslist">
                Users
              </Link>
            </li>
            <li>
              <Link className="adminlink" to="/admin/productslist">
                {" "}
                Products
              </Link>
            </li>
            <li>
              <Link className="adminlink" to="/admin/orderslist">
                {" "}
                Orders
              </Link>
            </li>
            <li>
              <Link className="adminlink" to="/admin/addnewproduct">
                {" "}
                Add new product
              </Link>
            </li>
          </ul>

          <Switch>
            <Route path="/admin/userslist" component={Userslistscreen} />
            <Route path="/admin/productslist" component={Productslistscreen} />
            <Route path="/admin/orderslist" component={Orderslistscreen} />
            <Route path="/admin/addnewproduct" component={Addproductscreen} />
            <Route
              path="/admin/editproduct/:productid"
              component={Editproductscreen}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
