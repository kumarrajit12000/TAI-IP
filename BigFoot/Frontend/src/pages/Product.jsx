import React, { useState,useEffect } from 'react'
import Header from './Header'
import Category from './components/Category2'
import "./Product.css";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Product = () => {

  const product_id = useParams()
  console.log(product_id);

  const [product,setProduct] = useState([]);

  const [color,setColor] = useState("black");
  const [size,setSize] = useState(8);
  
  const updateSize = (evt) => {
    setSize(evt.target.value);
  }
  const updateColor = (evt) => {
    setColor(evt.target.value);
  }
  
  const getData = () => {
  
    axios.post("http://localhost:8080/products",{product_id})
    .then((res) => { 
      console.log(res.data.product)
      setProduct(res.data.product[0])
    });
  }

  useEffect(() => {
    getData()
    console.log(product)
  },[])


  const addToCart = () => {
    axios.post("http://localhost:8080/addtocart",{product_id,color,size})
    .then((res) => { 
      console.log(res.data)
      if(res.data.status){
        alert("Item added Sucessfully...")
      }
      else if(res.data.message == 'alreadyExist'){
        alert("Item already in cart...")
      }
      else {
        alert("Login to add items in your cart...")

      }

    });
  }

  const navigate = useNavigate();
  const buyNow  = () => {
    axios.post("http://localhost:8080/buynow",{product_id})
    .then((res) => { 
      console.log(res.data.status)
      if(res.data.status){
        navigate("/cart")
      }
    });
  }

  return (
    <>
    <Category />
      <div className="container">
        <div className="product">
          <div className="productImage">
            <img src={product.url}></img>
          </div>
          <div className="Buttons">
            <button style={{backgroundColor:"orange",height:"50px", width:"40%",border:"none" }} onClick={addToCart}>ADD TO CART</button>
            <button style={{backgroundColor:"yellow",height:"50px", width:"40%", border:"none" }} onClick={buyNow}>BUY NOW</button>
          </div>
        </div>
        <div className="product_details">
          <h3><b>{product.brand}</b></h3>
          <h3>{product.name}</h3>
          <h2 style={{display:'flex',margin:'15px 0px'}}> <div className="rupee"> <CurrencyRupeeIcon  style={{fontSize:'25px',marginTop:'1px'}}/> </div>  {product.price}</h2>

          <div className="rating">{product.rating} <div className="star"><StarIcon style={{fontSize:'15px',marginTop:'1px'}}/></div></div><p style={{display:'inline',marginLeft:'5px'}}>Rating</p>

          <div className="colorSize">
          <p style={{fontSize:'25px', fontWeight:'700',display:'inline'}}>
            <label htmlFor='color'>Color</label>
            <select name="color" id='color' style={{fontSize:'20px', marginLeft:'10px'}} onChange={updateColor}> 
              <option value="black">black</option>
              <option value="white">white</option>
              <option value="gray">gray</option>
              <option value="black_white">black_white</option>
              <option value="gray_white">gray_white</option>
            </select>
          </p>
          <p style={{fontSize:'25px', fontWeight:'700',display:'inline', marginLeft:'10px'}}>
            <label htmlFor='color'>Size</label>
            <select name="color" id='color' style={{fontSize:'20px', marginLeft:'10px'}} onChange={updateSize}> 
              <option value="6">8</option>
              <option value="7">9</option>
              <option value="8">10</option>
              <option value="9">11</option>
              <option value="10">12</option>
            </select>
          </p>
          </div>
          <div className="delivery">
            <p style={{marginBottom:'0px', marginTop:'20px'}}>Delivered in next 7 days</p>
             Place order today
          </div>
          <div className="rating_reeview">
            <h2 style={{display:'inline-block', marginRight:'10px'}}>Rating & Review</h2>
            <div className="rating">{product.rating} <div className="star"><StarIcon style={{fontSize:'15px',marginTop:'1px'}}/></div></div>
            <div className="addReview">
              <form>
                <p>No review</p>
                
              </form>
             
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Product