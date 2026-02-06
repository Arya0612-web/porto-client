import React from 'react';
import { FaEdit, FaTrash, FaStar, FaRegStar, FaFolder, FaCalendar, FaGlobe, FaCode } from 'react-icons/fa';

const ProjectList = ({ projects, onEdit, onDelete }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <FaFolder />
        </div>
        <h3>Tidak ada project</h3>
        <p>Belum ada project yang ditambahkan</p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .project-list-container {
          width: 100%;
          overflow-x: auto;
          border-radius: 12px;
          background: white;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .project-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          min-width: 900px;
        }

        .project-table thead {
          background: #fafafa;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .project-table th {
          padding: 18px 20px;
          text-align: left;
          font-weight: 600;
          font-size: 13px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .project-table th:first-child {
          border-radius: 12px 0 0 0;
        }

        .project-table th:last-child {
          border-radius: 0 12px 0 0;
        }

        .project-table tbody tr {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .project-table tbody tr:last-child {
          border-bottom: none;
        }

        .project-table tbody tr:hover {
          background: rgba(0, 0, 0, 0.02);
          transform: translateX(4px);
        }

        .project-table td {
          padding: 20px;
          color: #374151;
          font-size: 14px;
          vertical-align: middle;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Title column styling */
        .title-cell {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .project-image-container {
          position: relative;
          flex-shrink: 0;
        }

        .project-image {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          object-fit: cover;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #fafafa;
          transition: transform 0.2s ease;
        }

        .project-table tbody tr:hover .project-image {
          transform: scale(1.05);
        }

        .image-placeholder {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 12px;
          border: 1px dashed rgba(0, 0, 0, 0.1);
        }

        .title-content {
          flex: 1;
          min-width: 0;
        }

        .project-title {
          font-weight: 600;
          color: #111827;
          margin-bottom: 6px;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .project-title-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .project-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 8px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #9ca3af;
          font-size: 12px;
        }

        /* Category styling */
        .category-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(0, 0, 0, 0.04);
          color: #374151;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        }

        .category-badge:hover {
          background: rgba(0, 0, 0, 0.06);
          transform: translateY(-1px);
        }

        /* Featured styling */
        .featured-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .featured-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid transparent;
        }

        .featured-badge.yes {
          background: rgba(0, 0, 0, 0.08);
          color: #111827;
          border-color: rgba(0, 0, 0, 0.1);
        }

        .featured-badge.no {
          background: rgba(0, 0, 0, 0.02);
          color: #9ca3af;
          border: 1px dashed rgba(0, 0, 0, 0.1);
        }

        /* Status styling */
        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-published {
          background: rgba(0, 0, 0, 0.06);
          color: #111827;
        }

        .status-draft {
          background: rgba(0, 0, 0, 0.03);
          color: #9ca3af;
        }

        /* Actions styling */
        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          font-weight: 500;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
          color: #374151;
        }

        .action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .edit-btn:hover {
          border-color: rgba(0, 0, 0, 0.2);
          background: rgba(0, 0, 0, 0.02);
          color: #111827;
        }

        .delete-btn:hover {
          border-color: rgba(220, 38, 38, 0.2);
          background: rgba(220, 38, 38, 0.04);
          color: #dc2626;
        }

        /* Links styling */
        .project-links {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: rgba(0, 0, 0, 0.03);
          color: #6b7280;
          text-decoration: none;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.2s ease;
        }

        .project-link:hover {
          background: rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
          color: #111827;
        }

        /* Empty state styling */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
          color: #9ca3af;
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
          margin-bottom: 16px;
        }

        .empty-state h3 {
          margin: 0 0 8px;
          color: #111827;
          font-size: 16px;
          font-weight: 500;
        }

        .empty-state p {
          font-size: 14px;
          max-width: 300px;
          line-height: 1.5;
          margin: 0;
        }

        /* Badge for featured projects */
        .featured-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          background: rgba(0, 0, 0, 0.08);
          color: #111827;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Responsive design */
        @media (max-width: 1024px) {
          .project-list-container {
            border-radius: 10px;
          }

          .project-table th,
          .project-table td {
            padding: 16px;
          }

          .project-image {
            width: 50px;
            height: 50px;
          }

          .image-placeholder {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 768px) {
          .project-table {
            min-width: 700px;
          }

          .project-table th:nth-child(3),
          .project-table td:nth-child(3) {
            display: none;
          }

          .project-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .title-cell {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .project-image-container {
            align-self: flex-start;
          }
        }

        @media (max-width: 640px) {
          .project-table th:nth-child(2),
          .project-table td:nth-child(2) {
            display: none;
          }

          .actions-cell {
            flex-direction: column;
            gap: 6px;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }

          .project-links {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .project-table {
            min-width: 500px;
          }

          .project-table th:nth-child(4),
          .project-table td:nth-child(4) {
            display: none;
          }
        }
      `}</style>

      <div className="project-list-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Category</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => {
              // Perbaikan untuk handle error optional chaining
              const imageUrl = project.image_url || null;
              const title = project.title || 'Untitled Project';
              const description = project.description || 'No description available';
              const category = project.category || null;
              const status = project.status || 'draft';
              const featured = project.featured || false;
              const projectUrl = project.project_url || null;
              const githubUrl = project.github_url || null;
              const technologies = project.technologies;
              const createdAt = project.createdAt || project.created_at || null;
              const projectId = project.id || project._id || '';

              // Handle technologies yang bisa berupa string atau array
              let techArray = [];
              if (Array.isArray(technologies)) {
                techArray = technologies;
              } else if (typeof technologies === 'string') {
                // Coba parsing jika ada koma
                techArray = technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
              }

              return (
                <tr key={projectId}>
                  <td>
                    <div className="title-cell">
                      <div className="project-image-container">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={title}
                            className="project-image"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const placeholder = e.target.parentNode.querySelector('.image-placeholder');
                              if (placeholder) {
                                placeholder.style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <div className="image-placeholder" style={{ display: imageUrl ? 'none' : 'flex' }}>
                          <FaFolder size={20} />
                        </div>
                      </div>
                      <div className="title-content">
                        <div className="project-title">
                          <span className="project-title-text">{title}</span>
                          {featured && (
                            <span className="featured-tag">
                              <FaStar size={8} />
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="project-desc">
                          {description.length > 80 
                            ? `${description.substring(0, 80)}...` 
                            : description}
                        </div>
                        
                        <div className="project-meta">
                          {createdAt && (
                            <span className="meta-item">
                              <FaCalendar size={10} />
                              {new Date(createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          )}
                          
                          {techArray.length > 0 && (
                            <span className="meta-item">
                              <FaCode size={10} />
                              {techArray.slice(0, 2).join(', ')}
                              {techArray.length > 2 && '...'}
                            </span>
                          )}
                        </div>
                        
                        <div className="project-links">
                          {projectUrl && (
                            <a 
                              href={projectUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="project-link"
                            >
                              <FaGlobe size={10} />
                              Live Demo
                            </a>
                          )}
                          {githubUrl && (
                            <a 
                              href={githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="project-link"
                            >
                              <FaCode size={10} />
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="category-cell">
                      {category ? (
                        <span className="category-badge">
                          <FaFolder size={12} />
                          {category}
                        </span>
                      ) : (
                        <span style={{ color: '#9ca3af', fontSize: '13px' }}>-</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${status === 'published' ? 'status-published' : 'status-draft'}`}>
                      {status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="featured-cell">
                      <span className={`featured-badge ${featured ? 'yes' : 'no'}`}>
                        {featured ? <FaStar size={12} /> : <FaRegStar size={12} />}
                        {featured ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button 
                        onClick={() => onEdit(project)}
                        className="action-btn edit-btn"
                        title="Edit project"
                      >
                        <FaEdit size={13} />
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this project?')) {
                            onDelete(projectId);
                          }
                        }}
                        className="action-btn delete-btn"
                        title="Delete project"
                      >
                        <FaTrash size={13} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectList;