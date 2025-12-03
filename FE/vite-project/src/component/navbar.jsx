import React, { useState } from "react";
import "../styles/navbar.css";
import logo from "../images/logo.png";
import LoginModal from "./loginModal.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import RegisterModal from "./registerModal.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isRegisterOpen,setIsRegisterOpen]=useState(false);

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
    setIsModalOpen(false);
  };
const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsRegisterOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-logo" >
          <img 
            src={logo}
            alt=""
          />
        </div>
        <div className="nav-menu">
          <Link to="/">Trang chủ</Link>
          <Link to="/about">Giới thiệu</Link>
          <Link to="/service">Dịch vụ</Link>
          <Link to="/news">Tin tức</Link>
          <Link to="/contact">Liên hệ</Link>
        </div>
        <div className="nav-action">
          <button className="btn-login" onClick={handleOpenModal}>Đăng nhập</button>
          <button className="btn-signup" onClick={handleOpenRegister}>Đăng ký</button>
        </div>
      </div>
      
      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} openModalRegister={handleOpenRegister} />
      <RegisterModal isOpen={isRegisterOpen} onClose={handleCloseRegister} openModalLogin={handleOpenModal} />
    </>
  );
};
export default Navbar;
