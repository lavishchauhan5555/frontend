import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from "./components/Landingpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<LandingPage />} />
          
         
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          

        </Routes>
       
      </BrowserRouter>
    </>
  )
}

export default App
