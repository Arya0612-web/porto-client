import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import { FiFilter, FiChevronRight, FiTrendingUp, FiCode, FiDatabase, FiGlobe, FiGithub, FiLinkedin, FiTwitter, FiDribbble, FiArrowRight } from 'react-icons/fi';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchProjects();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories = ['all', 'Mobile App', 'UI/UX Design', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const services = [
    { icon: <FiCode />, title: 'Frontend Development', description: 'React, Vue, Next.js dengan UI yang responsif' },
    { icon: <FiDatabase />, title: 'Backend Development', description: 'Node.js, Express, MongoDB, API Development' },
    { icon: <FiGlobe />, title: 'Full Stack Solutions', description: 'Solusi lengkap dari frontend sampai deployment' },
    { icon: <FiTrendingUp />, title: 'Performance Optimization', description: 'Optimasi kecepatan dan pengalaman pengguna' },
  ];

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .home-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #111827;
          background: #ffffff;
          overflow-x: hidden;
          line-height: 1.6;
        }

        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Hero Section - Black & White Minimalist */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #111827;
          color: white;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
        }

        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          padding: 40px 0 120px;
        }

        .hero-badge {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 32px;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .hero-badge:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .hero-title {
          font-size: 56px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 24px;
          color: white;
        }

        .highlight {
          color: #ffffff;
          font-weight: 800;
          position: relative;
        }

        .hero-description {
          font-size: 20px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto 40px;
          font-weight: 300;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: white;
          color: #111827;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          background: #f9fafb;
        }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 16px 32px;
          background: transparent;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }

        .mouse {
          width: 30px;
          height: 50px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          display: flex;
          justify-content: center;
          padding-top: 10px;
        }

        .wheel {
          width: 4px;
          height: 10px;
          background: white;
          border-radius: 2px;
          animation: scroll 2s infinite;
        }

        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }

        /* Services Section */
        .services-section {
          padding: 120px 0;
          background: #fafafa;
        }

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
          font-size: 40px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
        }

        .section-description {
          font-size: 18px;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 300;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 48px;
        }

        .service-card {
          background: white;
          padding: 40px 32px;
          border-radius: 16px;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #111827;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .service-icon-wrapper {
          width: 64px;
          height: 64px;
          background: rgba(0, 0, 0, 0.04);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .service-icon {
          font-size: 28px;
          color: #111827;
        }

        .service-title {
          font-size: 24px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 12px;
        }

        .service-description {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .service-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #111827;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .service-link:hover {
          gap: 12px;
          color: #374151;
        }

        /* Projects Section */
        .projects-section {
          padding: 120px 0;
          background: #ffffff;
        }

        .filter-container {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 48px;
          background: white;
          padding: 20px 24px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .filter-icon {
          font-size: 24px;
          color: #111827;
        }

        .filter-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .filter-tag {
          padding: 10px 24px;
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 20px;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .filter-tag:hover {
          background: rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.12);
        }

        .filter-tag.active {
          background: #111827;
          color: white;
          border-color: #111827;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 32px;
        }

        .project-wrapper {
          transition: all 0.3s ease;
        }

        .project-wrapper:hover {
          transform: translateY(-4px);
        }

        /* Loading State */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px;
          text-align: center;
          grid-column: 1 / -1;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-top-color: #111827;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-state p {
          color: #6b7280;
          font-weight: 500;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 80px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
          grid-column: 1 / -1;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 24px;
          color: #d1d5db;
        }

        .empty-state h3 {
          font-size: 24px;
          color: #111827;
          margin-bottom: 12px;
        }

        .empty-state p {
          color: #6b7280;
          font-size: 16px;
        }

        /* Footer */
        .footer {
          background: #111827;
          color: white;
          padding: 80px 0 0;
          margin-top: 80px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          margin-bottom: 64px;
        }

        .footer-brand {
          max-width: 400px;
        }

        .footer-logo {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 20px;
          color: white;
        }

        .logo-dot {
          color: #ffffff;
        }

        .footer-tagline {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 32px;
          font-size: 18px;
          font-weight: 300;
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .social-link {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
        }

        .footer-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: white;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 12px;
          transition: all 0.3s ease;
          font-size: 15px;
        }

        .footer-link:hover {
          color: white;
          transform: translateX(4px);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 32px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-bottom p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        .footer-legal {
          display: flex;
          gap: 24px;
        }

        .footer-bottom-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .footer-bottom-link:hover {
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-title {
            font-size: 48px;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 36px;
          }
          
          .hero-description {
            font-size: 18px;
          }
          
          .section-title {
            font-size: 32px;
          }
          
          .section-description {
            font-size: 16px;
          }
          
          .hero-cta {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-primary, .cta-secondary {
            width: 100%;
            justify-content: center;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .filter-container {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .footer-links {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          
          .footer-legal {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }
          
          .hero-title {
            font-size: 32px;
          }
          
          .hero-description {
            font-size: 16px;
          }
          
          .section-title {
            font-size: 28px;
          }
          
          .filter-tags {
            justify-content: center;
          }
          
          .filter-tag {
            padding: 8px 16px;
            font-size: 13px;
          }
          
          .service-card {
            padding: 32px 24px;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .footer-content {
            gap: 32px;
          }
        }

        /* Button Reset */
        button {
          font-family: inherit;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
        }

        a {
          text-decoration: none;
          color: inherit;
        }
      `}</style>

      <div id="home" className="home-page">
        <Header scrolled={isScrolled} />
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background"></div>
          
          <div className="container">
            <div className="hero-content">
              <span className="hero-badge">Full Stack Developer</span>
              <h1 className="hero-title">
                Membangun <span className="highlight">Digital Experience</span> yang Menginspirasi
              </h1>
              <p className="hero-description">
                Saya mengkhususkan diri dalam membuat aplikasi web modern dengan teknologi terkini. 
                Setiap proyek adalah perjalanan menciptakan solusi yang elegan dan fungsional.
              </p>
              <div className="hero-cta">
                <button 
                  className="cta-primary"
                  onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                >
                  Lihat Proyek
                  <FiArrowRight style={{ marginLeft: '8px' }} />
                </button>
                <button 
                  className="cta-secondary"
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                >
                  Hubungi Saya
                </button>
              </div>
            </div>
          </div>
          
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Layanan Unggulan</span>
              
              <p className="section-description">
                Solusi lengkap untuk kebutuhan digital Anda, dari konsep hingga implementasi.
              </p>
            </div>
            
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon-wrapper">
                    <div className="service-icon">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <a href="#contact" className="service-link">
                    Pelajari lebih lanjut
                    <FiChevronRight />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Portfolio</span>
          
              <p className="section-description">
                Karya terbaik yang telah saya selesaikan untuk berbagai klien dan kebutuhan.
              </p>
            </div>

            {/* Filter Tags */}
            <div className="filter-container">
              <FiFilter className="filter-icon" />
              <div className="filter-tags">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-tag ${filter === category ? 'active' : ''}`}
                    onClick={() => setFilter(category)}
                  >
                    {category === 'all' ? 'Semua Proyek' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Memuat proyek...</p>
              </div>
            ) : (
              <div className="projects-grid">
                {filteredProjects.map((project, index) => (
                  <div key={project.id} className="project-wrapper">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            )}

            {!loading && filteredProjects.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📁</div>
                <h3>Tidak ada proyek ditemukan</h3>
                <p>Coba filter yang berbeda atau periksa kembali nanti.</p>
              </div>
            )}
          </div>
        </section>

        {/* About & Contact */}
        <AboutSection />
        <ContactSection />

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <h3 className="footer-logo">Portfolio<span className="logo-dot">.</span></h3>
                <p className="footer-tagline">
                  Membangun masa depan digital dengan kode yang indah dan efisien.
                </p>
                <div className="social-links">
                  <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer">
                    <FiGithub /> GitHub
                  </a>
                  <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">
                    <FiLinkedin /> LinkedIn
                  </a>
                  <a href="https://dribbble.com" className="social-link" target="_blank" rel="noopener noreferrer">
                    <FiDribbble /> Dribbble
                  </a>
                  <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
                    <FiTwitter /> Twitter
                  </a>
                </div>
              </div>
              
              <div className="footer-links">
                <div className="footer-column">
                  <h4 className="footer-title">Menu</h4>
                  <a href="#home" className="footer-link">Home</a>
                  <a href="#projects" className="footer-link">Proyek</a>
                  <a href="#about" className="footer-link">Tentang</a>
                  <a href="#contact" className="footer-link">Kontak</a>
                </div>
                
                <div className="footer-column">
                  <h4 className="footer-title">Layanan</h4>
                  <a href="#services" className="footer-link">Web Development</a>
                  <a href="#services" className="footer-link">Mobile Apps</a>
                  <a href="#services" className="footer-link">UI/UX Design</a>
                  <a href="#services" className="footer-link">Consulting</a>
                </div>
                
                <div className="footer-column">
                  <h4 className="footer-title">Kontak</h4>
                  <a href="mailto:hello@example.com" className="footer-link">aryaabdilah67@gmail.com</a>
                  <a href="tel:+6281234567890" className="footer-link">+62 857 2154 3065</a>
                  <span className="footer-link">Banjar, Jawa Barat, Indonesia</span>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
              <div className="footer-legal">
                <a href="#" className="footer-bottom-link">Privacy Policy</a>
                <a href="#" className="footer-bottom-link">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
