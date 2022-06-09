import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import User from "./components/User/User";
import Register from './components/Register/Register'
import Admincontrol from "./components/Admincontrol/Admincontrol";
import Adminlogin from "./components/Adminlogin/Adminlogin";
import Edituser from './components/Admincontrol/Edituser'

function App() {
  return (
    <div className="App">
  <BrowserRouter>
       <Routes>
         <Route path="/" element={<Login/>} />
         <Route path="/user" element={<User />} />
         <Route path="/register" element={<Register/>} />
         <Route path="/admin" element={<Adminlogin />} />
         <Route path="/admincontrol" element={<Admincontrol/>} />
         <Route path="/edituser/:userId" element={<Edituser/>} />

       </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;