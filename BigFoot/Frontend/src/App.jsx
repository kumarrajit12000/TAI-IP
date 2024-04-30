import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Cart from "./pages/Cart.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import './App.css';
import CategotyProducts from './pages/CategotyProducts.jsx';
import Orders from './pages/Orders.jsx';
import Nocategory from './pages/Nocategory.jsx';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/:category" element={<CategotyProducts />} />
          <Route path="/nocategory" element={<Nocategory />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App