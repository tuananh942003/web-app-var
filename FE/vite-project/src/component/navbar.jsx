import React from "react";
import "../styles/navbar.css";
import logo from "../images/logo.png";


export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo" >
        <img 
          src={logo}
          alt=""
        />
      </div>
      <div className="nav-menu">
        <a>Trang chủ</a>
        <a>Giới thiệu</a>
        <a>Dịch vụ</a>
        <a>Tin tức</a>
        <a>Liên hệ</a>
      </div>
      <div className="nav-action">
        <button className="btn-login">Đăng nhập</button>
        <button className="btn-signup">Đăng ký</button>
      </div>
    </div>
  );
};
export default Navbar;
