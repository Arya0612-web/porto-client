import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectList from '../../components/admin/ProjectList';
import ProjectForm from '../../components/admin/ProjectForm';
import MessageList from '../../components/admin/MessageList';
import Dashboard from '../../components/admin/Dashboard';
import {
  FaSignOutAlt,
  FaPlus,
  FaCog,
  FaChartBar,
  FaUsers,
  FaFolder,
  FaBell,
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaChevronLeft,
  FaRocket,
  FaShieldAlt,
  FaHome,
  FaEnvelope,
  FaFileAlt,
  FaUserCircle,
  FaCreditCard,
  FaQuestionCircle
} from 'react-icons/fa';
import { FiSettings, FiBarChart2, FiMessageSquare, FiHelpCircle } from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hovered, setHovered] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProjects();
    fetchUnreadCount();
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/messages/count/unread`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setUnreadCount(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      setMessagesLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(Array.isArray(data.messages) ? data.messages : []);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
    setActiveTab('add-project');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Gagal menghapus proyek');
    }
  };

  const handleFormSubmit = () => {
    setEditingProject(null);
    setShowForm(false);
    setActiveTab('projects');
    fetchProjects();
  };

  const handleCancel = () => {
    setEditingProject(null);
    setShowForm(false);
    setActiveTab('projects');
  };

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <RiDashboardLine /> },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: <FaEnvelope />,
      badge: unreadCount
    },
    { id: 'projects', label: 'Projects', icon: <FaFolder /> },
    { id: 'add-project', label: 'Add Project', icon: <FaPlus /> },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 /> },
    { id: 'users', label: 'Users', icon: <FaUsers /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
    { id: 'billing', label: 'Billing', icon: <FaCreditCard /> },
  ];

  const quickNavItems = [
    { id: 'help', label: 'Help Center', icon: <FaQuestionCircle /> },
    { id: 'docs', label: 'Documentation', icon: <FaFileAlt /> },
    { id: 'support', label: 'Support', icon: <FaShieldAlt /> },
  ];

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .admin-dashboard {
          min-height: 100vh;
          display: flex;
          background: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        /* Sidebar - Modern Minimalist Design */
        .sidebar {
          width: ${sidebarOpen ? '260px' : '70px'};
          background: #ffffff;
          color: #111827;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 100;
          overflow: hidden;
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.03);
          border-right: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 80px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          position: relative;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: #111827;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
          color: white;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 600;
          opacity: ${sidebarOpen ? '1' : '0'};
          transition: opacity 0.3s ease 0.1s;
          white-space: nowrap;
          overflow: hidden;
          color: #111827;
        }

        /* Expand Button */
        .expand-btn {
          position: absolute;
          right: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          background: #111827;
          border: none;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 101;
          font-size: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          opacity: ${!sidebarOpen || hovered ? '1' : '0'};
          visibility: ${!sidebarOpen || hovered ? 'visible' : 'hidden'};
        }

        .expand-btn:hover {
          transform: translateY(-50%) scale(1.1);
          background: #000;
        }

        /* Navigation */
        .sidebar-nav {
          padding: 20px 0;
          flex: 1;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
        }

        .sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }

        .nav-section {
          margin-bottom: 4px;
        }

        .section-label {
          padding: 0 20px 8px 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #9ca3af;
          opacity: ${sidebarOpen ? '1' : '0'};
          transition: opacity 0.3s ease;
          white-space: nowrap;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          color: #6b7280;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          cursor: pointer;
          white-space: nowrap;
          margin: 0 8px;
          border-radius: 8px;
        }

        .nav-item:hover {
          background: rgba(0, 0, 0, 0.03);
          color: #111827;
        }

        .nav-item.active {
          background: rgba(0, 0, 0, 0.05);
          color: #111827;
        }

        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: #111827;
          border-radius: 0 2px 2px 0;
        }

        .nav-icon {
          font-size: 16px;
          flex-shrink: 0;
          width: 24px;
          text-align: center;
          color: #6b7280;
        }

        .nav-item:hover .nav-icon,
        .nav-item.active .nav-icon {
          color: #111827;
        }

        .nav-label {
          opacity: ${sidebarOpen ? '1' : '0'};
          transition: opacity 0.3s ease;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          font-size: 14px;
        }

        .nav-badge {
          margin-left: auto;
          background: #111827;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 600;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: ${sidebarOpen ? '1' : '0'};
          transition: opacity 0.3s ease;
        }

        /* User Profile */
        .user-profile {
          padding: 20px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(0, 0, 0, 0.02);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background: #111827;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          flex-shrink: 0;
          font-weight: 600;
        }

        .user-info {
          opacity: ${sidebarOpen ? '1' : '0'};
          transition: opacity 0.3s ease;
          overflow: hidden;
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          color: #111827;
        }

        .user-role {
          font-size: 11px;
          color: #9ca3af;
          background: rgba(0, 0, 0, 0.04);
          padding: 2px 8px;
          border-radius: 10px;
          display: inline-block;
        }

        /* Tooltip for Collapsed State */
        .nav-tooltip {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          background: #111827;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          pointer-events: none;
        }

        .nav-tooltip::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px 6px 6px 0;
          border-style: solid;
          border-color: transparent #111827 transparent transparent;
        }

        .sidebar-collapsed .nav-item:hover .nav-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(-50%) translateX(0);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: ${sidebarOpen ? '260px' : '70px'};
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 100vh;
          background: #fafafa;
        }

        /* Top Header - Modern Minimalist */
        .top-header {
          height: 70px;
          background: white;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 90;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .mobile-toggle {
          display: none;
          background: #111827;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-toggle:hover {
          background: #000;
          transform: scale(1.05);
        }

        .page-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .page-title::before {
          content: '';
          width: 3px;
          height: 20px;
          background: #111827;
          border-radius: 2px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-box {
          position: relative;
        }

        .search-input {
          padding: 10px 16px 10px 40px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          font-size: 14px;
          min-width: 280px;
          transition: all 0.2s ease;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: rgba(0, 0, 0, 0.2);
          min-width: 300px;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.02);
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 14px;
        }

        .notifications {
          position: relative;
          cursor: pointer;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .notifications:hover {
          border-color: rgba(0, 0, 0, 0.15);
          background: rgba(0, 0, 0, 0.02);
          transform: translateY(-1px);
        }

        .notification-icon {
          font-size: 16px;
          color: #6b7280;
          transition: all 0.2s ease;
        }

        .notifications:hover .notification-icon {
          color: #111827;
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #111827;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 600;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 12px;
          border-radius: 8px;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .user-menu:hover {
          border-color: rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .user-menu-avatar {
          width: 32px;
          height: 32px;
          background: #111827;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          font-weight: 600;
        }

        .user-menu-info {
          display: flex;
          flex-direction: column;
        }

        .user-menu-name {
          font-weight: 600;
          font-size: 13px;
          color: #111827;
        }

        .user-menu-role {
          font-size: 11px;
          color: #9ca3af;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #111827;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: #000;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Dashboard Content */
        .dashboard-content {
          padding: 24px;
        }

        /* Loading State */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          text-align: center;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0, 0, 0, 0.08);
          border-top-color: #111827;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-state p {
          color: #6b7280;
          font-size: 14px;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 60px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.2;
          color: #111827;
        }

        .empty-state h3 {
          font-size: 16px;
          color: #111827;
          margin-bottom: 8px;
        }

        .empty-state p {
          color: #6b7280;
          margin-bottom: 20px;
          font-size: 14px;
        }

        /* Button Styles */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          text-decoration: none;
        }

        .btn-primary {
          background: #111827;
          color: white;
        }

        .btn-primary:hover {
          background: #000;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .btn-secondary {
          background: white;
          color: #111827;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .btn-secondary:hover {
          border-color: rgba(0, 0, 0, 0.2);
          color: #111827;
          transform: translateY(-1px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
            width: 260px;
          }
          
          .sidebar.open {
            transform: translateX(0);
          }
          
          .main-content {
            margin-left: 0 !important;
          }
          
          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .expand-btn {
            display: none;
          }
          
          .search-input {
            min-width: 200px;
          }
        }

        @media (max-width: 768px) {
          .top-header {
            padding: 0 16px;
          }
          
          .dashboard-content {
            padding: 16px;
          }
          
          .search-input {
            min-width: 150px;
          }
        }

        @media (max-width: 480px) {
          .header-right {
            gap: 12px;
          }
          
          .search-box {
            display: none;
          }
          
          .user-menu {
            padding: 6px;
          }
          
          .user-menu-info {
            display: none;
          }
          
          .logout-btn span {
            display: none;
          }
          
          .logout-btn {
            padding: 8px;
            border-radius: 8px;
          }
          
          .notifications {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>

      <div className="admin-dashboard">
        {/* Sidebar */}
        <div 
          className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="sidebar-header">
            <div className="logo">
              <div className="logo-icon">
                <FaRocket />
              </div>
              
            </div>
            
            {/* Floating Expand Button */}
            <button 
              className="expand-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? 
                <FaChevronLeft /> : 
                <FaChevronRight />
              }
            </button>
          </div>

          <div className="sidebar-nav">
            <div className="nav-section">
              <div className="section-label">Main</div>
              {navItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id === 'add-project') {
                      setEditingProject(null);
                      setShowForm(true);
                    } else {
                      setShowForm(false);
                    }
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                >
                  <span className="nav-icon">
                    {item.icon}
                  </span>
                  <span className="nav-label">{item.label}</span>
                  {item.id === 'messages' && unreadCount > 0 && (
                    <span className="nav-badge">{unreadCount}</span>
                  )}
                  <div className="nav-tooltip">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="nav-section">
              <div className="section-label">Management</div>
              {navItems.slice(4, 6).map((item) => (
                <div
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                >
                  <span className="nav-icon">
                    {item.icon}
                  </span>
                  <span className="nav-label">{item.label}</span>
                  <div className="nav-tooltip">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="nav-section">
              <div className="section-label">Settings</div>
              {navItems.slice(6).map((item) => (
                <div
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                >
                  <span className="nav-icon">
                    {item.icon}
                  </span>
                  <span className="nav-label">{item.label}</span>
                  <div className="nav-tooltip">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="nav-section">
              <div className="section-label">Support</div>
              {quickNavItems.map((item) => (
                <div
                  key={item.id}
                  className="nav-item"
                  onClick={() => {
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                >
                  <span className="nav-icon">
                    {item.icon}
                  </span>
                  <span className="nav-label">{item.label}</span>
                  <div className="nav-tooltip">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="user-profile">
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="user-info">
              <div className="user-name">{user.name || 'Administrator'}</div>
              <div className="user-role">{user.role || 'Admin'}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Top Header */}
          <header className="top-header">
            <div className="header-left">
              <button 
                className="mobile-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              <h1 className="page-title">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'projects' && 'Project Management'}
                {activeTab === 'add-project' && (editingProject ? 'Edit Project' : 'Add New Project')}
                {activeTab === 'analytics' && 'Analytics & Reports'}
                {activeTab === 'messages' && 'Messages'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'settings' && 'Settings'}
                {activeTab === 'billing' && 'Billing'}
              </h1>
            </div>

            <div className="header-right">
              <div className="search-box">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="search-icon" />
              </div>

              <div className="notifications">
                <FaBell className="notification-icon" />
                <span className="notification-badge">3</span>
              </div>

              <div className="user-menu">
                <div className="user-menu-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="user-menu-info">
                  <div className="user-menu-name">{user.name || 'Admin'}</div>
                  <div className="user-menu-role">{user.role || 'Admin'}</div>
                </div>
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="dashboard-content">
            {/* Render komponen berdasarkan activeTab */}
            {activeTab === 'dashboard' && (
              <Dashboard />
            )}

            {/* Projects Tab */}
            {(activeTab === 'projects' || (activeTab === 'add-project' && showForm)) && (
              <>
                {showForm && activeTab === 'add-project' && (
                  <ProjectForm
                    project={editingProject}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                  />
                )}

                {activeTab === 'projects' && (
                  <>
                    {loading ? (
                      <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading projects...</p>
                      </div>
                    ) : filteredProjects.length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon">📁</div>
                        <h3>No projects found</h3>
                        <p>{searchTerm ? 'Try another search term' : 'Start by adding your first project'}</p>
                        <button 
                          className="btn btn-primary"
                          onClick={() => {
                            setActiveTab('add-project');
                            setEditingProject(null);
                            setShowForm(true);
                          }}
                        >
                          <FaPlus /> Add First Project
                        </button>
                      </div>
                    ) : (
                      <ProjectList
                        projects={filteredProjects}
                        onEdit={(project) => {
                          setEditingProject(project);
                          setActiveTab('add-project');
                          setShowForm(true);
                        }}
                        onDelete={handleDelete}
                      />
                    )}
                  </>
                )}
              </>
            )}

            {/* Other Tabs Placeholder */}
            {activeTab === 'analytics' && (
              <div className="content-header">
                <h2 className="content-title">
                  <FaChartBar /> Analytics
                </h2>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="content-header">
                <h2 className="content-title">
                  <FaUsers /> Users
                </h2>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="content-header">
                <h2 className="content-title">
                  <FaCog /> Settings
                </h2>
              </div>
            )}

            {activeTab === 'messages' && (
              <MessageList 
                messages={messages}
                loading={messagesLoading}
                onRefresh={fetchMessages}
              />
            )}

            {activeTab === 'billing' && (
              <div className="content-header">
                <h2 className="content-title">
                  <FaCreditCard /> Billing
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
