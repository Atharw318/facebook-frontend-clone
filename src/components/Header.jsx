import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";


function Header({isAuth,isSignin}) {

  const logoutMethod = () => {
    Cookies.remove("token")
    localStorage.removeItem("token");
    window.location = "/signin";
  }
  return (
    <div className='header-box'>
      <div className='box'>
        <Link to={"/"}>
        <h1>FaceBook</h1>
        </Link>
      
      { isAuth ?
      <>
       <button onClick={ () => logoutMethod()}>Logout</button> 
       <Link to={"/create-post"}>Create Post</Link>
       </>
       : isSignin ?
        <Link to={"/signup"}>
       <button>SignUp</button>
       </Link> :<Link to={"/signin"}>
       <button>SignIn</button>
       </Link>
       }
      </div>
    </div>
  )
}

export default Header