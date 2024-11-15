import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import ManageUsers from "./components/ManageUsers"
import Register from "./components/Register"
import AddProduct from "./components/AddProduct"
import ProductDetail from "./components/ProductDetail"
import DeleteProducts from "./components/DeleteProducts"
import EditProduct from "./components/EditProduct"
import CartList from "./components/CartList"
import Search from "./components/Search"
import OrderNow from "./components/OrderNow"
import Orders from "./components/Orders"
import { ToastContainer } from "react-toastify"
import './index.css'
import { Fragment, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import jwt from "jwt-decode"
import 'react-toastify/dist/ReactToastify.css';
import Unauthorized from "./components/Unauthorized"

function App(props) {

  const [role, setRole] = useState("")

  useEffect(() => {
    var excetpions = ["/login", "/register", "/"];
    if (excetpions.indexOf(window.location.pathname) > -1) {
      return;
    }

    const tokenRead = localStorage.getItem("token");

    if (tokenRead == null || tokenRead === "") {
      window.location = "/login"
    }
    else {
      var dateNow = new Date();
      var decodedToken = jwt_decode(tokenRead, { complete: true });
      if (decodedToken.exp >= dateNow.getTime()) {
        localStorage.removeItem("token");
        window.location = "/login"
      }
      const decoded = jwt(tokenRead);
      setRole(decoded["role"])
    }
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/manageUsers" exact element={role === "Admin" ? <ManageUsers /> : <Unauthorized />} />
        <Route path="/addProduct" exact element={role === "Admin" ? <AddProduct /> : <Unauthorized />} />
        <Route path="/productDetail/:id" exact element={<ProductDetail callback={props.callback} />} />
        <Route path="/deleteProducts" exact element={role === "Admin" ? <DeleteProducts callback={props.callback} /> : <Unauthorized />} />
        <Route path="/editProduct/:id" exact element={role === "Admin" ? <EditProduct /> : <Unauthorized />} />
        <Route path="/cartList" exact element={<CartList callback={props.callback} />} />
        <Route path="/search/:query" exact element={<Search />} />
        <Route path="/search/" exact element={<Search />} />
        <Route path="/orderNow" exact element={<OrderNow />} />
        <Route path="/myOrders" exact element={<Orders />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  )
}

export default App
