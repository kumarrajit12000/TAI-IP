import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Category from './components/Category2';
import axios from 'axios';

const CategotyProducts = () => {
    const [check, setcheck] = useState(false);
    const category = useParams()
    console.log(category);

    const [Allcategory,setAllCategory] = useState([
      'Sports Shoes',
      'Sandals Floaters',
      'Flip Flops',
      'Formal Shoes',
      'Ethnic Shoes',
      'Loafers Shoes',
      'Boots Shoes']);

    const [products,setProducts] = useState([]);

    const getCategory = async () => {
        axios.post("http://localhost:8080/category", { category })
            .then((res) => {
                console.log(res)
                if(res.data.products.length != 0){
                  setProducts([...res.data.products]);
                }
                else{
                  setcheck(true)
                }
                
            });
    }

    useEffect(() => {
        getCategory()
    },[category])
    
    return (
        <>
        <Category />

        
        <h3 style={{textAlign:'center'}}>Men's {category.category}</h3>
        <div className='Card-container' style={{margin:'0px 20px'}}>
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
        
        {/* <h3 style={{textAlign:'center'}}>No Items Found...</h3> */}
        
        </>
    )
}

export default CategotyProducts