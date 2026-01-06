import React, { useState, useEffect } from "react";
import "./admin-page.css";
import "./admin-page-enhance.css";
import API_URL from "../../config/api.js";

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
  const [contacts, setContacts] = useState([]);

  // Pagination states
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [currentServicePage, setCurrentServicePage] = useState(1);
  const itemsPerPage = 6;

  // Modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form states
  const [userForm, setUserForm] = useState({ name: '', username: '', email: '', password: '', role: 'user' });
  const [postForm, setPostForm] = useState({ title: '', content: '', imageUrl: '' });
  const [serviceForm, setServiceForm] = useState({ icon: '', title: '', content: '', description: [] });
  const [showPassword, setShowPassword] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Kiểm tra xem đã login chưa khi component mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      const user = JSON.parse(adminToken);
      // Kiểm tra xem user có phải admin không
      if (user.role === 'admin') {
        setIsLoggedIn(true);
        fetchUsers();
        fetchPosts();
        fetchServices();
      } else {
        // Nếu không phải admin, xóa token và yêu cầu đăng nhập lại
        localStorage.removeItem('adminToken');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Xử lý login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Kiểm tra xem user có phải là admin không
        if (data.user.role !== 'admin') {
          setLoginError('Chỉ admin mới có quyền truy cập trang này!');
          return;
        }
        // Lưu token và user vào localStorage
        localStorage.setItem('accessToken', data.acesstoken);
        localStorage.setItem('refreshToken', data.refreshtoken);
        localStorage.setItem('adminToken', JSON.stringify(data.user));
        setIsLoggedIn(true);
        fetchUsers();
        fetchPosts();
        fetchServices();
      } else {
        setLoginError(data.message || 'Đăng nhập thất bại!');
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
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
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
      const token = localStorage.getItem('accessToken');
      // Bước 3: Gọi API để lấy dữ liệu bài viết
      const response = await fetch(`${API_URL}/api/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/services`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
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

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Không thể lấy danh sách liên hệ');
      }

      const data = await response.json();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Lỗi khi lấy liên hệ:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ============ PAGINATION LOGIC ============
  const getPaginatedData = (data, currentPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const getTotalPages = (dataLength) => {
    return Math.ceil(dataLength / itemsPerPage);
  };

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination">
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          ◀ Trước
        </button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Sau ▶
        </button>
      </div>
    );
  };

  // ============ USER CRUD FUNCTIONS ============
  const handleAddUser = () => {
    setEditingItem(null);
    setUserForm({ name: '', username: '', email: '', password: '', role: 'user' });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingItem(user);
    setUserForm({ name: user.name || '', username: user.username, email: user.email, password: user.password || '', role: user.role });
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error('Lỗi khi xóa người dùng:', err);
    }
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('accessToken');
      const url = editingItem 
        ? `${API_URL}/api/users/${editingItem._id}`
        : `${API_URL}/api/users`;
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userForm),
      });
      
      if (response.ok) {
        setShowUserModal(false);
        fetchUsers();
      }
    } catch (err) {
      console.error('Lỗi khi lưu người dùng:', err);
    }
  };

  // ============ POST CRUD FUNCTIONS ============
  const handleAddPost = () => {
    setEditingItem(null);
    setPostForm({ title: '', content: '', imageUrl: '' });
    setShowPostModal(true);
  };

  const handleEditPost = (post) => {
    setEditingItem(post);
    setPostForm({ title: post.title, content: post.content, imageUrl: post.imageUrl || '' });
    setShowPostModal(true);
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error('Lỗi khi xóa bài viết:', err);
    }
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('accessToken');
      const url = editingItem 
        ? `${API_URL}/api/posts/${editingItem._id}`
        : `${API_URL}/api/posts`;
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postForm),
      });
      
      if (response.ok) {
        setShowPostModal(false);
        fetchPosts();
      }
    } catch (err) {
      console.error('Lỗi khi lưu bài viết:', err);
    }
  };

  // ============ SERVICE CRUD FUNCTIONS ============
  const handleAddService = () => {
    setEditingItem(null);
    setServiceForm({ icon: '', title: '', content: '', description: [] });
    setShowServiceModal(true);
  };

  const handleEditService = (service) => {
    setEditingItem(service);
    setServiceForm({ 
      icon: service.icon, 
      title: service.title, 
      content: service.content, 
      description: service.description || [] 
    });
    setShowServiceModal(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error('Lỗi khi xóa dịch vụ:', err);
    }
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('accessToken');
      const url = editingItem 
        ? `${API_URL}/api/services/${editingItem._id}`
        : `${API_URL}/api/services`;
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(serviceForm),
      });
      
      if (response.ok) {
        setShowServiceModal(false);
        fetchServices();
      }
    } catch (err) {
      console.error('Lỗi khi lưu dịch vụ:', err);
    }
  };

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
        {/* Hamburger Button */}
        <button 
          className="hamburger-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Sidebar Menu */}
        <div className={`sidebar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="menu-item" onClick={() => { setActiveMenu('dashboard'); setIsMobileMenuOpen(false); }}>
            <span className={`menu-link ${activeMenu === 'dashboard' ? 'active' : ''}`}>
              📊 Dashboard
            </span>
          </div>
          <div className="menu-item" onClick={() => { setActiveMenu('posts'); setIsMobileMenuOpen(false); }}>
            <span className={`menu-link ${activeMenu === 'posts' ? 'active' : ''}`}>
              📝 Quản lý số lượng bài viết
            </span>
          </div>
          <div className="menu-item" onClick={() => { setActiveMenu('users'); setIsMobileMenuOpen(false); }}>
            <span className={`menu-link ${activeMenu === 'users' ? 'active' : ''}`}>
              👥 Quản lý người dùng
            </span>
          </div>
          <div className="menu-item" onClick={() => { setActiveMenu('services'); setIsMobileMenuOpen(false); }}>
            <span className={`menu-link ${activeMenu === 'services' ? 'active' : ''}`}>
              🛠️ Quản lý dịch vụ
            </span>
          </div>
          <div className="menu-item" onClick={() => { setActiveMenu('contacts'); setIsMobileMenuOpen(false); }}>
            <span className={`menu-link ${activeMenu === 'contacts' ? 'active' : ''}`}>
              ✉️ Liên hệ
            </span>
          </div>
          <div className="menu-item" onClick={() => { setActiveMenu('settings'); setIsMobileMenuOpen(false); }}>
            <span className={`menu-link ${activeMenu === 'settings' ? 'active' : ''}`}>
              ⚙️ Cài đặt
            </span>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-overlay" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

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
                <div className="stat-card">
                  <div className="stat-icon">✉️</div>
                  <div className="stat-info">
                    <h3>{contacts.length}</h3>
                    <p>Tổng liên hệ</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'contacts' && (
            <div className="content-section">
              <h2 className="section-title-admin">✉️ Danh sách liên hệ</h2>
              {loading && <p className="loading-text">⏳ Đang tải dữ liệu...</p>}
              {error && <div className="error-message">❌ Lỗi: {error}</div>}
              {!loading && !error && contacts.length === 0 && (
                <p className="no-users">Chưa có liên hệ nào</p>
              )}
              {!loading && !error && contacts.length > 0 && (
                <div className="table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Ngày</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((c) => (
                        <tr key={c._id}>
                          <td>{c._id}</td>
                          <td>{c.full_name}</td>
                          <td>{c.email}</td>
                          <td>{c.subject || 'N/A'}</td>
                          <td>{c.message}</td>
                          <td>{new Date(c.createdAt).toLocaleString('vi-VN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
                    <div className="header-actions">
                      <button onClick={handleAddUser} className="add-button">
                        ➕ Thêm người dùng
                      </button>
                      <button onClick={fetchUsers} className="refresh-button">
                        🔄 Làm mới
                      </button>
                    </div>
                  </div>
                  
                  {users.length === 0 ? (
                    <p className="no-users">Chưa có người dùng nào trong hệ thống</p>
                  ) : (
                    <>
                      <div className="table-container">
                        <table className="users-table">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Tên</th>
                              <th>Username</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Ngày tạo</th>
                              <th>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getPaginatedData(users, currentUserPage).map((user) => (
                              <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name || 'N/A'}</td>
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
                                <td>
                                  <div className="action-buttons">
                                    <button onClick={() => handleEditUser(user)} className="edit-btn" title="Sửa">
                                      ✏️
                                    </button>
                                    <button onClick={() => handleDeleteUser(user._id)} className="delete-btn" title="Xóa">
                                      🗑️
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Pagination 
                        currentPage={currentUserPage} 
                        totalPages={getTotalPages(users.length)} 
                        onPageChange={setCurrentUserPage} 
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {activeMenu === 'posts' && (
            <div className="content-section">
              <div className="users-header posts-header">
                <h2 className="section-title-admin">📝 Quản lý số lượng bài viết</h2>
                <div className="header-actions">
                  <button onClick={handleAddPost} className="add-button">
                    ➕ Thêm bài viết
                  </button>
                  <button onClick={fetchPosts} className="refresh-button">
                    🔄 Làm mới
                  </button>
                </div>
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
                <>
                  <div className="posts-grid">
                    {getPaginatedData(posts, currentPostPage).map((post) => (
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
                            <div className="action-buttons">
                              <button onClick={() => handleEditPost(post)} className="edit-btn" title="Sửa">
                                ✏️
                              </button>
                              <button onClick={() => handleDeletePost(post._id)} className="delete-btn" title="Xóa">
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Pagination 
                    currentPage={currentPostPage} 
                    totalPages={getTotalPages(posts.length)} 
                    onPageChange={setCurrentPostPage} 
                  />
                </>
              )}
            </div>
          )}

          {activeMenu === 'services' && (
            <div className="content-section">
              <div className="users-header services-header">
                <h2 className="section-title-admin">🛠️ Quản lý dịch vụ</h2>
                <div className="header-actions">
                  <button onClick={handleAddService} className="add-button">
                    ➕ Thêm dịch vụ
                  </button>
                  <button onClick={fetchServices} className="refresh-button">
                    🔄 Làm mới
                  </button>
                </div>
              </div>
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
                <>
                  <div className="services-grid">
                    {getPaginatedData(services, currentServicePage).map((service) => (
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
                        <div className="card-actions">
                          <button onClick={() => handleEditService(service)} className="edit-btn" title="Sửa">
                            ✏️ Sửa
                          </button>
                          <button onClick={() => handleDeleteService(service._id)} className="delete-btn" title="Xóa">
                            🗑️ Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Pagination 
                    currentPage={currentServicePage} 
                    totalPages={getTotalPages(services.length)} 
                    onPageChange={setCurrentServicePage} 
                  />
                </>
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

      {/* User Modal */}
      {showUserModal && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{editingItem ? '✏️ Sửa người dùng' : '➕ Thêm người dùng'}</h3>
            <form onSubmit={handleSaveUser}>
              <div className="form-group">
                <label>Tên đầy đủ</label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  required
                  placeholder="Nhập tên đầy đủ"
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={userForm.username}
                  onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password {editingItem && '(có thể thay đổi mật khẩu mới)'}</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userForm.password}
                    onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                    required={!editingItem}
                    placeholder={editingItem ? "Mật khẩu hiện tại" : "Nhập mật khẩu"}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowUserModal(false)} className="cancel-btn">
                  Hủy
                </button>
                <button type="submit" className="submit-btn">
                  {editingItem ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Modal */}
      {showPostModal && (
        <div className="modal-overlay" onClick={() => setShowPostModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{editingItem ? '✏️ Sửa bài viết' : '➕ Thêm bài viết'}</h3>
            <form onSubmit={handleSavePost}>
              <div className="form-group">
                <label>Tiêu đề</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nội dung</label>
                <textarea
                  rows="5"
                  value={postForm.content}
                  onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>URL hình ảnh</label>
                <input
                  type="url"
                  value={postForm.imageUrl}
                  onChange={(e) => setPostForm({...postForm, imageUrl: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowPostModal(false)} className="cancel-btn">
                  Hủy
                </button>
                <button type="submit" className="submit-btn">
                  {editingItem ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="modal-overlay" onClick={() => setShowServiceModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{editingItem ? '✏️ Sửa dịch vụ' : '➕ Thêm dịch vụ'}</h3>
            <form onSubmit={handleSaveService}>
              <div className="form-group">
                <label>Icon (FontAwesome class)</label>
                <input
                  type="text"
                  value={serviceForm.icon}
                  onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}
                  placeholder="fa-solid fa-code"
                  required
                />
              </div>
              <div className="form-group">
                <label>Tiêu đề</label>
                <input
                  type="text"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nội dung</label>
                <textarea
                  rows="3"
                  value={serviceForm.content}
                  onChange={(e) => setServiceForm({...serviceForm, content: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mô tả (mỗi dòng một mục)</label>
                <textarea
                  rows="4"
                  value={serviceForm.description.join('\n')}
                  onChange={(e) => setServiceForm({...serviceForm, description: e.target.value.split('\n')})}
                  placeholder="Tính năng 1&#10;Tính năng 2&#10;Tính năng 3"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowServiceModal(false)} className="cancel-btn">
                  Hủy
                </button>
                <button type="submit" className="submit-btn">
                  {editingItem ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;