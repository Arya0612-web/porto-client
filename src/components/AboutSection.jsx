import React from 'react';
import { 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaPalette, 
  FaRocket, 
  FaLightbulb,
  FaGraduationCap,
  FaBriefcase,
  FaAward,
  FaUserCircle 
} from 'react-icons/fa';
import { FiTrendingUp, FiCode as FiCodeIcon, FiGlobe, FiUsers } from 'react-icons/fi';

const AboutSection = () => {
  const skills = [
    { name: 'React.js', level: 95, icon: <FaCode /> },
    { name: 'Node.js', level: 90, icon: <FaServer /> },
    { name: 'TypeScript', level: 88, icon: <FiCodeIcon /> },
    { name: 'Next.js', level: 85, icon: <FiGlobe /> },
    { name: 'MongoDB', level: 80, icon: <FaDatabase /> },
    { name: 'PostgreSQL', level: 75, icon: <FaDatabase /> },
    { name: 'UI/UX Design', level: 70, icon: <FaPalette /> },
    { name: 'DevOps', level: 65, icon: <FaRocket /> },
  ];

  const experiences = [
    { years: '5+', label: 'Tahun Pengalaman', icon: <FaBriefcase /> },
    { projects: '50+', label: 'Proyek Selesai', icon: <FiTrendingUp /> },
    { clients: '30+', label: 'Klien Puas', icon: <FiUsers /> },
    { awards: '10+', label: 'Penghargaan', icon: <FaAward /> },
  ];

  const services = [
    {
      icon: <FaCode />,
      title: 'Frontend Development',
      description: 'Membangun aplikasi web modern dengan React, Vue, dan framework modern lainnya'
    },
    {
      icon: <FaServer />,
      title: 'Backend Development',
      description: 'Mengembangkan API yang scalable dengan Node.js, Express, dan microservices'
    },
    {
      icon: <FaDatabase />,
      title: 'Database Design',
      description: 'Mendesain dan mengoptimasi database untuk performa dan skalabilitas'
    }
  ];

  return (
    <>
      <style jsx>{`
        .about-section {
          padding: 120px 0;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .about-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 90% 10%, rgba(0, 0, 0, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 10% 90%, rgba(0, 0, 0, 0.02) 0%, transparent 50%);
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
          margin-bottom: 80px;
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
          font-size: 3rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .section-description {
          font-size: 1.25rem;
          color: #6b7280;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 300;
        }

        /* About Content */
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* About Text */
        .about-text {
          position: relative;
        }

        .intro-text {
          font-size: 1.125rem;
          color: #111827;
          line-height: 1.8;
          margin-bottom: 40px;
          position: relative;
          padding-left: 24px;
        }

        .intro-text::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #111827;
          border-radius: 2px;
        }

        .highlight-text {
          color: #111827;
          font-weight: 700;
          background: rgba(17, 24, 39, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
        }

        /* Experience Stats */
        .experience-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .stat-item {
          background: #fafafa;
          padding: 24px;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          background: white;
          border-color: rgba(0, 0, 0, 0.08);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(17, 24, 39, 0.05);
          color: #111827;
          border-radius: 50%;
          font-size: 24px;
          transition: all 0.3s ease;
        }

        .stat-item:hover .stat-icon {
          transform: scale(1.1);
          background: rgba(17, 24, 39, 0.1);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 8px;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }

        /* Skills Section */
        .skills-section {
          margin-top: 48px;
        }

        .skills-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .skills-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .skills-title svg {
          color: #111827;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .skill-item {
          background: white;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .skill-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.1);
        }

        .skill-item::before {
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

        .skill-item:hover::before {
          transform: scaleX(1);
        }

        .skill-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .skill-name {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          color: #111827;
        }

        .skill-icon {
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(17, 24, 39, 0.05);
          color: #111827;
        }

        .skill-percentage {
          font-weight: 700;
          color: #111827;
          font-size: 1.1rem;
        }

        .skill-bar {
          height: 8px;
          background: rgba(17, 24, 39, 0.08);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .skill-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 4px;
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          background: #111827;
        }

        /* About Image */
        .about-image {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .about-image:hover .image-wrapper {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
        }

        .image-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(17, 24, 39, 0.05);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .about-image:hover .image-wrapper::before {
          opacity: 0.2;
        }

        .image-wrapper img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }

        .about-image:hover .image-wrapper img {
          transform: scale(1.05);
        }

        .image-decoration {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 16px;
          background: rgba(17, 24, 39, 0.03);
          z-index: -1;
          animation: float 6s ease-in-out infinite;
        }

        .image-decoration:nth-child(1) {
          top: -40px;
          right: -40px;
          animation-delay: 0s;
        }

        .image-decoration:nth-child(2) {
          bottom: -40px;
          left: -40px;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        /* Services Preview */
        .services-preview {
          margin-top: 60px;
          padding-top: 60px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .services-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 32px;
          text-align: center;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .service-preview-item {
          text-align: center;
          padding: 32px 24px;
          background: #fafafa;
          border-radius: 16px;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .service-preview-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          background: white;
          border-color: rgba(0, 0, 0, 0.08);
        }

        .service-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(17, 24, 39, 0.05);
          color: #111827;
          border-radius: 50%;
          font-size: 28px;
          transition: all 0.3s ease;
        }

        .service-preview-item:hover .service-icon {
          transform: scale(1.1);
          background: rgba(17, 24, 39, 0.1);
        }

        .service-preview-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }

        .service-preview-description {
          color: #6b7280;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* Call to Action */
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: #111827;
          color: white;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          margin-top: 40px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          background: #1f2937;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          
          .section-title {
            font-size: 2.5rem;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 80px 0;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .experience-stats {
            grid-template-columns: 1fr;
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .image-wrapper {
            max-width: 400px;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }
          
          .section-title {
            font-size: 1.75rem;
          }
          
          .section-description {
            font-size: 1rem;
          }
          
          .stat-item {
            padding: 20px;
          }
          
          .skill-item {
            padding: 16px;
          }
          
          .service-preview-item {
            padding: 24px 20px;
          }
          
          .cta-button {
            width: 100%;
            justify-content: center;
          }
        }

        /* Animation for skill bars */
        .skill-progress {
          animation: fillBar 1.5s ease-out forwards;
        }

        @keyframes fillBar {
          from {
            width: 0;
          }
        }
      `}</style>

      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Tentang Saya</span>
      
            <p className="section-description">
              Seorang Full Stack Developer yang passionate tentang teknologi dan inovasi digital.
            </p>  
          </div>

          <div className="about-content">
            {/* About Text Section */}
            <div className="about-text">
              <p className="intro-text">
                Halo! Saya seorang <span className="highlight-text">Full Stack Developer</span> dengan pengalaman lebih dari 5 tahun dalam membangun aplikasi web modern yang scalable dan performant. Saya memiliki passion untuk menciptakan solusi digital yang tidak hanya fungsional tetapi juga memberikan pengalaman pengguna yang luar biasa.
              </p>

              <p className="intro-text">
                Saya ahli dalam berbagai teknologi web termasuk <span className="highlight-text">React.js</span>, <span className="highlight-text">Node.js</span>, dan <span className="highlight-text">TypeScript</span>. Saya percaya bahwa kode yang baik adalah kode yang mudah dipahami, dikembangkan, dan di-maintain.
              </p>

              {/* Experience Stats */}
              <div className="experience-stats">
                {experiences.map((exp, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-icon">
                      {exp.icon}
                    </div>
                    <div className="stat-value">{exp.years || exp.projects || exp.clients || exp.awards}</div>
                    <div className="stat-label">{exp.label}</div>
                  </div>
                ))}
              </div>

              {/* Skills Section */}
              <div className="skills-section">
                <div className="skills-header">
                  <h3 className="skills-title">
                    <FaCode /> Keahlian Teknis
                  </h3>
                </div>
                
                <div className="skills-grid">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <div className="skill-name">
                          <div className="skill-icon">
                            {skill.icon}
                          </div>
                          {skill.name}
                        </div>
                        <div className="skill-percentage">{skill.level}%</div>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress"
                          style={{
                            width: `${skill.level}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <button 
                className="cta-button"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                <FaGraduationCap />
                Mari Bekerja Sama
              </button>
            </div>

            {/* About Image Section */}
            <div className="about-image">
              <div className="image-decoration"></div>
              <div className="image-decoration"></div>
              <div className="image-wrapper">
                <img 
                  src="/profile-placeholder.jpg" 
                  alt="Profile"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="600" viewBox="0 0 500 600"><rect width="500" height="600" fill="%23fafafa"/><circle cx="250" cy="200" r="80" fill="%23e5e7eb"/><rect x="150" y="320" width="200" height="40" rx="20" fill="%23e5e7eb"/><rect x="180" y="380" width="140" height="30" rx="15" fill="%23e5e7eb"/></svg>';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Services Preview */}
          <div className="services-preview">
            <h3 className="services-title">Apa yang Saya Lakukan</h3>
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-preview-item">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h4 className="service-preview-title">{service.title}</h4>
                  <p className="service-preview-description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;