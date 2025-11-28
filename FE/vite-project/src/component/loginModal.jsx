//creat modal for login
import React from 'react';
import "../styles/loginModal.css"
import "@fortawesome/fontawesome-free/css/all.css";
export const LoginModal = ({isOpen, onClose , openModalRegister}) => {
    if (!isOpen) return null;
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='modal-close' onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                <h2>Đăng nhập</h2>
                <form className='login-form'>
                    <div className='form-group'>
                        <label htmlFor='username'>Tên đăng nhập</label>
                        <input type='text' id='username' name='username' placeholder='Nhập tên đăng nhập' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Mật khẩu</label>
                        <input type='password' id='password' name='password' placeholder='Nhập mật khẩu' />
                    </div>
                    <button type='submit' className='login-button'>Đăng nhập</button>
                    <button type='button' className='signup-button' onClick={openModalRegister}>Đăng ký</button>
                </form>
            </div>
        </div>
    );
};
export default LoginModal;  