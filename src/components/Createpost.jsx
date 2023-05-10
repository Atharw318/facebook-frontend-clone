import React, {useState, useEffect} from 'react';
import './Createpost.css'
import Header from './Header';
import Cookies from "js-cookie";
import axios from 'axios';



function Createpost() {

const [isAuth, setIsAuth] = useState(false)
useEffect(() =>{
  const token =   Cookies.get("token")
    if (token) {
      setIsAuth(true)
    }else{
      window.location = "/signin";
    }
  }, [])

  const [data, setData] = useState({
    title : "",
    content : "",
    image: "",
    
  })

  const [submitted, setSubmitted] = useState(false)
  const submitUser = (e) => {
    console.log(data, "dsddskjdkjs");
    e.preventDefault();
    axios.post('http://localhost:8000/api/create-post', {
      title: data.title,
      content: data.content,
      file: data.image,

    },
    {headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${Cookies.get("token")}` 
    }}
    )
    .then(function (response) {
      console.log(response, "ddd");
      setSubmitted(true)
      setData({
        title: "",
        content: "",
        image: "",

      })
      window.location = "/";

      // console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
   
  }
  const onChangeValue = (name, value) => {
    console.log(value, "dssdjdj");
    setSubmitted(false)
    setData({...data, [`${name}`]: value});

  }
  
  return (
    <div>
        <Header isAuth={isAuth} />
        <div className='box3'>
          <form>
            <input value={data.title} onChange={(e) => onChangeValue("title",e.target.value)}  type="text" placeholder='title' />
            <input value={data.content} onChange={(e)=>onChangeValue("content",e.target.value)} type="text" placeholder='text' />
            <input type="file" accept="image/*" onChange={(e) => onChangeValue("image",e.target.files[0])} />
            <button  onClick={(e)=> submitUser(e)}>Post</button>
            {submitted ? <div className="success-message">Success! Thank you for Your Post</div> : null}
          </form>
        </div>
    </div>
  )
}

export default Createpost