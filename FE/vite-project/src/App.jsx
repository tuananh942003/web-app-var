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
import AdminPage from "./component/admin-page.jsx";
import ServicePage from "./pages/Service-page/service-page.jsx";
import NewsPage from "./pages/News-page/news-page.jsx";
import NewsDetail from "./pages/News-page/news-detail.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      {/* Các route có layout */}
      <Routes>
        <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/service" element={<ServicePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetail />} />
              </Routes>
              <Footer />
            </>
          } />

        {/* Route admin KHÔNG có layout */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
