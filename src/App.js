import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Createpost from './components/Createpost';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/create-post' element={<Createpost/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
