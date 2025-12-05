//creat modal for login
import React, { useState } from 'react';
import "../styles/loginModal.css"
import "@fortawesome/fontawesome-free/css/all.css";

export const LoginModal = ({isOpen, onClose, openModalRegister, onLoginSuccess}) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Lưu cả 2 token và user vào localStorage
                localStorage.setItem('accessToken', data.acesstoken);
                localStorage.setItem('refreshToken', data.refreshtoken);
                localStorage.setItem('user', JSON.stringify(data.user));
                onLoginSuccess(data.user);
                onClose();
                setFormData({ username: '', password: '' });
            } else {
                setError(data.message || 'Đăng nhập thất bại');
            }
        } catch (err) {
            setError('Không thể kết nối đến server');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='modal-close' onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                <h2>Đăng nhập</h2>
                {error && <div className="error-message">{error}</div>}
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='username'>Tên đăng nhập</label>
                        <input 
                            type='text' 
                            id='username' 
                            name='username' 
                            placeholder='Nhập tên đăng nhập'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Mật khẩu</label>
                        <input 
                            type='password' 
                            id='password' 
                            name='password' 
                            placeholder='Nhập mật khẩu'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type='submit' className='login-button' disabled={loading}>
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                    <button type='button' className='signup-button' onClick={openModalRegister}>
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;  