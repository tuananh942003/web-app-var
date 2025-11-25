import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar } from "./component/navbar.jsx";
import logo from "./images/computerscience-scaled.jpg";
import { Footer } from "./component/footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
function App() {
  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="left-home-page">
          <h1>Chuyên gia tư vấn và hỗ trợ đấu thầu dự án</h1>
          <p>
            Dịch vụ tư vấn đấu thầu chuyên nghiệp với đội ngũ có kinh nghiệm.
            Chúng tôi đồng hành cùng bạn chinh phục mọi dự án đấu thầu.
          </p>
          <div className="home-page-action">
            <button>
              <i className="fa-solid fa-arrow-right"></i> Khám phá dịch vụ{" "}
            </button>
            <button>
              <i className="fa-solid fa-phone"></i> Liên hệ ngay
            </button>
          </div>
        </div>
        <div className="right-home-page">
          <img src={logo} alt="" />
        </div>
      </div>
      <section style={{ padding: "60px" }} id="about-section"></section>
      <div id="contanier">
          <div className="subtitle">
            <h2>Giới thiệu về chúng tôi</h2>
            <p>Chuyên gia tư vấn đấu thầu hàng đầu với đội ngũ có nhiều năm kinh nghiệm</p>
          </div>
          <div className="content">
            <div className="">
              
            </div>
          </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
