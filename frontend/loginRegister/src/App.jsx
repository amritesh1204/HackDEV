
import './App.css'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Signup from './pages/signup';
import Login from './pages/login';
import { ReactDOM } from 'react-dom/client';
import Homepage from './pages/homepage'
import About from './pages/about';
import Whistleblow from './pages/whistleblow';
import Rooms from './pages/rooms';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Homepage/>}></Route>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/whistleblow' element={<Whistleblow/>}></Route>
      <Route path='/room/:roomID' element={<Rooms/>}></Route>
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
