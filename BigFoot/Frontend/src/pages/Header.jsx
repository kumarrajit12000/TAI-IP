import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchBar from './components/SearchBar';
import './Header.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [verifyUser, setverifyUser] = useState(false);
  const navigate = useNavigate();
  
  const verifyUserLogin = () => {
    axios.get('http://localhost:8080/verifyuser')
      .then((res) => {
        if (res.data.status) {
          setverifyUser(true);
        }
        console.log(verifyUser)
      })
      .catch(err => console.log(err));
  }

  const logoutUser = () => {
    axios.get('http://localhost:8080/logout')
      .then((res) => {
        if (res.data.status) {
          setverifyUser(false);
          navigate("/login");

          alert("Logout User successfully...")
        }
        console.log(verifyUser)
      })
      .catch(err => console.log(err));
  }
  useEffect(() => {
    verifyUserLogin();
  })


  return (
    <div className='navbar'>
      <div className="logo"><Link to='/'>BIG_FOOT</Link></div>
      <div className="searchBar"><SearchBar /></div>
      <div className='nav-options' >
        {
          verifyUser ? <div className="logout" style={{ fontSize: '15px' }}> <button onClick={logoutUser} style={{border:'none', backgroundColor:'transparent'}}><AccountCircleIcon />LOGOUT </button></div> : <div className="login" style={{ fontSize: '15px' }} s> <Link to='/login'><AccountCircleIcon />LOGIN </Link></div>
        }
        <div className="cart" style={{ fontSize: '15px' }}><Link to='/orders'><ShoppingCartOutlinedIcon />ORDERS</Link></div>
        <div className="cart" style={{ fontSize: '15px' }}><Link to='/cart'><ShoppingCartOutlinedIcon />CART</Link></div>
      </div>
    </div>
  )
}

export default Header