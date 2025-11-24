import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from "./components/Landingpage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./layout/Layout"
import Layouta from "./layout/Layouta"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layouta/>}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          </Route>

        </Routes>
        <Routes>
          <Route element={<Layout />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
