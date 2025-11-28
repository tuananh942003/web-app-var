import React from "react";
import logo from "../images/logo.png";
import "../styles/footer.css";
import "@fortawesome/fontawesome-free/css/all.css";
export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="JTSC"  style={{width:'60px'}}/>
          </div>
          <p>
            Chuyên gia tư vấn đấu thầu hàng đầu với đội ngũ có nhiều năm kinh
            nghiệm trong lĩnh vực đấu thầu dự án.
          </p>
          <div className="social-link">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
        <div className="footer-section">
          <h4>Dịch vụ chính</h4>
          <ul>
            <li><a href="">Tư vấn đấu thầu</a></li>
            <li><a href="">Hỗ trợ chuẩn bị hồ sơ</a> </li>
            <li><a href="">Phân tích thị trường</a></li>
            <li><a href="">Đào tạo đấu thầu</a></li>
            <li><a href="">Nghiên cứu và báo cáo</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Thông tin về chúng tôi</h4>
          <ul>
            <li><a href="">Về JTSC</a></li>
            <li><a href="">Đội ngũ chuyên gia</a></li>
            <li><a href="">Khách hàng của chúng tôi</a></li>
            <li><a href="">Cơ hội nghề nghiệp</a></li>
            <li><a href="">Liên hệ</a></li>
          </ul>
         
        </div>
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <div className="contact-info">
            <p><i className="fas fa-map-marker-alt"></i> Số 123, Đường ABC, Quận XYZ, Thành phố HCM</p>
            <p><i className="fas fa-phone"></i> +84 123 456 789</p>
            <p><i className="fas fa-envelope"></i> contact@example.com</p>
            <p><i className="fas fa-clock"></i> Thứ 2 - Thứ 6: 8:00 - 18:00</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 VAR - Technology Solutions. Tất cả quyền được bảo lưu.</p>
        <a href="">Chính sách bảo mật </a>
        <a href="">Điều khoản sử dụng</a>
      </div>
    </div>
  );
};
export default Footer;
