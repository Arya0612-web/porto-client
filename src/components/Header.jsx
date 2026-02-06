import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaProjectDiagram, FaCogs, FaUser, FaEnvelope } from 'react-icons/fa';

const Header = ({ scrolled = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('#home');

  useEffect(() => {
    if (scrolled !== undefined) {
      setIsScrolled(scrolled);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active nav based on scroll position
      const sections = ['home', 'projects', 'services', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveNav(`#${currentSection}`);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (href) => {
    setActiveNav(href);
    closeMenu();
    
    // Smooth scroll to section
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { href: '#home', label: 'Home', icon: <FaHome /> },
    { href: '#services', label: 'Services', icon: <FaCogs /> },
    { href: '#projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { href: '#about', label: 'About', icon: <FaUser /> },
    { href: '#contact', label: 'Contact', icon: <FaEnvelope /> },
  ];

  return (
    <>
      <style jsx>{`
        /* Header Base */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: 80px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: ${isScrolled 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(255, 255, 255, 0.95)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid ${isScrolled 
            ? 'rgba(0, 0, 0, 0.1)' 
            : 'rgba(0, 0, 0, 0.05)'};
          box-shadow: ${isScrolled 
            ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
            : '0 1px 0 rgba(0, 0, 0, 0.03)'};
        }

        .header.scrolled {
          height: 70px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 100%;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }

        /* Logo */
        .logo {
          display: flex;
          align-items: center;
        }

        .logo-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 1.5rem;
          color: #111827;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-link:hover {
          transform: translateY(-1px);
        }

        .logo-dot {
          width: 8px;
          height: 8px;
          background: #111827;
          border-radius: 50%;
          display: inline-block;
        }

        /* Navigation Menu */
        .nav-menu {
          display: flex;
          align-items: center;
        }

        .nav-list {
          display: flex;
          list-style: none;
          gap: 2px;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          text-decoration: none;
          color: #4b4b4c;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .nav-link:hover {
          color: #191a1b;
        }

        .nav-link.active {
          color: #15171a;
          font-weight: 600;
        }

        /* Icon styling */
        .nav-icon {
          font-size: 0.9rem;
          opacity: 0.7;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover .nav-icon {
          opacity: 1;
          transform: translateY(-1px);
        }

        .nav-link.active .nav-icon {
          opacity: 1;
          color: #111214;
        }

        /* Active Indicator - Garis Bawah */
        .nav-indicator {
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #0e0f0f;
          border-radius: 2px;
          transition: width 0.3s ease;
          opacity: 0;
        }

        .nav-link.active .nav-indicator {
          width: 24px;
          opacity: 1;
        }

        

        /* Mobile Toggle Button */
        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #14171d;
          background: rgba(17, 24, 39, 0.08);
        }

        .mobile-toggle:hover {
          background: rgba(13, 13, 14, 0.12);
          transform: scale(1.05);
        }

        /* Mobile Menu */
        @media (max-width: 992px) {
          .mobile-toggle {
            display: flex;
          }
          
          .nav-menu {
            position: fixed;
            top: 80px;
            right: -100%;
            width: 300px;
            height: calc(100vh - 80px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            padding: 40px 24px;
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: -10px 0 50px rgba(0, 0, 0, 0.1);
            border-left: 1px solid rgba(0, 0, 0, 0.08);
          }
          
          .header.scrolled .nav-menu {
            top: 70px;
            height: calc(100vh - 70px);
          }
          
          .nav-menu.active {
            right: 0;
          }
          
          .nav-list {
            flex-direction: column;
            gap: 8px;
            width: 100%;
          }
          
          .nav-link {
            padding: 16px 24px;
            justify-content: flex-start;
            border-radius: 12px;
            font-size: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          }
          
          .nav-link .nav-indicator {
            display: none;
          }
          
          .nav-link.active {
            border-bottom: 2px solid #060708;
            background: rgba(17, 19, 24, 0.03);
          }
          
          .nav-link:hover {
            background: rgba(13, 15, 19, 0.04);
          }
          
          .admin-button {
            margin: 24px 0 0 0;
          }
          
          .admin-link {
            width: 100%;
            justify-content: center;
            padding: 14px 24px;
          }
        }

        /* Mobile Overlay */
        .mobile-overlay {
          display: none;
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(26, 30, 37, 0.5);
          backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 999;
        }
        
        .header.scrolled .mobile-overlay {
          top: 70px;
        }
        
        .mobile-overlay.active {
          display: block;
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 768px) {
          .header {
            height: 70px;
          }
          
          .header.scrolled {
            height: 65px;
          }
          
          .container {
            padding: 0 16px;
          }
          
          .logo-link {
            font-size: 1.3rem;
          }
          
          .nav-menu {
            width: 280px;
            top: 70px;
          }
          
          .header.scrolled .nav-menu {
            top: 65px;
            height: calc(100vh - 65px);
          }
          
          .mobile-overlay {
            top: 70px;
          }
          
          .header.scrolled .mobile-overlay {
            top: 65px;
          }
        }

        @media (max-width: 480px) {
          .nav-menu {
            width: 100%;
          }
          
          .mobile-toggle {
            width: 40px;
            height: 40px;
          }
          
          .logo-link {
            font-size: 1.2rem;
          }
        }

        /* CTA Button (Optional) */
        .cta-button {
          margin-left: 12px;
        }

        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: #13161b;
          color: white;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-link:hover {
          background: #000000;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <Link to="/" className="logo-link" onClick={closeMenu}>
                Portfolio<span className="logo-dot"></span>
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li key={item.href} className="nav-item">
                    <a 
                      href={item.href}
                      className={`nav-link ${activeNav === item.href ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {item.label}
                      <span className="nav-indicator"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Toggle Button */}
            <button 
              className="mobile-toggle" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div 
            className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
            onClick={closeMenu}
          />
        )}
      </header>
    </>
  );
};

export default Header;