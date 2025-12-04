import React from "react";
import "./about.css";
import "@fortawesome/fontawesome-free/css/all.css";

export const About = () => {
  const visionMissionData = [
    {
      icon: "fas fa-eye",
      title: "Tầm Nhìn",
      description: "Trở thành đơn vị tư vấn đấu thầu hàng đầu Việt Nam, mang đến giải pháp toàn diện và hiệu quả nhất cho doanh nghiệp. Chúng tôi hướng tới việc xây dựng một hệ sinh thái dịch vụ chuyên nghiệp, minh bạch và đáng tin cậy."
    },
    {
      icon: "fas fa-rocket",
      title: "Sứ Mệnh",
      description: "Đồng hành cùng doanh nghiệp trong mọi giai đoạn đấu thầu, từ tư vấn chiến lược đến hoàn thiện hồ sơ. Cam kết mang lại giá trị bền vững, tối ưu chi phí và nâng cao tỷ lệ trúng thầu cho khách hàng."
    },
    {
      icon: "fas fa-heart",
      title: "Giá Trị Cốt Lõi",
      description: "Chuyên nghiệp - Uy tín - Hiệu quả. Chúng tôi đặt lợi ích khách hàng lên hàng đầu, luôn cập nhật quy định pháp luật mới nhất và áp dụng công nghệ hiện đại vào quy trình làm việc."
    }
  ];

  const expertTeam = [
    {
      name: "Nguyễn Văn A",
      position: "Giám Đốc Tư Vấn",
      avatar: "fas fa-user-tie",
      description: "15 năm kinh nghiệm trong lĩnh vực đấu thầu, chuyên gia tư vấn cho hơn 500 dự án thành công.",
      expertise: "Tư vấn chiến lược, Quản lý dự án"
    },
    {
      name: "Trần Thị B",
      position: "Chuyên Gia Pháp Lý",
      avatar: "fas fa-gavel",
      description: "Chuyên gia về luật đấu thầu với 12 năm kinh nghiệm, đảm bảo mọi hồ sơ tuân thủ pháp luật.",
      expertise: "Luật đấu thầu, Hồ sơ pháp lý"
    },
    {
      name: "Lê Văn C",
      position: "Chuyên Gia Kỹ Thuật",
      avatar: "fas fa-chart-line",
      description: "10 năm kinh nghiệm phân tích kỹ thuật, đánh giá dự án và lập phương án kỹ thuật tối ưu.",
      expertise: "Phân tích kỹ thuật, Định giá"
    }
  ];

  return (
    <div className="about-container">
      {/* Header Section */}
      <section className="about-header">
        <div className="header-content">
          <h1 className="main-title">Về Chúng Tôi</h1>
          <p className="subtitle">Đối tác tin cậy trong lĩnh vực tư vấn đấu thầu</p>
        </div>
      </section>

      {/* Về Chúng Tôi Section */}
      <section className="about-intro">
        <div className="intro-container">
          <div className="intro-content">
            <h2 className="section-title">
              <i className="fas fa-building"></i>
              Về Chúng Tôi
            </h2>
            <div className="intro-text">
              <p>
                Với hơn <strong>15 năm kinh nghiệm</strong> trong lĩnh vực tư vấn đấu thầu, chúng tôi tự hào là đơn vị 
                tiên phong trong việc cung cấp các giải pháp toàn diện cho doanh nghiệp. Đội ngũ chuyên gia của chúng 
                tôi luôn sẵn sàng đồng hành cùng bạn trong mọi giai đoạn của quá trình đấu thầu.
              </p>
              <p>
                Chúng tôi không chỉ đơn thuần là nhà tư vấn, mà còn là người bạn đồng hành đáng tin cậy, luôn đặt 
                lợi ích và thành công của khách hàng lên hàng đầu. Với phương châm <em>"Chuyên nghiệp - Uy tín - Hiệu quả"</em>, 
                chúng tôi cam kết mang đến dịch vụ chất lượng cao nhất.
              </p>
              <p>
                Hơn <strong>500+ dự án</strong> đã được triển khai thành công và <strong>200+ khách hàng</strong> tin tưởng 
                lựa chọn chúng tôi như một minh chứng cho chất lượng dịch vụ mà chúng tôi cung cấp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tầm Nhìn & Sứ Mệnh Section */}
      <section className="vision-mission">
        <div className="section-container">
          <h2 className="section-title">
            <i className="fas fa-compass"></i>
            Tầm Nhìn & Sứ Mệnh
          </h2>
          <div className="vision-grid">
            {visionMissionData.map((item, index) => (
              <div key={index} className="vision-card">
                <div className="card-icon">
                  <i className={item.icon}></i>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Đội Ngũ Chuyên Gia Section */}
      <section className="expert-team">
        <div className="section-container">
          <h2 className="section-title">
            <i className="fas fa-users"></i>
            Đội Ngũ Chuyên Gia
          </h2>
          <p className="section-subtitle">
            Đội ngũ chuyên gia giàu kinh nghiệm, tận tâm và chuyên nghiệp
          </p>
          <div className="expert-grid">
            {expertTeam.map((expert, index) => (
              <div key={index} className="expert-card">
                <div className="expert-avatar">
                  <i className={expert.avatar}></i>
                </div>
                <div className="expert-info">
                  <h3 className="expert-name">{expert.name}</h3>
                  <p className="expert-position">{expert.position}</p>
                  <p className="expert-description">{expert.description}</p>
                  <div className="expert-expertise">
                    <span className="expertise-label">Chuyên môn:</span>
                    <span className="expertise-value">{expert.expertise}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
