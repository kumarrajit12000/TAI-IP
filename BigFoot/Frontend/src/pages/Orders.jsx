import React, { useEffect, useState } from 'react'
import './Orders.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Category from './components/Category2'
import axios from 'axios';

const Orders = () => {

  const [verifyUser, setverifyUser] = useState(false);
  const [orders, setorders] = useState([]);
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

  const getOrders = () => {
    axios.get('http://localhost:8080/getorders')
      .then((res) => {
        setorders([...res.data.orders])
        console.log(res.data)

      })
  }
  const CancelItem = (id) => {
    axios.post("http://localhost:8080/cancelorder", { id })
      .then((res) => {
        if (res.data.status) {
          alert("Cancel order sucessfully...");
          getOrders()
          tprice()
        }
      })
  }
  const tprice = () => {
    if (orders.length != 0) {
      let tItems = 0;
      const priceArr = orders.map((obj, idx) => {
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
  useEffect(() => {
    verifyUserLogin();
    getOrders();
    tprice();
  }, [orders.length == 0])

  return (
    <>
      {
        verifyUser ? orders.length != 0 ?
          <>
            <Category />
            <h3 style={{ textAlign: 'center' }}> Orders Details ( Total Orders - {Titems} )</h3>
            <div className="ordersDetails">
              <div className="items">
                {
                  orders.map((obj, idx) => {
                    return (
                      <>
                        <div className="item">
                          <div className="img">
                            <img src={obj.product[0].url}></img>
                          </div>
                          <div className="itemDetail" style={{ margin: 'auto 10px' }}>
                            <h4 style={{ margin: '10px 0px' }}>{obj.product[0].name}</h4>
                            <p style={{ margin: '5px 0px' }}>{obj.color},{obj.size}</p>
                            <h3 style={{ display: 'flex', margin: '10px 0px' }}> <div className="rupee"> <CurrencyRupeeIcon style={{ fontSize: '18px', marginTop: '1px' }} /> </div>  {obj.product[0].price} <button style={{ margin: 'auto 50px' }} onClick={() => CancelItem(obj._id)}>Remove</button> <p  style={{ fontSize:'13px' }} >Delivered in next 7 days.</p></h3>
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
                  </tbody>
                </table>

              </div>

            </div>
          </>
          :
          <>
            <Category />
            <h2 style={{ textAlign: 'center', marginTop: '100px' }}>You Dont Have Any Order...</h2>
          </>
          :
          <>
            <Category />
            <p style={{ textAlign: 'center', marginTop: '100px' }}>Login to see Orders! <br /> redirect to login in 3 seconds ...</p>
          </>
      }

    </>
  )
}

export default Orders