import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './searchBar.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const SearchBar = () => {
  const navigate = useNavigate();
  const [SearchText,setSearchText] = useState("");


  console.log(SearchText)
  
  // const searchProduct = () => {
  //   const checkCategory = category.includes(SearchText);
  //   if(checkCategory){
  //     navigate(`/category/${SearchText}`);
  //   }
  //   else {
  //     navigate('/Nocategory',category);
  //   }
  // }
  return (
    <div className='SearchBar'>
      <div className="searchField">
            <form style={{display:'flex'}}>
                <input type='text' required placeholder='  What to buy Today? Sports shoes,Casual shoes,etc' style={{height:'35px', width:'100%' , backgroundColor:"rgb(237, 232, 232)" ,fontSize:"1.1rem", border:'none', outline:'none'}} onChange={(evt) => {setSearchText(evt.target.value)}}/>
                <button style={{ border:'0px'}} > <Link to={`/category/${SearchText}`}><SearchIcon style={{height:'31.80px'}}/> </Link></button> 
            </form>
        </div>
        
    </div>
  )
}

export default SearchBar