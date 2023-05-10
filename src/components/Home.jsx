import React,  {useState, useEffect}  from 'react';
import Header from './Header';
import './Home.css'
import Cookies from "js-cookie";
import axios from 'axios';

function Home() {

  const [isAuth, setIsAuth] = useState(false)
  const [post, setPost] = useState([])
  
    useEffect(() =>{
      const token = Cookies.get("token")
      if (token) {
        setIsAuth(true)
      }else{
        setIsAuth(false)
      }
      getPost()
      
    } ,[])

    const getPost = () =>{
      axios.get("http://localhost:8000/api/posts").then(function (response) {
        // handle success
        console.log(response);
        setPost(response?.data?.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      }
  return (
    <div className='mainbox'>
      <Header isAuth={isAuth} />
      {
          post.length > 0 && post.map((data, index) => {
            console.log(data.path.split("uploads\\")[1], "dddddsds");

            return  (
              <div className='title' key={index}>
                {data.title}
                <p>{data.content}</p>
                <img style={{width:"300px" }} src={`http://localhost:8000/${data.path.split("uploads\\")[1]}`} alt="" />
                </div>
            )
          })
        }
    </div>
  )
}

export default Home