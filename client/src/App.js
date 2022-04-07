import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Homescreen from "./screens/Homescreen";
import Productdescscreen from "./screens/Productdescscreen";
import Cartscreen from "./screens/Cartscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Orderscreen from "./screens/Orderscreen";
import Orderinfoscreen from "./screens/Orderinfoscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import NotFound from "./screens/NotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>
        <Route path="/" component={Homescreen} exact />
        <Route path="/product/:id" component={Productdescscreen} />
        <Route path="/cart" component={Cartscreen} exact />
        <Route path="/login" component={Loginscreen} />
        <Route path="/register" component={Registerscreen} />
        <Route path="/orders" component={Orderscreen} />
        <Route path="/ordersinfo/:orderid" component={Orderinfoscreen} />
        <Route path="/profile" component={Profilescreen} />
        <Route path="/admin" component={Adminscreen} />
        <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
