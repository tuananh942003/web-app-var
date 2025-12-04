import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import logo from "../images/logo.png";
import LoginModal from "./loginModal.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import RegisterModal from "./registerModal.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Kiểm tra user đã đăng nhập chưa khi component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

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

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
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
          {user ? (
            <div className="user-dropdown">
              <span className="welcome-text" onClick={toggleDropdown}>
                👋 Xin chào, <strong>{user.name || user.username}</strong>
                <i className={`fas fa-chevron-down ${showDropdown ? 'rotate' : ''}`}></i>
              </span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="btn-login" onClick={handleOpenModal}>Đăng nhập</button>
              <button className="btn-signup" onClick={handleOpenRegister}>Đăng ký</button>
            </>
          )}
        </div>
      </div>
      
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        openModalRegister={handleOpenRegister}
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={handleCloseRegister} 
        openModalLogin={handleOpenModal} 
      />
    </>
  );
};

export default Navbar;
