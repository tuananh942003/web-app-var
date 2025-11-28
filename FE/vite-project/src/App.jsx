import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar } from "./component/navbar.jsx";
import logo from "./images/computerscience-scaled.jpg";
import { Footer } from "./component/footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import HomePage from "./pages/Home-page/home-page.jsx";
import About from "./pages/About-page/about.jsx";
import { Contact } from "./component/contact.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
      <Footer />
      
    </>
  );
}

export default App;
