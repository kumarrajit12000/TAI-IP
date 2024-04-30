import React, { useState } from 'react'
import Header from './Header'
import Category2 from './components/Category2'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
    re_password: '',
  });

  const updateInput = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  }
  const registerUser = (event) => {

    event.preventDefault();
    if (user.password != user.re_password) {
      alert("please check password");
    }
    else {
      axios.post("http://localhost:8080/signup", { user })
        .then(res => {
          console.log(res);
          if (!res.data.status) {
            alert("Email already exist...Try with new email !")
          }
          if (res.data.status) {
            alert('user Register successfully..')
          }

        })
        .catch(err => console.log(err));
    }
  }

  return (
    <>
      <Category2 />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0px', textAlign: 'center' }}>
        <div className="login" style={{ textAlign: 'center', backgroundColor: 'skyblue', height: '250px', padding: ' 30px ', fontSize: '20px' }}>
          <form onSubmit={registerUser}>
            <h2 style={{ marginTop: '5px' }}>SignUp</h2>
            <div>
              <label htmlFor='email'> Enter Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>  &nbsp;
              <input type='text' name='email' id='email' required onChange={updateInput} style={{width:'170px',height:'20px', fontSize:'15px'}}></input>  <br></br>
            </div>
            &nbsp;
            <div>
              <label htmlFor='password'> Enter Password</label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type='password' name='password' id='password' required onChange={updateInput} style={{width:'170px',height:'20px', fontSize:'15px'}}></input>
            </div>
            &nbsp;
            <div>
              <label htmlFor='re_password'> Re-Enter Password</label>  &nbsp;
              <input type='text' name='re_password' id='re_password' required onChange={updateInput} style={{width:'170px',height:'20px', fontSize:'15px'}}></input>  <br></br><br></br>
            </div>
            <button style={{ width: '80%', height: '30px' }} >Register</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <p style={{ fontSize: '15px' }}><a href='/login'> Existing User? Login in</a></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup