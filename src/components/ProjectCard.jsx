import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCalendar, FaFolder, FaEye } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [views, setViews] = useState(project.views || 0);
  
  const technologies = project.technologies ? project.technologies.split(',').map(tech => tech.trim()) : [];

  // Base URL untuk backend - sesuaikan dengan environment Anda
  const API_BASE_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:5000' 
    : window.location.origin; // Untuk production

  // Fungsi untuk mendapatkan URL gambar yang benar
  const getImageUrl = () => {
    if (!project.image_url) {
      setImageError(true);
      return null;
    }
    
    console.log('Original image_url:', project.image_url); // Debug
    
    // Jika URL sudah lengkap (http:// atau https://), gunakan langsung
    if (project.image_url.startsWith('http://') || project.image_url.startsWith('https://')) {
      return project.image_url;
    }
    
    // Jika path dimulai dengan /uploads, tambahkan base URL backend
    if (project.image_url.startsWith('/uploads')) {
      return `${API_BASE_URL}${project.image_url}`;
    }
    
    // Jika hanya nama file, tambahkan path uploads
    // Cek apakah mengandung timestamp (format upload server yang sudah diperbaiki)
    if (project.image_url.match(/^\d+_/)) {
      return `${API_BASE_URL}/uploads/${project.image_url}`;
    }
    
    // Untuk backward compatibility
    return `${API_BASE_URL}${project.image_url.startsWith('/') ? '' : '/'}${project.image_url}`;
  };

  const imageUrl = getImageUrl();

  // Handler untuk error loading gambar
  const handleImageError = (e) => {
    console.error('Failed to load image:', imageUrl);
    console.log('Project data:', project);
    console.log('Image element:', e.target);
    setImageError(true);
  };

  // Handler untuk success loading gambar
  const handleImageLoad = () => {
    console.log('Image loaded successfully:', imageUrl);
    setImageLoaded(true);
  };

  const recordView = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${project.id}/view`, {
        method: "POST"
      });

      const data = await res.json();

      if (data.success) {
        setViews(data.views); // update realtime
      }
    } catch (error) {
      console.error("Failed to record view:", error);
    }
  };

  // Cek apakah views ada dan valid
  const displayViews = typeof project.views === 'number' ? project.views : 0;

  const isFeatured = project.featured === 1 || project.featured === true;

  return (
    <>
      <style jsx>{`
        .project-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.08);
          min-height: 420px; /* Mengurangi tinggi minimum */
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(0, 0, 0, 0.12);
        }

        .project-card.featured {
          border: 2px solid #111827;
        }

        /* Featured Badge */
        .featured-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #111827;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Project Image Container - diubah proporsi */
        .project-image {
          position: relative;
          height: 200px; /* Dikurangi dari 240px */
          overflow: hidden;
          background-color: #fafafa;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          filter: brightness(0.95);
          opacity: ${imageLoaded ? 1 : 0};
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(17, 24, 39, 0.9);
          color: white;
          font-weight: 600;
          font-size: 1rem;
        }

        .image-placeholder span {
          font-size: 0.8rem;
          opacity: 0.8;
          font-weight: normal;
          margin-top: 4px;
        }

        /* Project Content - padding dikurangi */
        .project-content {
          padding: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          background: white;
        }

        /* Category Badge */
        .project-category {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(17, 24, 39, 0.08);
          color: #111827;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          margin-bottom: 12px;
          align-self: flex-start;
          border: 1px solid rgba(17, 24, 39, 0.12);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover .project-category {
          transform: translateY(-1px);
          background: rgba(17, 24, 39, 0.12);
        }

        /* Title */
        .project-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 10px 0;
          line-height: 1.4;
          transition: color 0.3s ease;
        }

        .project-card:hover .project-title {
          color: #111827;
        }

        /* Description - dikurangi margin dan font size */
        .project-description {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
          font-size: 0.85rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Technologies */
        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .tech-tag {
          background: rgba(17, 24, 39, 0.08);
          color: #111827;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 500;
          border: 1px solid rgba(17, 24, 39, 0.12);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .tech-tag:hover {
          background: #111827;
          color: white;
          transform: translateY(-1px);
        }

        /* Meta Info - lebih compact */
        .project-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 0.75rem;
        }

        .meta-item svg {
          opacity: 0.7;
          font-size: 0.8rem;
        }

        /* View Project Button - lebih kecil */
        .view-project-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #111827;
          color: white;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 500;
          font-size: 0.8rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          align-self: flex-start;
          margin-top: 12px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .view-project-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          background: #1f2937;
        }

        /* Action Links - diperbaiki untuk overlay */
        .project-actions {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(17, 24, 39, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          padding: 20px;
        }

        .project-card:hover .project-actions {
          opacity: 1;
        }

        .action-links {
          display: flex;
          gap: 12px;
        }

        .action-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: white;
          color: #111827;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 500;
          font-size: 0.8rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .action-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          background: #f9fafb;
        }

        .action-link.github:hover {
          background: #111827;
          color: white;
        }

        .action-link.demo:hover {
          background: #111827;
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .project-card {
            min-height: 380px;
          }
          
          .project-image {
            height: 180px;
          }
          
          .project-title {
            font-size: 1.1rem;
          }
          
          .project-description {
            font-size: 0.82rem;
          }
        }

        @media (max-width: 768px) {
          .project-card {
            min-height: 350px;
          }
          
          .project-image {
            height: 160px;
          }
          
          .project-content {
            padding: 16px;
          }
          
          .project-title {
            font-size: 1rem;
          }
          
          .tech-tag {
            font-size: 0.65rem;
            padding: 3px 8px;
          }
          
          .action-links {
            flex-direction: column;
            width: 100%;
          }
          
          .action-link {
            width: 100%;
            justify-content: center;
            padding: 8px 16px;
          }
        }

        @media (max-width: 480px) {
          .project-card {
            min-height: 320px;
          }
          
          .project-image {
            height: 140px;
          }
          
          .project-description {
            -webkit-line-clamp: 2;
          }
          
          .project-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }

        /* Image loading skeleton */
        .image-skeleton {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #f0f0f0 25%, #e5e7eb 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .project-card.featured {
          border: 2px solid #111827;
        }
      `}</style>

        <div className={`project-card ${isFeatured ? 'featured' : ''}`}>
          {isFeatured && (
            <div className="featured-badge">
              <FaStar size={10} /> Featured
            </div>
          )}

        
        <div className="project-image">
          {!imageLoaded && !imageError && (
            <div className="image-skeleton"></div>
          )}
          
          {!imageError && imageUrl ? (
            <>
              <img 
                src={imageUrl} 
                alt={project.title}
                loading="lazy"
                onError={handleImageError}
                onLoad={handleImageLoad}
                crossOrigin="anonymous"
              />
              <div className="project-actions">
                <div className="action-links">
                  {project.github_url && (
                    <a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer nofollow"
                      className="action-link github"
                      aria-label={`View source code for ${project.title}`}
                    >
                      <FaGithub size={12} /> Code
                    </a>
                  )}
                  {project.project_url && (
                    <a 
                      href={project.project_url} 
                      target="_blank" 
                      rel="noopener noreferrer nofollow"
                      className="action-link demo"
                      aria-label={`View live demo for ${project.title}`}
                    >
                      <FaExternalLinkAlt size={12} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="image-placeholder">
              {project.title ? project.title.substring(0, 2).toUpperCase() : 'PR'}
              <span>No Image</span>
            </div>
          )}
        </div>
        
        <div className="project-content">
          {project.category && (
            <span className="project-category">
              <FaFolder size={10} /> {project.category}
            </span>
          )}
          
          <h3 className="project-title">{project.title}</h3>
          
          <p className="project-description">
            {project.description || "No description available."}
          </p>
          
          {technologies.length > 0 && (
            <div className="project-technologies">
              {technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
              {technologies.length > 3 && (
                <span className="tech-tag">+{technologies.length - 3}</span>
              )}
            </div>
          )}
          
          <div className="project-meta">
            <div className="meta-item">
              <FaCalendar size={12} />
              <span>
                {project.created_at 
                  ? new Date(project.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    })
                  : 'Date N/A'}
              </span>
            </div>
            
            <div className="meta-item">
              <FaEye size={12} />
              <span>{views} views</span>
            </div>
          </div>
          
          {(project.github_url || project.project_url) && (
            <a 
              href={project.project_url || project.github_url} 
              target="_blank" 
              rel="noopener noreferrer nofollow"
              className="view-project-btn"
              onClick={recordView}
            >
              <FaExternalLinkAlt size={12} />
              View Project
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;