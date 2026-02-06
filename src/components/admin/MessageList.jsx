import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaEnvelope, 
  FaUser, 
  FaCalendar, 
  FaEye, 
  FaReply, 
  FaArchive,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSort,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaPaperclip,
  FaTimes
} from 'react-icons/fa';
import { FiMessageSquare, FiMail, FiPhone, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    replied: 0,
    today: 0
  });

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        status: filters.status,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...(searchTerm && { search: searchTerm })
      });

      const response = await axios.get(`http://localhost:5000/api/messages?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setMessages(response.data.messages);
        setPagination(response.data.pagination);
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/messages/stats/summary', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setStats(prev => ({ ...prev, ...response.data.stats }));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [pagination.page, filters, searchTerm]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/messages/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, status: newStatus } : msg
      ));

      fetchStats();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(messages.filter(msg => msg._id !== id));
      fetchStats();
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleReply = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      unread: { label: 'Belum dibaca', bg: '#111827', color: 'white' },
      read: { label: 'Sudah dibaca', bg: 'rgba(0,0,0,0.06)', color: '#111827' },
      replied: { label: 'Sudah dibalas', bg: 'rgba(0,0,0,0.06)', color: '#111827' },
      archived: { label: 'Diarsipkan', bg: 'rgba(0,0,0,0.06)', color: '#111827' }
    };

    const config = statusConfig[status] || statusConfig.unread;
    return (
      <span 
        className="status-badge"
        style={{ 
          background: config.bg, 
          color: config.color 
        }}
      >
        {config.label}
      </span>
    );
  };

  return (
    <>
      <style jsx>{`
        .messages-container {
          background: #fafafa;
          min-height: 100vh;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .stat-value {
          font-size: 28px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .stat-label {
          color: #6b7280;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Filters Bar */
        .filters-bar {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }

        .search-box {
          flex: 1;
          min-width: 300px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          font-size: 14px;
          background: #fafafa;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: rgba(0, 0, 0, 0.2);
          background: white;
        }

        .filter-select {
          padding: 12px 16px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          font-size: 14px;
          background: #fafafa;
          color: #111827;
          cursor: pointer;
          min-width: 160px;
          transition: all 0.2s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: rgba(0, 0, 0, 0.2);
          background: white;
        }

        /* Messages List */
        .messages-list {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .message-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          background: white;
        }

        .message-header h3 {
          margin: 0;
          font-weight: 600;
          font-size: 18px;
          color: #111827;
          letter-spacing: -0.01em;
        }

        /* Message Items */
        .message-item {
          padding: 20px 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .message-item:last-child {
          border-bottom: none;
        }

        .message-item:hover {
          background: rgba(0, 0, 0, 0.02);
          transform: translateX(4px);
        }

        .message-item.unread {
          background: rgba(0, 0, 0, 0.01);
        }

        .message-item.unread:before {
          content: '';
          position: absolute;
          left: 0;
          top: 16px;
          bottom: 16px;
          width: 3px;
          background: #111827;
          border-radius: 0 2px 2px 0;
        }

        /* Message Preview */
        .message-preview {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 500;
          font-size: 16px;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .message-item:hover .avatar {
          transform: scale(1.05);
        }

        .message-content {
          flex: 1;
          min-width: 0;
        }

        .message-title {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 8px;
          gap: 16px;
        }

        .message-sender {
          font-weight: 500;
          color: #111827;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .message-sender span {
          color: #6b7280;
          font-size: 13px;
          font-weight: 400;
        }

        .message-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .message-date {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 400;
          white-space: nowrap;
        }

        .message-excerpt {
          color: #4b5563;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .message-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* Loading State */
        .loading-state {
          padding: 80px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0, 0, 0, 0.06);
          border-top-color: #111827;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-state p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        /* Empty State */
        .empty-state {
          padding: 80px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 24px;
          margin-bottom: 12px;
        }

        .empty-state h3 {
          color: #111827;
          font-size: 16px;
          font-weight: 500;
          margin: 0;
        }

        .empty-state p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
          max-width: 320px;
          line-height: 1.5;
        }

        /* Pagination */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 20px 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          background: #fafafa;
        }

        .page-btn {
          padding: 8px 14px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: white;
          color: #374151;
          font-size: 14px;
          font-weight: 400;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-btn:hover:not(:disabled) {
          background: rgba(0, 0, 0, 0.02);
          border-color: rgba(0, 0, 0, 0.12);
        }

        .page-btn.active {
          background: #111827;
          color: white;
          border-color: #111827;
        }

        .page-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* Modal Detail Pesan */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .modal-overlay.active {
          opacity: 1;
        }

        .modal-container {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 500px;
          background: white;
          box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
          z-index: 1001;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .modal-container.active {
          transform: translateX(0);
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .modal-header h3 {
          margin: 0;
          font-weight: 600;
          font-size: 18px;
          color: #111827;
          flex: 1;
        }

        .close-btn {
          background: none;
          border: none;
          color: #6b7280;
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.04);
          color: #111827;
        }

        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        .message-info {
          padding: 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .info-label {
          color: #6b7280;
          font-size: 14px;
          min-width: 80px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-value {
          color: #111827;
          font-size: 14px;
          flex: 1;
        }

        .message-body {
          padding: 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .body-label {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .body-content {
          color: #111827;
          font-size: 14px;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .modal-actions {
          padding: 20px 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          background: #fafafa;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 10px 16px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #111827;
        }

        .action-btn.primary {
          background: #111827;
          color: white;
          border-color: #111827;
        }

        .action-btn.danger {
          color: #dc2626;
          border-color: rgba(220, 38, 38, 0.2);
        }

        .action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .action-btn.primary:hover {
          background: #000;
        }

        .action-btn.danger:hover {
          background: #fee2e2;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .modal-container {
            width: 100%;
            max-width: 400px;
          }
        }

        @media (max-width: 768px) {
          .messages-container {
            padding: 16px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .filters-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .search-box {
            min-width: 100%;
          }

          .filter-select {
            min-width: 100%;
          }

          .modal-container {
            width: 100%;
          }

          .modal-header,
          .message-info,
          .message-body,
          .modal-actions {
            padding: 20px;
          }

          .message-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .message-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .message-meta {
            width: 100%;
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 24px;
          }

          .modal-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="messages-container">
        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">
              <FaEnvelope /> Total Pesan
            </div>
          </div>
          <div className="stat-card unread">
            <div className="stat-value">{stats.unread}</div>
            <div className="stat-label">
              <FaExclamationCircle /> Belum Dibaca
            </div>
          </div>
          <div className="stat-card replied">
            <div className="stat-value">{stats.replied}</div>
            <div className="stat-label">
              <FaReply /> Sudah Dibalas
            </div>
          </div>
          <div className="stat-card today">
            <div className="stat-value">{stats.today}</div>
            <div className="stat-label">
              <FaCalendar /> Hari Ini
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="search-box">
            <FaSearch style={{ 
              position: 'absolute', 
              left: '16px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#9ca3af',
              fontSize: '14px'
            }} />
            <input
              type="text"
              className="search-input"
              placeholder="Cari pesan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select 
            className="filter-select"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">Semua Status</option>
            <option value="unread">Belum Dibaca</option>
            <option value="read">Sudah Dibaca</option>
            <option value="replied">Sudah Dibalas</option>
            <option value="archived">Diarsipkan</option>
          </select>

          <select 
            className="filter-select"
            value={filters.sortBy}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
          >
            <option value="createdAt">Tanggal Terbaru</option>
            <option value="name">Nama A-Z</option>
            <option value="status">Status</option>
          </select>
        </div>

        {/* Messages List */}
        <div className="messages-list">
          <div className="message-header">
            <h3>Pesan Masuk</h3>
            <div style={{ color: '#6b7280', fontSize: '14px', fontWeight: 400 }}>
              {pagination.total} pesan ditemukan
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Memuat pesan...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FiMessageSquare />
              </div>
              <h3>
                {searchTerm ? 'Tidak ada pesan yang ditemukan' : 'Belum ada pesan'}
              </h3>
              <p>
                {searchTerm ? 'Coba kata kunci pencarian lain' : 'Semua pesan dari contact form akan muncul di sini'}
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div 
                  key={message._id}
                  className={`message-item ${message.status === 'unread' ? 'unread' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="message-preview">
                    <div className="avatar">
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="message-content">
                      <div className="message-title">
                        <div className="message-sender">
                          <span style={{ color: '#111827', fontWeight: '500' }}>
                            {message.name}
                          </span>
                          <span style={{ color: '#6b7280', fontSize: '13px' }}>
                            {message.email}
                          </span>
                        </div>
                        <div className="message-meta">
                          <span className="message-date">
                            {new Date(message.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                      </div>
                      <div className="message-excerpt">
                        {message.message.substring(0, 120)}...
                      </div>
                      <div className="message-footer">
                        {getStatusBadge(message.status)}
                        {message.phone && (
                          <span style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '6px', 
                            color: '#6b7280', 
                            fontSize: '13px',
                            fontWeight: '400'
                          }}>
                            <FiPhone style={{ fontSize: '12px' }} /> {message.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={() => setPagination({...pagination, page: pagination.page - 1})}
                    disabled={pagination.page === 1}
                  >
                    <FiChevronLeft />
                  </button>
                  
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    let pageNum;
                    if (pagination.pages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.page <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.page >= pagination.pages - 2) {
                      pageNum = pagination.pages - 4 + i;
                    } else {
                      pageNum = pagination.page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        className={`page-btn ${pagination.page === pageNum ? 'active' : ''}`}
                        onClick={() => setPagination({...pagination, page: pageNum})}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    className="page-btn"
                    onClick={() => setPagination({...pagination, page: pagination.page + 1})}
                    disabled={pagination.page === pagination.pages}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Detail Pesan */}
        {/* <div className={`modal-overlay ${selectedMessage ? 'active' : ''}`} onClick={() => setSelectedMessage(null)} /> */}
        
        <div className={`modal-container ${selectedMessage ? 'active' : ''}`}>
          {selectedMessage && (
            <>
              <div className="modal-header">
                <h3>Detail Pesan</h3>
                <button className="close-btn" onClick={() => setSelectedMessage(null)}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-content">
                <div className="message-info">
                  <div className="info-row">
                    <div className="info-label">
                      <FaUser /> Pengirim
                    </div>
                    <div className="info-value">
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>{selectedMessage.name}</div>
                      <a 
                        href={`mailto:${selectedMessage.email}`}
                        style={{ 
                          color: '#111827',
                          textDecoration: 'none',
                          fontSize: '13px',
                          display: 'block',
                          marginBottom: '4px'
                        }}
                      >
                        {selectedMessage.email}
                      </a>
                      {selectedMessage.phone && (
                        <div style={{ 
                          color: '#6b7280', 
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <FiPhone style={{ fontSize: '12px' }} /> {selectedMessage.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-label">
                      <FaCalendar /> Tanggal
                    </div>
                    <div className="info-value">
                      {new Date(selectedMessage.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-label">
                      <FaEnvelope /> Status
                    </div>
                    <div className="info-value">
                      {getStatusBadge(selectedMessage.status)}
                    </div>
                  </div>
                </div>

                <div className="message-body">
                  <div className="body-label">
                    <FiMessageSquare /> Pesan
                  </div>
                  <div className="body-content">
                    {selectedMessage.message}
                  </div>
                </div>

                {selectedMessage.adminNotes && (
                  <div className="message-info">
                    <div className="info-row">
                      <div className="info-label">
                        <FaPaperclip /> Catatan
                      </div>
                      <div className="info-value">
                        {selectedMessage.adminNotes}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button 
                  className="action-btn primary"
                  onClick={() => handleReply(selectedMessage.email)}
                >
                  <FaReply /> Balas Email
                </button>
                
                {selectedMessage.status !== 'replied' && (
                  <button 
                    className="action-btn"
                    onClick={() => handleStatusChange(selectedMessage._id, 'replied')}
                  >
                    <FaCheckCircle /> Tandai Dibalas
                  </button>
                )}
                
                {selectedMessage.status !== 'archived' && (
                  <button 
                    className="action-btn"
                    onClick={() => handleStatusChange(selectedMessage._id, 'archived')}
                  >
                    <FaArchive /> Arsipkan
                  </button>
                )}
                
                <button 
                  className="action-btn danger"
                  onClick={() => {
                    handleDelete(selectedMessage._id);
                  }}
                >
                  <FaTrash /> Hapus
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageList;