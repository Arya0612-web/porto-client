import React, { useState } from 'react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaUser, 
  FaCheckCircle,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaExclamationCircle 
} from 'react-icons/fa';
import { FiSend, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    let isValid = true;

    // Validasi nama
    if (!formData.name.trim()) {
      newErrors.name = 'Nama harus diisi';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter';
      isValid = false;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
      isValid = false;
    }

    // Validasi pesan
    if (!formData.message.trim()) {
      newErrors.message = 'Pesan harus diisi';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Gunakan endpoint yang sesuai
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          // Tambahkan field lain jika diperlukan
          subject: 'Pesan dari Portfolio Website'
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setErrors({ name: '', email: '', message: '' });
        
        // Reset success message
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setSubmitError(data.message || 'Terjadi kesalahan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Koneksi gagal. Periksa koneksi internet Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setSubmitError('');
  };

  const handleFocus = (field) => {
    // Clear error saat fokus
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleBlur = (field) => {
    // Validasi on blur
    if (formData[field]) {
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setErrors(prev => ({
            ...prev,
            email: 'Format email tidak valid'
          }));
        }
      } else if (field === 'name' && formData.name.trim().length < 2) {
        setErrors(prev => ({
          ...prev,
          name: 'Nama minimal 2 karakter'
        }));
      } else if (field === 'message' && formData.message.trim().length < 10) {
        setErrors(prev => ({
          ...prev,
          message: 'Pesan minimal 10 karakter'
        }));
      }
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'aryaabdilah67@gmail.com',
      link: 'mailto:aryaabdilah67@gmail.com'
    },
    {
      icon: <FaPhone />,
      title: 'Telepon/WhatsApp',
      content: '+62 857 2154 3065',
      link: 'https://wa.me/6285721543065'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Lokasi',
      content: 'Banjar, Jawa Barat, Indonesia',
      link: 'https://www.google.com/maps/place/Banjar,+Kec.+Banjar,+Kota+Banjar,+Jawa+Barat/@-7.3723955,108.4950042,12134m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2e6f61fb2660decf:0x401e8f1fc28e140!8m2!3d-7.3706874!4d108.5342487!16zL20vMGRrbXY0?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D'
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/username'
    },
    {
      icon: <FaGithub />,
      name: 'GitHub',
      url: 'https://github.com/username'
    },
    {
      icon: <FaWhatsapp />,
      name: 'WhatsApp',
      url: 'https://wa.me/6285721543065'
    }
  ];

  return (
    <>
      <style jsx>{`
        /* Tambahkan styles untuk error messages */
        .error-message {
          color: #dc2626;
          font-size: 0.875rem;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0;
          animation: fadeIn 0.3s ease forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .form-input.error,
        .form-textarea.error {
          border-color: #dc2626;
          background-color: #fef2f2;
        }

        .form-input.error:focus,
        .form-textarea.error:focus {
          border-color: #b91c1c;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .error-alert {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 16px 20px;
          border-radius: 12px;
          margin-top: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Update form-group untuk error state */
        .form-group.has-error .form-icon {
          color: #dc2626;
        }

        /* Loading state styles */
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .contact-section {
          padding: 120px 0;
          background: #fafafa;
          position: relative;
          overflow: hidden;
        }

        .contact-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 10% 20%, rgba(17, 24, 39, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(17, 24, 39, 0.02) 0%, transparent 50%);
        }

        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .section-subtitle {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(17, 24, 39, 0.1);
          color: #111827;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 24px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .section-description {
          font-size: 1.125rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 300;
        }

        /* Contact Content */
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-top: 48px;
        }

        /* Contact Info */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-card {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: flex-start;
          gap: 24px;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
        }

        .info-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #111827;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .info-card:hover::before {
          opacity: 1;
        }

        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(0, 0, 0, 0.12);
        }

        .info-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #111827;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(17, 24, 39, 0.05);
          border: 1px solid rgba(17, 24, 39, 0.1);
        }

        .info-card:hover .info-icon-wrapper {
          transform: scale(1.1);
          background: rgba(17, 24, 39, 0.1);
        }

        .info-content {
          flex: 1;
        }

        .info-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }

        .info-text {
          color: #6b7280;
          margin-bottom: 12px;
          line-height: 1.6;
        }

        .info-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #111827;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 4px 0;
        }

        .info-link:hover {
          gap: 12px;
          color: #374151;
        }

        /* Social Links */
        .social-links {
          display: flex;
          gap: 16px;
          margin-top: 32px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: white;
          color: #111827;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .social-link:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          background: #111827;
          color: white;
          border-color: #111827;
        }

        /* Contact Form */
        .contact-form {
          background: white;
          padding: 48px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }

        .form-description {
          color: #6b7280;
          line-height: 1.6;
        }

        .form-group {
          position: relative;
          margin-bottom: 24px;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 18px 20px 18px 56px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: white;
          color: #111827;
          position: relative;
          z-index: 1;
        }

        .form-textarea {
          min-height: 150px;
          resize: vertical;
          padding-left: 56px;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #111827;
          box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.1);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #6b7280;
          opacity: 0.8;
        }

        .form-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }

        .form-group:focus-within .form-icon {
          color: #111827;
        }

        .form-textarea + .form-icon {
          top: 28px;
          transform: none;
          left: 24px;
        }

        .form-actions {
          margin-top: 32px;
        }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 36px;
          background: #111827;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          background: #1f2937;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        .submit-btn .btn-icon {
          transition: transform 0.3s ease;
        }

        .submit-btn:hover .btn-icon {
          transform: translateX(4px);
        }

        /* Success Message */
        .success-message {
          background: white;
          color: #111827;
          padding: 20px 24px;
          border-radius: 12px;
          margin-top: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideIn 0.5s ease;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
          color: #111827;
        }

        .success-content h4 {
          margin: 0 0 4px 0;
          font-size: 1.1rem;
          color: #111827;
        }

        .success-content p {
          margin: 0;
          color: #6b7280;
          font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 80px 0;
          }
          
          .contact-form {
            padding: 32px;
          }
          
          .info-card {
            padding: 24px;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .social-links {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }
          
          .contact-form {
            padding: 24px;
          }
          
          .info-card {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
          
          .info-icon-wrapper {
            margin-bottom: 16px;
          }
          
          .section-title {
            font-size: 1.75rem;
          }
          
          .form-title {
            font-size: 1.5rem;
          }
          
          .submit-btn {
            padding: 16px 24px;
          }
          
          .form-input,
          .form-textarea {
            padding: 16px 20px 16px 52px;
          }
          
          .form-textarea + .form-icon {
            left: 20px;
          }
        }

        @media (min-width: 769px) {
          .form-input,
          .form-textarea {
            padding: 18px 24px 18px 56px;
          }
        }
      `}</style>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Hubungi Saya</span>
           
            <p className="section-description">
              Punya proyek menarik? Mari berdiskusi dan wujudkan ide Anda menjadi kenyataan.
            </p>
          </div>

          <div className="contact-content">
            {/* Contact Information */}
            <div className="contact-info">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-card"
                >
                  <div className="info-icon-wrapper">
                    {info.icon}
                  </div>
                  <div className="info-content">
                    <h3 className="info-title">{info.title}</h3>
                    <p className="info-text">{info.content}</p>
                    <span className="info-link">
                      Kirim Pesan
                      <FaPaperPlane />
                    </span>
                  </div>
                </a>
              ))}

              {/* Social Links */}
              <div className="social-section">
                <h3 className="info-title">Temui Saya di</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      {social.icon}
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <div className="form-header">
                <h3 className="form-title">Kirim Pesan</h3>
                <p className="form-description">
                  Isi formulir di bawah ini dan saya akan menghubungi Anda secepatnya.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                  {/* <FiUser className="form-icon" /> */}
                  <input
                    type="text"
                    name="name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Nama Lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <div className="error-message">
                      <FaExclamationCircle />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  {/* <FiMail className="form-icon" /> */}
                  <input
                    type="email"
                    name="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Alamat Email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <div className="error-message">
                      <FaExclamationCircle />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                  {/* <FiMessageSquare className="form-icon" /> */}
                  <textarea
                    name="message"
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Pesan Anda..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <div className="error-message">
                      <FaExclamationCircle />
                      {errors.message}
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <FiSend className="btn-icon" />
                        Kirim Pesan
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Error Message */}
              {submitError && (
                <div className="error-alert">
                  <FaExclamationCircle />
                  <div>
                    <h4 style={{ margin: '0 0 4px 0' }}>Gagal Mengirim</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{submitError}</p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {isSubmitted && (
                <div className="success-message">
                  <FaCheckCircle className="success-icon" />
                  <div className="success-content">
                    <h4>Pesan Terkirim!</h4>
                    <p>Terima kasih telah menghubungi. Saya akan membalas secepatnya.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;