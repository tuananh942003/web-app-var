import { useState, useEffect } from 'react';
import './service-page.css';

export const ServicePage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchServices();
    }, []);

    const getPaginatedData = (data) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return data.slice(indexOfFirstItem, indexOfLastItem);
    };

    const getTotalPages = () => {
        return Math.ceil(services.length / itemsPerPage);
    };

    const Pagination = () => {
        const totalPages = getTotalPages();
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        if (totalPages <= 1) return null;

        return (
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="pagination-btn"
                >
                    ◀ Trước
                </button>
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                >
                    Sau ▶
                </button>
            </div>
        );
    };

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
                    <>
                        <div className="services-grid">
                            {getPaginatedData(services).map((service) => (
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
                        <Pagination />
                    </>
                )}
            </div>

            {/* Quy trình làm việc */}
            <div className="process-section">
                <div className="process-header">
                    <h2>Quy trình làm việc</h2>
                    <p>Quy trình chuyên nghiệp, minh bạch và hiệu quả</p>
                </div>
                <div className="process-timeline">
                    <div className="process-step">
                        <div className="step-number">01</div>
                        <div className="step-icon">
                            <i className="fa-solid fa-file-contract"></i>
                        </div>
                        <h3 className="step-title">Tiếp nhận yêu cầu</h3>
                        <p className="step-description">
                            Lắng nghe và ghi nhận đầy đủ yêu cầu của khách hàng. 
                            Tư vấn giải pháp phù hợp nhất với nhu cầu và ngân sách.
                        </p>
                    </div>

                    <div className="process-step">
                        <div className="step-number">02</div>
                        <div className="step-icon">
                            <i className="fa-solid fa-clipboard-check"></i>
                        </div>
                        <h3 className="step-title">Đánh giá và báo giá</h3>
                        <p className="step-description">
                            Phân tích chi tiết dự án, đánh giá khối lượng công việc.
                            Đưa ra báo giá minh bạch và thời gian thực hiện cụ thể.
                        </p>
                    </div>

                    <div className="process-step">
                        <div className="step-number">03</div>
                        <div className="step-icon">
                            <i className="fa-solid fa-gear"></i>
                        </div>
                        <h3 className="step-title">Thực hiện dự án</h3>
                        <p className="step-description">
                            Triển khai dự án theo đúng tiến độ đã cam kết.
                            Thường xuyên cập nhật tiến độ và điều chỉnh khi cần thiết.
                        </p>
                    </div>

                    <div className="process-step">
                        <div className="step-number">04</div>
                        <div className="step-icon">
                            <i className="fa-solid fa-handshake"></i>
                        </div>
                        <h3 className="step-title">Bàn giao và hỗ trợ</h3>
                        <p className="step-description">
                            Bàn giao sản phẩm hoàn chỉnh và hướng dẫn sử dụng chi tiết.
                            Hỗ trợ kỹ thuật và bảo hành theo cam kết.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;