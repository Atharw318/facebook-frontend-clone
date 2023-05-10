import React, {useState, useEffect} from 'react';
import './SignIn.css';
import Header from './Header'
import axios from 'axios';
import Cookies from "js-cookie";

function SignIn() {

  const [data, setdata] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    const token =   Cookies.get("token")
    if (token) {
      window.location = "/";
    }
  }, [])

  const [submitted, setSubmitted] = useState(false);

  const submitUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/signin', {
      email: data.email,
      password: data.password,
  })
    .then(function (response) {
      if (response?.data?.message === "successfully signin") {
          // handle success
        setSubmitted(true)
        setdata({
          email: "",
          password: "",
        })
      }
      Cookies.set('token',response?.data?.data  , { expires: 7 });
      localStorage.setItem("token", response?.data?.data )
      window.location = "/create-post";
      console.log(response);
      
    
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
      <Header isSignin={true} />
      <div className='box1'>
       <div className='box2'>
        <span>SignIn</span>
        {submitted ? <div className="success-message">Error ! please check Email/Password</div> : null}
        <form>
         <input value={data.email} onChange={(e) => onChangeValue("email",e.target.value)}  type='email' placeholder='email' />
         <input value={data.password} onChange={(e) =>onChangeValue("password",e.target.value)} type='password' placeholder='password' />
         <button type="submitted" onClick={(e) => submitUser(e)}>Sign In</button>
         </form>
         <p>You do'nt have account? SignUp</p>
       </div>
        
      </div>
    </div>
  )
}

export default SignIn