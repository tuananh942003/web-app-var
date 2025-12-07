//create modal for register
import React, { useState } from 'react';
import "../styles/loginModal.css"
import "@fortawesome/fontawesome-free/css/all.css";

export const RegisterModal = ({isOpen, onClose, openModalLogin}) => {
    const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        // Kiểm tra mật khẩu xác nhận
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, role: 'user' }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({ name: '', username: '', email: '', password: '', confirmPassword: '' });
                // Đợi 2 giây rồi chuyển sang modal đăng nhập
                setTimeout(() => {
                    setSuccess(false);
                    openModalLogin();
                }, 2000);
            } else {
                setError(data.message || 'Đăng ký thất bại');
            }
        } catch (err) {
            setError('Không thể kết nối đến server');
            console.error('Register error:', err);
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
                <h2>Đăng ký</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">✅ Đăng ký thành công! Đang chuyển sang đăng nhập...</div>}
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Tên đầy đủ</label>
                        <input 
                            type='text' 
                            id='name' 
                            name='name' 
                            placeholder='Nhập tên đầy đủ'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' 
                            id='email' 
                            name='email' 
                            placeholder='Nhập email'
                            value={formData.email}
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
                    <div className='form-group'>
                        <label htmlFor='confirmPassword'>Xác nhận mật khẩu</label>
                        <input 
                            type='password' 
                            id='confirmPassword' 
                            name='confirmPassword' 
                            placeholder='Nhập lại mật khẩu'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type='submit' className='login-button' disabled={loading}>
                        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                    </button>
                    <button type='button' className='signup-button' onClick={openModalLogin}>
                        Đăng nhập
                    </button>
                </form> 
            </div>
        </div>
    );
};

export default RegisterModal;