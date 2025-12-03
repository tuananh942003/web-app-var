import React, { useState, useEffect } from "react";
import "../styles/admin-page.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);

  // Kiểm tra xem đã login chưa khi component mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsLoggedIn(true);
      fetchUsers();
      fetchPosts();
      fetchServices();
    } else {
      setLoading(false);
    }
  }, []);

  // Xử lý login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu token vào localStorage
        localStorage.setItem('adminToken', JSON.stringify(data.user));
        setIsLoggedIn(true);
        fetchUsers();
      } else {
        setLoginError(data.message || 'Đăng nhập thất bại. Chỉ admin mới có quyền truy cập!');
        setLoginError('Không thể đăng nhập. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      setLoginError('Lỗi kết nối đến server');
      console.error('Lỗi login:', err);
    }
  };

  // Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setUsers([]);
  };

  // Lấy dữ liệu người dùng từ server
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/users');
      
      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu người dùng');
      }
      
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Lỗi khi lấy dữ liệu:', err);
    } finally {
      setLoading(false);
    }
  };
  //hãy viết cho tôi logic lấy dư liệu bài viết từ server dưới dạng step và comment từng bước không viet code
  // Bước 1: Khai báo một state để lưu trữ danh sách bài viết
  // Bước 2: Tạo một hàm bất đồng bộ fetchPosts để lấy dữ liệu bài viết từ server
  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Bước 3: Gọi API để lấy dữ liệu bài viết
      const response = await fetch('http://localhost:3001/api/posts');
      // Bước 4: Kiểm tra phản hồi từ server
      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu bài viết');
      }
      // Bước 5: Chuyển đổi phản hồi thành định dạng JSON
      const data = await response.json();
      // Bước 6: Cập nhật state với danh sách bài viết nhận được
      setPosts(data);
      setError(null);
    } catch (err) {
      // Bước 7: Xử lý lỗi nếu có
      setError(err.message);
      console.error('Lỗi khi lấy dữ liệu bài viết:', err);
      } finally {
      setLoading(false);
    }
  };

  // Lấy dữ liệu dịch vụ từ server
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/services');
      
      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu dịch vụ');
      }
      
      const data = await response.json();
      setServices(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Lỗi khi lấy dữ liệu dịch vụ:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchServices();
  }, []);

  // Nếu chưa login, hiển thị form login
  if (!isLoggedIn) {
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <h2 className="login-title">🔐 Đăng nhập Admin</h2>
          
          {loginError && (
            <div className="login-error">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="form-input"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
                placeholder="Nhập username"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Mât khẩu
              </label>
              <input
                type="password"
                className="form-input"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                placeholder="Nhập password"
              />
            </div>
            
            <button type="submit" className="login-button">
              Đăng nhập
            </button>
          </form>
          
          <p className="login-note">
            * Chỉ tài khoản admin mới được phép truy cập
          </p>
        </div>
      </div>
    );
  }

  // Nếu đã login, hiển thị trang quản lý
  return (
    <div className="admin-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">📊 Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Đăng xuất
        </button>
      </div>

      <div className="admin-layout">
        {/* Sidebar Menu */}
        <div className="sidebar-menu">
          <div className="menu-item" onClick={() => setActiveMenu('dashboard')}>
            <span className={`menu-link ${activeMenu === 'dashboard' ? 'active' : ''}`}>
              📊 Dashboard
            </span>
          </div>
          <div className="menu-item" onClick={() => setActiveMenu('posts')}>
            <span className={`menu-link ${activeMenu === 'posts' ? 'active' : ''}`}>
              📝 Quản lý bài viết
            </span>
          </div>
          <div className="menu-item" onClick={() => setActiveMenu('users')}>
            <span className={`menu-link ${activeMenu === 'users' ? 'active' : ''}`}>
              👥 Quản lý người dùng
            </span>
          </div>
          <div className="menu-item" onClick={() => setActiveMenu('services')}>
            <span className={`menu-link ${activeMenu === 'services' ? 'active' : ''}`}>
              🛠️ Quản lý dịch vụ
            </span>
          </div>
          <div className="menu-item" onClick={() => setActiveMenu('settings')}>
            <span className={`menu-link ${activeMenu === 'settings' ? 'active' : ''}`}>
              ⚙️ Cài đặt
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {activeMenu === 'dashboard' && (
            <div className="content-section">
              <h2 className="section-title">📊 Dashboard</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>{users.length}</h3>
                    <p>Tổng người dùng</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-info">
                    <h3>{posts.length}</h3>
                    <p>Tổng bài viết</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🛠️</div>
                  <div className="stat-info">
                    <h3>{services.length}</h3>
                    <p>Tổng dịch vụ</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'users' && (
            <div className="content-section">
              {loading && <p className="loading-text">⏳ Đang tải dữ liệu...</p>}
              
              {error && (
                <div className="error-message">
                  ❌ Lỗi: {error}
                </div>
              )}
              
              {!loading && !error && (
                <div className="users-section">
                  <div className="users-header">
                    <h2 className="users-title">
                      👥 Danh sách người dùng ({users.length})
                    </h2>
                    <button onClick={fetchUsers} className="refresh-button">
                      🔄 Làm mới
                    </button>
                  </div>
                  
                  {users.length === 0 ? (
                    <p className="no-users">Chưa có người dùng nào trong hệ thống</p>
                  ) : (
                    <table className="users-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Ngày tạo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                              <span className={`role-badge ${user.role || 'user'}`}>
                                {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                              </span>
                            </td>
                            <td>
                              {new Date(user.createdAt).toLocaleString('vi-VN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          )}

          {activeMenu === 'posts' && (
            <div className="content-section">
              <div className="users-header">
                <h2 className="section-title">📝 Quản lý bài viết</h2>
                <button onClick={fetchPosts} className="refresh-button">
                  🔄 Làm mới
                </button>
              </div>

              {loading && <p className="loading-text">⏳ Đang tải dữ liệu...</p>}
              
              {error && (
                <div className="error-message">
                  ❌ Lỗi: {error}
                </div>
              )}
              
              {!loading && !error && posts.length === 0 && (
                <p className="no-users">Chưa có bài viết nào trong hệ thống</p>
              )}

              {!loading && !error && posts.length > 0 && (
                <div className="posts-grid">
                  {posts.map((post) => (
                    <div key={post._id} className="post-card">
                      {post.imageUrl && (
                        <div className="post-image">
                          <img src={post.imageUrl} alt={post.title} />
                        </div>
                      )}
                      <div className="post-content">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-text">{post.content}</p>
                        <div className="post-footer">
                          <span className="post-date">
                            📅 {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeMenu === 'services' && (
            <div className="content-section">
              <h2 className="section-title">🛠️ Quản lý dịch vụ</h2>
              <button onClick={fetchServices} className="refresh-button">
                🔄 Làm mới
              </button>
              {loading && <p className="loading-text">⏳ Đang tải dữ liệu...</p>}
              {error && (
                <div className="error-message">
                  ❌ Lỗi: {error}
                </div>
              )}
              {!loading && !error && services.length === 0 && (
                <p className="no-users">Chưa có dịch vụ nào trong hệ thống</p>
              )}
              {!loading && !error && services.length > 0 && (
                <div className="services-grid">
                  {services.map((service) => (
                    <div key={service._id} className="service-card">
                      <div className="service-header">
                        <div className="service-icon">
                          <i className={service.icon}></i>
                        </div>
                        <h3 className="service-title">{service.title}</h3>
                      </div>
                      <p className="service-content">{service.content}</p>
                      <ul className="service-description">
                        {service.description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {activeMenu === 'settings' && (
            <div className="content-section">
              <h2 className="section-title">⚙️ Cài đặt</h2>
              <p className="placeholder-text">Chức năng đang được phát triển...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;