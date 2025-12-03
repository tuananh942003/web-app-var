import { useState, useEffect } from 'react';
import './service-page.css';

export const ServicePage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Fetching services from API...');
            const response = await fetch('http://localhost:3001/api/services');
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Không thể tải dữ liệu dịch vụ');
            }
            const data = await response.json();
            console.log('Services data:', data);
            setServices(data);
        } catch (err) {
            console.error('Error fetching services:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="service-page">
            <div className="service-hero">
                <h1>Dịch vụ của chúng tôi</h1>
                <p>Khám phá các dịch vụ chuyên nghiệp và chất lượng cao</p>
            </div>

            <div className="service-container">
                {loading && (
                    <div className="service-loading">
                        <div className="spinner"></div>
                        <p>Đang tải dịch vụ...</p>
                    </div>
                )}

                {error && (
                    <div className="service-error">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && services.length === 0 && (
                    <div className="service-empty">
                        <i className="fa-solid fa-box-open"></i>
                        <p>Hiện chưa có dịch vụ nào</p>
                    </div>
                )}

                {!loading && !error && services.length > 0 && (
                    <div className="services-grid">
                        {services.map((service) => (
                            <div key={service._id} className="service-card">
                                <div className="service-icon-wrapper">
                                    <i className={service.icon}></i>
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-content">{service.content}</p>
                                {service.description && service.description.length > 0 && (
                                    <ul className="service-features">
                                        {service.description.map((desc, index) => (
                                            <li key={index}>
                                                <i className="fa-solid fa-check"></i>
                                                <span>{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicePage;