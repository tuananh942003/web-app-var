import React from 'react'
import logo from "../images/computerscience-scaled.jpg"
import "../styles/contact.css"
import "@fortawesome/fontawesome-free/css/all.css";
export const Contact = () => {
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
            <div className='contact-form'>
            dsadadadsadsadsada
        </div>
        </div>
        
    </div>
  )
}
export default Contact
