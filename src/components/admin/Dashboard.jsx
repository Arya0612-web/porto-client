import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaFolder,
  FaCheck,
  FaStar,
  FaEye,
  FaChartBar,
  FaPlus,
  FaFileAlt,
  FaUsers,
  FaBell,
  FaRocket,
  FaCalendar,
  FaArrowUp,
  FaArrowDown,
  FaCog
} from 'react-icons/fa';
import {
  FiBarChart2,
  FiSettings,
  FiCreditCard,
  FiHelpCircle,
  FiMessageSquare,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    featuredProjects: 0,
    totalViews: 0,
    totalMessages: 0,
    activeUsers: 0,
    todayViews: 0,
    conversionRate: 0
  });

  const [recentProjects, setRecentProjects] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Simulasi fetch data dari API
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setStats((prev) => ({
          ...prev,
          totalProjects: data.stats.totalProjects,
          totalViews: data.stats.totalViews,
          featuredProjects: data.stats.featuredProjects,
          totalMessages: data.stats.totalMessages
        }));
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const getTrendIcon = (value) => {
    return value > 0 ? <FiTrendingUp className="text-green-500" /> : <FiTrendingDown className="text-red-500" />;
  };

  const getTrendClass = (value) => {
    return value > 0 ? 'trend-up' : 'trend-down';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            gap: 20px;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid #e2e8f0;
            border-top-color: #111827;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          p {
            color: #6b7280;
            font-size: 14px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .dashboard-page {
          padding: 0;
        }

        /* Welcome Banner */
        .welcome-banner {
          background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
          color: white;
          padding: 32px;
          border-radius: 16px;
          margin-bottom: 32px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          position: relative;
          overflow: hidden;
        }

        .welcome-banner::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
        }

        .welcome-content h2 {
          font-size: 24px;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
          color: #d1d5db;
        }

        .welcome-content p {
          opacity: 0.9;
          margin-bottom: 0;
          position: relative;
          z-index: 1;
          color: #d1d5db;
          font-size: 14px;
        }

        .welcome-actions {
          display: flex;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-size: 14px;
        }

        .btn-primary {
          background: white;
          color: #111827;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .btn-outline {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
        }

        /* Quick Stats */
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .stat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: white;
        }

        .stat-icon.projects { background: #111827; }
        .stat-icon.published { background: #059669; }
        .stat-icon.featured { background: #d97706; }
        .stat-icon.views { background: #7c3aed; }
        .stat-icon.messages { background: #ec4899; }
        .stat-icon.users { background: #0891b2; }
        .stat-icon.conversion { background: #db2777; }
        .stat-icon.today { background: #2563eb; }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .trend-up {
          color: #059669;
        }

        .trend-down {
          color: #dc2626;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }

        .stat-label {
          color: #6b7280;
          font-size: 13px;
          font-weight: 400;
        }

        /* Charts & Analytics */
        .analytics-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        @media (max-width: 1024px) {
          .analytics-section {
            grid-template-columns: 1fr;
          }
        }

        .chart-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .chart-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        /* Recent Activity */
        .recent-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .activity-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .activity-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .activity-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .activity-item:hover {
          background: rgba(0, 0, 0, 0.02);
        }

        .activity-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(17, 24, 39, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111827;
          font-size: 14px;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-title {
          font-weight: 500;
          color: #111827;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .activity-meta {
          color: #6b7280;
          font-size: 12px;
        }

        /* Quick Actions */
        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .quick-action-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-action-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          border-color: #111827;
        }

        .quick-action-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
        }

        .quick-action-content h4 {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
        }

        .quick-action-content p {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        /* Empty Chart Placeholder */
        .chart-placeholder {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 14px;
          border: 2px dashed #e5e7eb;
          border-radius: 8px;
          margin-top: 20px;
        }

        /* View All Button */
        .view-all {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #111827;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .view-all:hover {
          background: rgba(0, 0, 0, 0.04);
        }

        /* Status Badges */
        .status-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        .status-published {
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
        }

        .status-draft {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .welcome-banner {
            flex-direction: column;
            text-align: center;
            padding: 24px;
          }

          .welcome-actions {
            justify-content: center;
          }

          .quick-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .recent-grid {
            grid-template-columns: 1fr;
          }

          .quick-actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .quick-stats {
            grid-template-columns: 1fr;
          }

          .quick-actions-grid {
            grid-template-columns: 1fr;
          }

          .btn {
            padding: 8px 16px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="dashboard-page">
        {/* Welcome Banner
        <div className="welcome-banner">
          <div className="welcome-content">
            <h2>Welcome back, Admin! </h2>
            <p>Here's what's happening with your website today.</p>
          </div>
          <div className="welcome-actions">
            <button className="btn btn-primary">
              <FaPlus /> Add Project
            </button>
            <button className="btn btn-outline">
              <FaChartBar /> View Analytics
            </button>
          </div>
        </div> */}

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon projects">
                <FaFolder />
              </div>
              <div className="stat-trend trend-up">
                {getTrendIcon(12)}
                <span>+12%</span>
              </div>
            </div>
            <div className="stat-value">{stats.totalProjects}</div>
            <div className="stat-label">Total Projects</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon published">
                <FaCheck />
              </div>
              <div className="stat-trend trend-up">
                {getTrendIcon(8)}
                <span>+8%</span>
              </div>
            </div>
            <div className="stat-value">{stats.totalMessages}</div>
            <div className="stat-label">Total Message</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon featured">
                <FaStar />
              </div>
              <div className="stat-trend trend-up">
                {getTrendIcon(5)}
                <span>+5%</span>
              </div>
            </div>
            <div className="stat-value">{stats.featuredProjects}</div>
            <div className="stat-label">Featured</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon views">
                <FaEye />
              </div>
              <div className="stat-trend trend-up">
                {getTrendIcon(23)}
                <span>+23%</span>
              </div>
            </div>
            <div className="stat-value">
              {stats.totalViews >= 1000
                ? (stats.totalViews / 1000).toFixed(1) + "K"
                : stats.totalViews}
            </div>
            <div className="stat-label">Total Views</div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="analytics-section">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Traffic Overview</h3>
              <select style={{ 
                padding: '6px 12px', 
                border: '1px solid #e5e7eb', 
                borderRadius: '6px', 
                fontSize: '13px',
                color: '#6b7280',
                background: 'white'
              }}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="chart-placeholder">
              <FaChartBar style={{ fontSize: '24px', marginRight: '8px' }} />
              Traffic chart will appear here
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Performance</h3>
              <span className="view-all">
                Details <FaArrowUp style={{ transform: 'rotate(45deg)' }} />
              </span>
            </div>
            <div className="chart-placeholder">
              <FiBarChart2 style={{ fontSize: '24px', marginRight: '8px' }} />
              Performance metrics
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-grid">
          <div className="activity-card">
            <div className="activity-header">
              <h3><FaFolder /> Recent Projects</h3>
              <span 
                className="view-all"
                onClick={() => navigate('/admin/projects')}
              >
                View All <FaArrowUp style={{ transform: 'rotate(45deg)' }} />
              </span>
            </div>
            <div className="activity-list">
              {recentProjects.map((project) => (
                <div key={project.id} className="activity-item">
                  <div className="activity-icon">
                    <FaFileAlt />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{project.title}</div>
                    <div className="activity-meta" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className={`status-badge status-${project.status}`}>
                        {project.status}
                      </span>
                      <span>{project.views} views</span>
                      <span>{project.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="activity-card">
            <div className="activity-header">
              <h3><FiMessageSquare /> Recent Messages</h3>
              <span 
                className="view-all"
                onClick={() => navigate('/admin/messages')}
              >
                View All <FaArrowUp style={{ transform: 'rotate(45deg)' }} />
              </span>
            </div>
            <div className="activity-list">
              {recentMessages.map((message) => (
                <div key={message.id} className="activity-item">
                  <div className="activity-icon">
                    <FaBell />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{message.name}</div>
                    <div className="activity-meta" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{message.email}</span>
                      <span>{message.time}</span>
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
                      {message.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-grid">
          <div 
            className="quick-action-card"
            onClick={() => navigate('/admin/projects/add')}
          >
            <div className="quick-action-icon">
              <FaPlus />
            </div>
            <div className="quick-action-content">
              <h4>Add New Project</h4>
              <p>Create a new portfolio project</p>
            </div>
          </div>

          <div 
            className="quick-action-card"
            onClick={() => navigate('/admin/messages')}
          >
            <div className="quick-action-icon">
              <FiMessageSquare />
            </div>
            <div className="quick-action-content">
              <h4>View Messages</h4>
              <p>Check recent inquiries</p>
            </div>
          </div>

          <div 
            className="quick-action-card"
            onClick={() => navigate('/admin/analytics')}
          >
            <div className="quick-action-icon">
              <FiBarChart2 />
            </div>
            <div className="quick-action-content">
              <h4>View Analytics</h4>
              <p>See detailed statistics</p>
            </div>
          </div>

          <div 
            className="quick-action-card"
            onClick={() => navigate('/admin/settings')}
          >
            <div className="quick-action-icon">
              <FaCog />
            </div>
            <div className="quick-action-content">
              <h4>Settings</h4>
              <p>Configure your preferences</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
