import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './news-page.css';

export const NewsPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy dữ liệu bài viết từ server khi component mount
    useEffect(() => {
        fetchPosts();
    }, []);

    // Hàm lấy dữ liệu posts từ API
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/posts');
            
            if (!response.ok) {
                throw new Error('Không thể lấy dữ liệu bài viết');
            }
            
            const data = await response.json();
            setPosts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Lỗi khi lấy dữ liệu bài viết:', err);
        } finally {
            setLoading(false);
        }
    };

    // Format ngày tháng
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    // Xem chi tiết bài viết
    const handleReadMore = (postId) => {
        navigate(`/news/${postId}`);
    };

    if (loading) {
        return (
            <div className="news-container">
                <div className="loading">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Đang tải tin tức...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="news-container">
                <div className="error">
                    <i className="fas fa-exclamation-circle"></i>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="news-container">
            <div className="news-header">
                <h1>Tin Tức</h1>
                <p className="news-subtitle">Cập nhật thông tin mới nhất</p>
            </div>

            {posts.length === 0 ? (
                <div className="no-posts">
                    <i className="fas fa-newspaper"></i>
                    <p>Chưa có bài viết nào</p>
                </div>
            ) : (
                <div className="posts-grid">
                    {posts.map((post) => (
                        <div key={post._id} className="post-card">
                            {post.imageUrl && (
                                <div className="post-image">
                                    <img src={post.imageUrl} alt={post.title} />
                                </div>
                            )}
                            <div className="post-content">
                                <h2 className="post-title">{post.title}</h2>
                                <p className="post-description">{post.content}</p>
                                <p className="post-date">
                                    <i className="fas fa-calendar-alt"></i>
                                    {formatDate(post.createdAt)}
                                </p>
                                <button className="read-more-btn" onClick={() => handleReadMore(post._id)}>
                                    Xem chi tiết
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsPage;
