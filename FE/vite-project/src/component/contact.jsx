import React, { useState } from 'react'
import logo from "../images/computerscience-scaled.jpg"
import "../styles/contact.css"
import "@fortawesome/fontawesome-free/css/all.css";
import API_URL from '../config/api.js';
export const Contact = () => {
    const [form, setForm] = useState({ full_name: '', email: '', phone: '', company: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sending) return;
        setSending(true);
        try {
            const res = await fetch(`${API_URL}/api/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                alert('Gửi liên hệ thành công!');
                setForm({ full_name: '', email: '', phone: '', company: '', subject: '', message: '' });
            } else {
                const data = await res.json();
                alert(data.message || 'Gửi thất bại');
            }
        } catch (err) {
            console.error('Submit contact error', err);
            alert('Lỗi kết nối đến server');
        } finally {
            setSending(false);
        }
    };
  return (
    <div className='container-contact'>
        <div className='contact-header'>
            <h2>Liên hệ với chúng tôi</h2>
            <p>Chúng tôi sẵn sàng hỗ trợ bạn 24/7</p>
        </div>
        <div className='contact-content'>
            <div className='contact-info'>
                <div className="contact-item">
                    <div className='contact-icon'>
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-detail">
                        <h3>Địa chỉ</h3>    
                        <p>Số 123, Đường ABC, Quận XYZ, Thành phố HCM</p>
                    </div>
                </div>
                <div className="contact-item">
                    <div className='contact-icon'>
                        <i className="fas fa-phone"></i>
                    </div>
                    <div className="contact-detail">
                        <h3>Điện thoại</h3>    
                        <p>+84 123 456 789</p>
                    </div>
                </div>
                <div className="contact-item">
                    <div className='contact-icon'>
                        <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-detail">
                        <h3>Email</h3>    
                        <p>contact@example.com</p>
                    </div>
                </div>
                <div className="contact-item">
                    <div className='contact-icon'>
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="contact-detail">
                        <h3>Giờ làm việc</h3>    
                        <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                    </div>
                </div>
            </div>
            <form className='contact-form' onSubmit={handleSubmit}>
                <div className="contact-form-input">
                    <input value={form.full_name} onChange={handleChange} type="text" name='full_name' placeholder='Họ và tên' required />
                </div>
                <div className="contact-form-input">
                    <input value={form.email} onChange={handleChange} type="email" name='email' placeholder='Email' required />
                </div>
                <div className="contact-form-input">
                    <input value={form.phone} onChange={handleChange} type="tel" name='phone' placeholder='Số điện thoại' />
                </div>
                <div className="contact-form-input">
                    <input value={form.company} onChange={handleChange} type="text" name='company' placeholder='Công Ty' />
                </div>
                <div className="contact-form-input">
                   <input value={form.subject} onChange={handleChange} type="text" name='subject' placeholder='Tiêu đề' />
                </div>
                <div className="contact-form-input">
                    <textarea value={form.message} onChange={handleChange} name="message" rows="5" placeholder='Nội dung' required></textarea>
                </div>
                <button type='submit' className='btn-submit' disabled={sending}>
                    <i className="fas fa-paper-plane"></i>
                    {sending ? 'Đang gửi...' : 'Gửi tin nhắn'}
                </button>
            </form>
        </div>
        
    </div>
  )
}
export default Contact
