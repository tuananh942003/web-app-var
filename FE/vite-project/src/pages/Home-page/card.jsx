import "@fortawesome/fontawesome-free/css/all.css";
import "./home-page.css";
export default function ServiceCard({ icon, title, description }) {
    return (
      <div className=" feature-item-service">
        <div className="service-icon">
          <i className={icon}></i>
        </div>
        <div className="feature-item-service-info">
          <h3 className="feature-item-service-info-title">{title}</h3>
          <p className="feature-item-service-info-description">{description}</p>
        </div>
      </div>
    );
}

export function NewsCard ({title, description,image,extension }) {
    return (
        <div className=" feature-item-news"> 
        <div className="news-image">
          <img src={image} alt="" />
        </div>
        <div className="news-info">
          <h3 className="feature-item-news-info-title">{title}</h3>
          <p className="feature-item-news-info-description">{description}</p>
          <div className="news-extension">
            <i className={extension.icon}></i>
            <span>{extension.date}</span>
          </div>
        </div>
            </div> 
    )
}