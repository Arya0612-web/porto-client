import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload, FaLink, FaGithub, FaStar, FaImage, FaSpinner, FaTimes, FaCheck } from 'react-icons/fa';

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    image_url: '',
    project_url: '',
    github_url: '',
    category: '',
    featured: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologies: project.technologies || '',
        image_url: project.image_url || '',
        project_url: project.project_url || '',
        github_url: project.github_url || '',
        category: project.category || '',
        featured: project.featured === 1 ? true : false
      });
      
      if (project.image_url) {
        setImagePreview(project.image_url);
      }
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.technologies.trim()) newErrors.technologies = 'Technologies are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleImageUpload = async () => {
  //   if (!imageFile) return null;

  //   setUploading(true);
  //   try {
  //     const token = localStorage.getItem('token');
  //     const formData = new FormData();
  //     formData.append('image', imageFile);

  //     const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });

  //     return response.data.path;
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     setErrors(prev => ({ ...prev, image: 'Failed to upload image' }));
  //     return null;
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("technologies", formData.technologies);
      form.append("project_url", formData.project_url);
      form.append("github_url", formData.github_url);
      form.append("category", formData.category);
      form.append("featured", formData.featured ? 1 : 0);


      if (imageFile) {
        form.append("image", imageFile);
      }

      await axios.post(`${API_BASE_URL}/api/projects`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Redirect setelah upload selesai
      onSubmit();

    } catch (err) {
      console.log("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <style jsx>{`
        .form-container {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }

        .form-header {
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .form-title span {
          color: #64748b;
          font-weight: 400;
          font-size: 1rem;
          margin-left: 8px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          color: #334155;
          margin-bottom: 8px;
        }

        .required {
          color: #dc2626;
          margin-left: 2px;
        }

        .form-input {
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.95rem;
          color: #334155;
          transition: all 0.2s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        .form-input.error {
          border-color: #dc2626;
        }

        .form-input.error:focus {
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .form-textarea {
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.95rem;
          color: #334155;
          resize: vertical;
          min-height: 120px;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-textarea.error {
          border-color: #dc2626;
        }

        .error-message {
          color: #dc2626;
          font-size: 0.85rem;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Image Upload Section */
        .image-upload-container {
          grid-column: 1 / -1;
        }

        .image-upload-area {
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          padding: 32px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          background: #f8fafc;
        }

        .image-upload-area:hover {
          border-color: #2563eb;
          background: #f0f9ff;
        }

        .image-upload-area.dragover {
          border-color: #2563eb;
          background: #dbeafe;
        }

        .upload-icon {
          color: #64748b;
          margin-bottom: 12px;
        }

        .upload-text {
          color: #475569;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .upload-subtext {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .image-input {
          display: none;
        }

        .image-preview {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .preview-image {
          width: 200px;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          margin-bottom: 12px;
        }

        .remove-image-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #fee2e2;
          color: #dc2626;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .remove-image-btn:hover {
          background: #fecaca;
        }

        .current-image-info {
          margin-top: 12px;
          padding: 12px;
          background: #f1f5f9;
          border-radius: 8px;
          font-size: 0.9rem;
          color: #475569;
        }

        /* Checkbox Styling */
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .checkbox-group:hover {
          border-color: #2563eb;
          background: #f0f9ff;
        }

        .checkbox-group.checked {
          border-color: #f59e0b;
          background: #fef3c7;
        }

        .checkbox-input {
          display: none;
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid #cbd5e1;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .checkbox-group.checked .checkbox-custom {
          background: #f59e0b;
          border-color: #f59e0b;
        }

        .checkbox-label {
          flex: 1;
          font-weight: 500;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .checkbox-icon {
          color: #f59e0b;
        }

        /* Form Actions */
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding-top: 32px;
          border-top: 1px solid #e2e8f0;
          margin-top: 16px;
        }

        .form-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 120px;
          justify-content: center;
        }

        .form-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-btn {
          background: #2563eb;
          color: white;
        }

        .submit-btn:hover:not(:disabled) {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }

        .cancel-btn {
          background: #f1f5f9;
          color: #64748b;
        }

        .cancel-btn:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Submit Error */
        .submit-error {
          grid-column: 1 / -1;
          padding: 16px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          color: #dc2626;
          font-size: 0.95rem;
          text-align: center;
          margin-bottom: 24px;
        }

        /* Drag and Drop */
        .drag-drop-hint {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-top: 8px;
        }
      `}</style>

      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">
            {project ? 'Edit Project' : 'Add New Project'}
            {project && <span>Editing: {project.title}</span>}
          </h2>
        </div>

        {errors.submit && (
          <div className="submit-error">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Title */}
            <div className="form-group">
              <label className="form-label">
                Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="Enter project title"
                required
              />
              {errors.title && (
                <div className="error-message">
                  <FaTimes size={12} />
                  {errors.title}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">
                <FaStar /> Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
                placeholder="Web Development, Mobile App, etc."
              />
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label className="form-label">
                Description <span className="required">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                rows="4"
                placeholder="Describe your project..."
                required
              />
              {errors.description && (
                <div className="error-message">
                  <FaTimes size={12} />
                  {errors.description}
                </div>
              )}
            </div>

            {/* Technologies */}
            <div className="form-group">
              <label className="form-label">
                Technologies <span className="required">*</span>
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className={`form-input ${errors.technologies ? 'error' : ''}`}
                placeholder="React, Node.js, MySQL"
                required
              />
              {errors.technologies && (
                <div className="error-message">
                  <FaTimes size={12} />
                  {errors.technologies}
                </div>
              )}
              <small style={{ marginTop: '6px', color: '#64748b' }}>
                Separate with commas
              </small>
            </div>

            {/* Project URL */}
            <div className="form-group">
              <label className="form-label">
                <FaLink /> Project URL
              </label>
              <input
                type="url"
                name="project_url"
                value={formData.project_url}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com"
              />
            </div>

            {/* GitHub URL */}
            <div className="form-group">
              <label className="form-label">
                <FaGithub /> GitHub URL
              </label>
              <input
                type="url"
                name="github_url"
                value={formData.github_url}
                onChange={handleChange}
                className="form-input"
                placeholder="https://github.com/username/project"
              />
            </div>

            {/* Image Upload */}
            <div className="form-group full-width image-upload-container">
              <label className="form-label">
                <FaImage /> Project Image
              </label>
              
              <div 
                className={`image-upload-area ${errors.image ? 'error' : ''}`}
                onClick={() => document.getElementById('image-upload').click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('dragover');
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('dragover');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('dragover');
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const event = { target: { files: [file] } };
                    handleImageChange(event);
                  }
                }}
              >
                <FaUpload size={32} className="upload-icon" />
                <div className="upload-text">
                  {imagePreview ? 'Change Image' : 'Upload Image'}
                </div>
                <div className="upload-subtext">
                  Click to browse or drag and drop
                </div>
                <div className="drag-drop-hint">
                  Supports JPG, PNG, GIF (Max 5MB)
                </div>
                
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                />
              </div>

              {errors.image && (
                <div className="error-message">
                  <FaTimes size={12} />
                  {errors.image}
                </div>
              )}

              {imagePreview && (
                <div className="image-preview">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="preview-image" 
                  />
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className="remove-image-btn"
                  >
                    <FaTimes /> Remove Image
                  </button>
                </div>
              )}

              {formData.image_url && !imageFile && !imagePreview && (
                <div className="current-image-info">
                  Current image: {formData.image_url}
                </div>
              )}
            </div>

            {/* Featured Checkbox */}
            <div className="form-group full-width">
              <div className={`checkbox-group ${formData.featured ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="checkbox-input"
                  id="featured-checkbox"
                />
                <label 
                  htmlFor="featured-checkbox" 
                  className="checkbox-label"
                >
                  <FaStar className="checkbox-icon" />
                  Featured Project
                </label>
                <div className="checkbox-custom">
                  {formData.featured && <FaCheck size={12} color="white" />}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel}
              className="form-btn cancel-btn"
              disabled={loading || uploading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading || uploading}
              className="form-btn submit-btn"
            >
              {loading || uploading ? (
                <>
                  <FaSpinner className="loading-spinner" />
                  {uploading ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                project ? 'Update Project' : 'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectForm;
