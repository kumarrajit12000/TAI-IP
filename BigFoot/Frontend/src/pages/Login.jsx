import React from 'react'
import { useState } from 'react'

import Header from './Header'
import Category2 from './components/Category2'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; 
  const [user,setUser] = useState({
    email:'',
    password :'',
  });

  const [checkUser,setCheckUser] = useState();
  const [checkPass,setUserPass] = useState();
  const updateInput = (evt) => {
    setUser({...user, [evt.target.name] : evt.target.value});
  }

  const loginUser = (event) => {
    event.preventDefault();
    setUserPass(false);
    setCheckUser(false);
    axios.post("http://localhost:8080/login" ,{user}) 
      .then((res) => {
        console.log(res);
        if(res.data.status){
         return alert("user is not registered...")
        }
        else if (res.data.message == 'login successfully..'){
          navigate("/");
          return  alert("user sucessfully login...")
       
        }
        else{
          return alert("Password is incorrect...")
        }
        
        
      })
      .catch(err => { console.log(err)});
  };

  return (
    <>
    <Category2 />
    <div style={{display:'flex', justifyContent:'center', margin:'50px 0px' , textAlign:'center', }}>
        <div className="login" style={{textAlign:'center',backgroundColor:'skyblue',height:'250px',padding:' 30px ',fontSize:'20px' }}>
            <form onSubmit={loginUser}>
                <h2 style={{marginTop:'5px'}}>LOGIN</h2>
                <div>
                    <label htmlFor='email'> Enter Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>  &nbsp;
                    <input type='text' name='email' id='email' required onChange={updateInput} style={{width:'170px',height:'20px', fontSize:'15px'}}></input>  <br></br>
                </div>
                &nbsp;
               <div>
                    <label htmlFor='password'> Enter Password</label>  &nbsp;
                    <input type='password' name='password' id='password'required  onChange={updateInput} style={{width:'170px',height:'20px', fontSize:'15px'}}></input>  <br></br><br></br>
               </div>
               <br></br>
                <button style={{width:'80%',height:'30px'}} >Login</button>
                <br></br>
                <p> {checkUser && "User is not resister"} </p>
                <p> {checkPass && "incorrect password"} </p>
                <p style={{fontSize:'15px'}}><a href='/signup'>New To BigFoot ? Create an account</a></p>

            </form>
        </div>
    </div>
    </>
  )
}

export default Login