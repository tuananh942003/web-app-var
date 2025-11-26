import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar } from "./component/navbar.jsx";
import logo from "./images/computerscience-scaled.jpg";
import { Footer } from "./component/footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import HomePage from "./pages/Home-page/home-page.jsx";
function App() {
  return (
    <HomePage />
  );
}

export default App;
