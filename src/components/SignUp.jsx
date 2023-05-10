import React ,{useState, useEffect } from 'react';
import './SignUp.css';
import Header from './Header';
import axios from 'axios';
import Cookies from "js-cookie";


function SignUp() {

  useEffect(() => {
    const token =   Cookies.get("token")
    if (token) {
      window.location = "/";
    }
  }, [])

  const [data, setdata] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  })

  const [submitted, setSubmitted] = useState(false);

  const submitUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/signup', {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
  })
    .then(function (response) {
      if (response?.data?.message === "successfully resgister") {
          // handle success
        setSubmitted(true)
        setdata({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        })
      }
      
    
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
   
  }

  const onChangeValue = (name, value) => {
    setSubmitted(false)
    setdata({...data, [`${name}`]: value});

  }

  return (
    <div>
      <Header />
      <div className='box1'>
       <div className='box2'>
        <span>SignUp</span>
        {submitted ? <div className="success-message">Success! Thank you for SignUp</div> : null}
        <form>
         <input value={data.first_name} onChange={(e) => onChangeValue("first_name",e.target.value)} type='text' placeholder='first-name' />
         <input value={data.last_name} onChange={(e) => onChangeValue("last_name",e.target.value)} type='text' placeholder='last-name' />
         <input value={data.email} onChange={(e) => onChangeValue("email",e.target.value)} type='email' placeholder='email' />
         <input value={data.password} onChange={(e) =>onChangeValue("password",e.target.value)} type='password' placeholder='password' />
         <button type="submitted" onClick={(e) => submitUser(e)}>Sign Up</button>
         </form>
         <p>You do have account? SignIn</p>
       </div>
        
      </div>
    </div>
  )
}

export default SignUp;