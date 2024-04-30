import React, { useEffect, useState } from 'react'
import "./CardSection.css";
import { Link } from 'react-router-dom';
import axios from 'axios'

const CardSection = () => {
  const [products,setProducts] = useState([]);

  const getData = () => {
    axios.get("http://localhost:8080/products")
    .then((res) => { 
      console.log(res)
      setProducts([...res.data.products])
    });
  }

  useEffect(() => {
    getData()
  },[])
  return (
    <>
    <h3>Trandy Shoes</h3>
    <div className='Card-container'>
      {
        products.map((product,idx) => {
          return(
            <Link to={`/product/${product._id}`} style={{textDecoration:"none",color:"black"}}>
            <div className="card">
            <img src={product.url} alt="TrandyImage" />
              <h4><b>{product.name.substring(0,15)}...</b></h4>
          </div>
          </Link>
          )
          
        })
      }
    </div>
    </>
  )
}

export default CardSection