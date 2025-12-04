import React from "react";
import { Navbar } from "../../component/navbar.jsx";
import logo from "../../images/computerscience-scaled.jpg";
import { Footer } from "../../component/footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import "./home-page.css";
import { serviceData } from "../../data/serviceData.js";
import ServiceCard from "./card.jsx";
import { newsData } from "../../data/serviceData.js";
import { NewsCard } from "./card.jsx";
import { Contact } from "../../component/contact.jsx";
import { Link } from "react-router-dom";
export const HomePage = () => {
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      
      <div className="home-page">
        <div className="left-home-page">
          <h1>Chuyên gia tư vấn và hỗ trợ đấu thầu dự án</h1>
          <p>
            Dịch vụ tư vấn đấu thầu chuyên nghiệp với đội ngũ có kinh nghiệm.
            Chúng tôi đồng hành cùng bạn chinh phục mọi dự án đấu thầu.
          </p>
          <div className="home-page-action">
            <Link to="/service">
              <button>
                <i className="fa-solid fa-arrow-right"></i> Khám phá dịch vụ{" "}
              </button>
            </Link>
            <button onClick={scrollToContact}>
              <i className="fa-solid fa-phone"></i> Liên hệ ngay
            </button>
          </div>
        </div>
        <div className="right-home-page">
          <img src={logo} alt="" />
        </div>
      </div>
      <section style={{ padding: "60px" }} id="about-section"></section>
      <div className="container-about">
        <div className="subtitle">
          <h2>Giới thiệu về chúng tôi</h2>
          <p>
            Chuyên gia tư vấn đấu thầu hàng đầu với đội ngũ có nhiều năm kinh
            nghiệm
          </p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <div className=" feature-item">
              <div className="icon">
                <i className="fa-solid fa-clipboard-check"></i>
              </div>
              <div className="info">
                <h3 className="info-title">Tư vấn chuyên sâu</h3>
                <p className="info-description">
                  Phân tích hồ sơ đấu thầu chuyên sâu và đưa ra giải pháp tối ưu
                </p>
              </div>
            </div>
            <div className=" feature-item">
              <div className="icon">
                <i className="fa-solid fa-gavel"></i>
              </div>
              <div className="info">
                <h3 className="info-title">Kinh nghiệm đấu thầu</h3>
                <p className="info-description">
                  Đội ngũ chuyên gia có hơn 10 năm kinh nghiệm trong lĩnh vực
                  đấu thầu
                </p>
              </div>
            </div>

            <div className=" feature-item">
              <div className="icon">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div className="info">
                <h3 className="info-title">Tỷ lệ trúng thầu cao</h3>
                <p className="info-description">
                  Cam kết đạt tỷ lệ trúng thầu trên 85% cho các dự án được tư
                  vấn
                </p>
              </div>
            </div>
          </div>
          <div className="about-stat">
            <div className="home-stat-card">
              <div className="stat-number">320</div>
              <div className="stat-label">Gói thầu đã trúng</div>
            </div>
            <div className="home-stat-card">
              <div className="stat-number">1000</div>
              <div className="stat-label">Khách hàng tin tưởng</div>
            </div>
            <div className="home-stat-card">
              <div className="stat-number">12</div>
              <div className="stat-label">Năm kinh nghiệm</div>
            </div>
            <div className="home-stat-card">
              <div className="stat-number">85</div>
              <div className="stat-label">% Tỷ lệ trúng thầu</div>
            </div>
          </div>
        </div>
      </div>
      <section style={{ padding: "60px" }} id="about-section"></section>
      <div className="container-service">
        <div className="service-header-home">
          <h4>Dịch vụ của chúng tôi</h4>
          <p>Dịch vụ tư vấn đấu thầu chuyên nghiệp và toàn diện</p>
        </div>
      </div>
      <div className="card-wrapper-service">
        {serviceData.map((service) => {
          return(<ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />)
          
        })}
      </div>
      <section style={{ padding: "60px" }} id="about-section"></section>
      <div className="container-news">
        <div className="news-header">
          <h5>Tin tức & Kiến thức</h5>
          <p>Cập nhật luật đấu thầu và kinh nghiệm thực tế</p>
        </div>
        <div className="card-wrapper-news">
          {newsData.map((news) => {
            return(<NewsCard
              key={news.id}
              image={news.image}
              title={news.title}
              description={news.description}
              extension={news.extension}
            />)
          })}
        </div>
      </div>
      <section style={{ padding: "60px" }} id="contact-section"></section>
      <Contact />
      
    
    </>
  );
};
export default HomePage;
