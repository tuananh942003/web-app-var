import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './news-detail.css';
import pic1 from '../../images/pic1.png';
import pic2 from '../../images/pic2.png';
import pic4 from '../../images/pic4.jpg';
import pic5 from '../../images/pic5.jpg';
import heroBg from '../../images/hero-bg.jpg';
import computerScience from '../../images/computerscience-scaled.jpg';

export const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPostDetail();
    }, [id]);

    const fetchPostDetail = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/api/posts/${id}`);
            
            if (!response.ok) {
                throw new Error('Không thể lấy chi tiết bài viết');
            }
            
            const data = await response.json();
            setPost(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Lỗi khi lấy chi tiết bài viết:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    // Tạo nội dung chi tiết đẹp cho bài viết
    const generateDetailedContent = (post) => {
        const detailImages = [pic1, pic2, pic4, pic5, heroBg, computerScience];
        const randomImages = detailImages.sort(() => Math.random() - 0.5).slice(0, 3);

        return {
            intro: `${post.content} Đây là một chủ đề vô cùng quan trọng và đáng để chúng ta cùng nhau tìm hiểu sâu hơn. Trong bài viết này, chúng tôi sẽ phân tích chi tiết các khía cạnh liên quan và đưa ra những góc nhìn toàn diện nhất.`,
            
            sections: [
                {
                    title: "Tổng Quan",
                    content: `Trong thời đại công nghệ 4.0, việc nắm bắt và cập nhật thông tin trở nên vô cùng quan trọng. ${post.title} không chỉ là một chủ đề đơn thuần mà còn là xu hướng được nhiều người quan tâm và theo dõi. Chúng ta cần phải hiểu rõ bản chất của vấn đề để có thể áp dụng hiệu quả vào thực tế.`,
                    image: randomImages[0]
                },
                {
                    title: "Phân Tích Chi Tiết",
                    content: `Qua quá trình nghiên cứu và phân tích, chúng tôi nhận thấy rằng ${post.content.toLowerCase()} có tác động sâu rộng đến nhiều lĩnh vực khác nhau. Điều này đòi hỏi chúng ta phải có cái nhìn đa chiều và tiếp cận vấn đề một cách khoa học, có hệ thống. Mỗi khía cạnh đều mang lại những giá trị và bài học riêng biệt.`,
                    image: randomImages[1]
                },
                {
                    title: "Ứng Dụng Thực Tiễn",
                    content: `Không chỉ dừng lại ở lý thuyết, chúng ta cần biết cách áp dụng kiến thức vào thực tế. Các chuyên gia trong lĩnh vực này đã chỉ ra rằng việc kết hợp giữa kiến thức nền tảng và kỹ năng thực hành sẽ mang lại hiệu quả cao nhất. Đây chính là chìa khóa để thành công trong thời đại hiện nay.`,
                    image: randomImages[2]
                },
                {
                    title: "Xu Hướng Tương Lai",
                    content: `Nhìn về tương lai, chúng ta có thể thấy rằng ${post.title.toLowerCase()} sẽ tiếp tục phát triển mạnh mẽ. Các công nghệ mới, phương pháp tiếp cận sáng tạo sẽ không ngừng xuất hiện và tạo ra những cơ hội mới. Việc chuẩn bị và thích nghi với những thay đổi này là điều cần thiết cho mọi cá nhân và tổ chức.`,
                    image: null
                },
                {
                    title: "Kết Luận",
                    content: `Tóm lại, ${post.title} là một chủ đề đáng để chúng ta dành thời gian tìm hiểu và nghiên cứu. Hy vọng rằng qua bài viết này, bạn đã có được những thông tin hữu ích và có thể áp dụng vào công việc cũng như cuộc sống của mình. Hãy tiếp tục theo dõi để cập nhật thêm nhiều thông tin bổ ích khác.`,
                    image: null
                }
            ]
        };
    };

    const handleBack = () => {
        navigate('/news');
    };

    if (loading) {
        return (
            <div className="detail-container">
                <div className="loading">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Đang tải bài viết...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="detail-container">
                <div className="error">
                    <i className="fas fa-exclamation-circle"></i>
                    <p>{error || 'Không tìm thấy bài viết'}</p>
                    <button className="back-btn" onClick={handleBack}>
                        <i className="fas fa-arrow-left"></i>
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    const detailedContent = generateDetailedContent(post);

    return (
        <div className="detail-container">
            <div className="detail-wrapper">
                <button className="back-btn" onClick={handleBack}>
                    <i className="fas fa-arrow-left"></i>
                    Quay lại danh sách
                </button>

                <article className="post-detail">
                    <header className="post-header">
                        <h1 className="detail-title">{post.title}</h1>
                        <div className="post-meta">
                            <span className="post-date">
                                <i className="fas fa-calendar-alt"></i>
                                {formatDate(post.createdAt)}
                            </span>
                        </div>
                    </header>

                    {post.imageUrl && (
                        <div className="detail-image">
                            <img src={post.imageUrl} alt={post.title} />
                        </div>
                    )}

                    <div className="detail-content">
                        <p className="intro-text">{detailedContent.intro}</p>

                        {detailedContent.sections.map((section, index) => (
                            <div key={index} className="content-section">
                                <h2 className="section-title">{section.title}</h2>
                                <p className="section-text">{section.content}</p>
                                {section.image && (
                                    <div className="section-image">
                                        <img src={section.image} alt={section.title} />
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="article-footer">
                            <div className="tags">
                                <i className="fas fa-tags"></i>
                                <span className="tag">Tin tức</span>
                                <span className="tag">Cập nhật</span>
                                <span className="tag">Xu hướng</span>
                            </div>
                            <div className="share-section">
                                <p>Chia sẻ bài viết:</p>
                                <div className="share-buttons">
                                    <button className="share-btn facebook">
                                        <i className="fab fa-facebook-f"></i>
                                    </button>
                                    <button className="share-btn twitter">
                                        <i className="fab fa-twitter"></i>
                                    </button>
                                    <button className="share-btn linkedin">
                                        <i className="fab fa-linkedin-in"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NewsDetail;
