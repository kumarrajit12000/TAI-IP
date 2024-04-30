import React, { useEffect, useState } from 'react'
import './Cart.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link, useNavigate } from 'react-router-dom';
import Category from './components/Category2'
import axios from 'axios';

const Cart = () => {
  const [verifyUser, setverifyUser] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [Titems, setTitems] = useState(0);
  const verifyUserLogin = () => {
    axios.get('http://localhost:8080/verifyuser')
      .then((res) => {
        if (res.data.status) {
          setverifyUser(true);

        } else {
          setTimeout(() => {
            navigate("/login")
          }, 3000)

        }

        console.log(verifyUser)
      })
      .catch(err => console.log(err));
  }

  const getCart = () => {
    axios.get('http://localhost:8080/getcart')
      .then((res) => {
        setCart([...res.data.cart])
        console.log(res.data)
      })
  }
  const tprice = () => {
    if (cart.length != 0) {
      let tItems = 0;
      const priceArr = cart.map((obj, idx) => {
        tItems++;
        return obj.product[0].price;
      })
      const tprice = priceArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      setPrice(tprice);
      setTitems(tItems);
    }
    else {
      setPrice(0);
      setTitems(0);
    }
  }
  const deleteItem = (id) => {
      console.log(id);
      axios.post("http://localhost:8080/deleteitem",{id})
      .then((res) => {
          if(res.data.status){
            alert("item delete sucessfully...");
            getCart()
            tprice();
          }
      })
  }
  const placeOrder = () => {
      const order = cart;
      axios.post("http://localhost:8080/orders",{order})
      .then((res) => {
        if(res.data.status){
          alert("Order placed successfully...")
        }
      })
  }
  useEffect(() => {
    verifyUserLogin();
    getCart();
    tprice();
  }, [cart.length == 0])

 
  return (
    <>
      {
        verifyUser ? cart.length != 0 ?
          <>
            <Category />
            <h3 style={{textAlign:'center'}}> Cart Details ( Items in cart - {Titems} )</h3>
            <div className="cartDetails">
              <div className="items">
                {
                  cart.map((obj, idx) => {
                    return (
                      <>
                        <div className="item">
                          <div className="img">
                            <img src={obj.product[0].url}></img>
                          </div>
                          <div className="itemDetail" style={{ margin: 'auto 10px' }}>
                            <h4 style={{ margin: '10px 0px' }}>{obj.product[0].name}</h4>
                            <p style={{ margin: '5px 0px' }}>{obj.color},{obj.size}</p>
                            <h3 style={{ display: 'flex', margin: '10px 0px' }}> <div className="rupee"> <CurrencyRupeeIcon style={{ fontSize: '18px', marginTop: '1px' }} /> </div>  {obj.product[0].price} <button style={{ margin: 'auto 50px' }} onClick={() => deleteItem(obj._id)}>Remove</button></h3>
                          </div>
                        </div>

                      </>
                    )

                  })
                }

              </div>
              <div className="tprice">
                <table>
                  <caption><h3>PRICE DETAILS</h3></caption>
                  <tbody>
                  <tr>
                    <th>Price</th>
                    <td><CurrencyRupeeIcon style={{ fontSize: '15px' }} />{price}</td>
                  </tr>
                  <tr>
                    <th>Discount</th>
                    <td><CurrencyRupeeIcon style={{ fontSize: '15px' }} />0</td>
                  </tr>
                  <tr>
                    <th>Dilevary Charges</th>
                    <td><CurrencyRupeeIcon style={{ fontSize: '15px' }} />0</td>
                  </tr>
                  <tr>
                    <th>Total amount</th>
                    <td><CurrencyRupeeIcon style={{ fontSize: '15px' }} />{price}</td>
                  </tr>

                  <tr>
                    <button style={{ backgroundColor: "orange", height: "50px", width: "150%", border: "none" }} onClick={placeOrder}>PLACE ORDER</button>
                  </tr>
                  </tbody>
                </table>

              </div>

            </div>
          </>
           :
           <>
            <Category />
            <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Cart is empty...</h2>
          </>
          :
          <>
            <Category />
            <p style={{ textAlign: 'center', marginTop: '100px' }}>Login to see cart! <br /> redirect to login in 3 seconds ...</p>
          </>
      }

    </>
  )
}

export default Cart