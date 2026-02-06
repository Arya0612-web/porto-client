// import React from 'react';
// import { FaProjectDiagram, FaCode, FaUsers, FaAward, FaStar, FaRocket, FaHeart, FaChartLine } from 'react-icons/fa';

// const Stats = () => {
//   const stats = [
//     { 
//       icon: <FaProjectDiagram />, 
//       value: '50+', 
//       label: 'Proyek Selesai',
//       color: '#2563eb'
//     },
//     { 
//       icon: <FaCode />, 
//       value: '100k+', 
//       label: 'Baris Kode',
//       color: '#7c3aed'
//     },
//     { 
//       icon: <FaUsers />, 
//       value: '30+', 
//       label: 'Klien Puas',
//       color: '#f59e0b'
//     },
//     { 
//       icon: <FaAward />, 
//       value: '10+', 
//       label: 'Penghargaan',
//       color: '#10b981'
//     },
//     { 
//       icon: <FaRocket />, 
//       value: '99%', 
//       label: 'Kepuasan Klien',
//       color: '#ef4444'
//     },
//     { 
//       icon: <FaChartLine />, 
//       value: '24/7', 
//       label: 'Support',
//       color: '#8b5cf6'
//     }
//   ];

//   return (
//     <>
//       <style jsx>{`
//         :root {
//           --primary: #2563eb;
//           --primary-dark: #1d4ed8;
//           --secondary: #7c3aed;
//           --accent: #f59e0b;
//           --dark: #1e293b;
//           --light: #f8fafc;
//           --gray: #64748b;
//           --success: #10b981;
          
//           --gradient-primary: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
//           --gradient-dark: linear-gradient(135deg, var(--dark) 0%, #2d3748 100%);
          
//           --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
//           --shadow-md: 0 10px 25px rgba(0, 0, 0, 0.1);
//           --shadow-lg: 0 20px 50px rgba(0, 0, 0, 0.15);
//           --shadow-primary: 0 10px 30px rgba(37, 99, 235, 0.2);
          
//           --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           --radius-lg: 24px;
//           --radius-full: 9999px;
//         }

//         .stats-section {
//           padding: 120px 0;
//           background: var(--gradient-dark);
//           color: white;
//           position: relative;
//           overflow: hidden;
//         }

//         .stats-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: 
//             radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
//             radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.15) 0%, transparent 50%);
//         }

//         .container {
//           width: 100%;
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 24px;
//           position: relative;
//           z-index: 2;
//         }

//         .section-header {
//           text-align: center;
//           margin-bottom: 64px;
//         }

//         .section-subtitle {
//           display: inline-block;
//           padding: 8px 20px;
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(10px);
//           border-radius: var(--radius-full);
//           font-size: 0.875rem;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 2px;
//           margin-bottom: 24px;
//           color: rgba(255, 255, 255, 0.9);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }

//         .section-title {
//           font-size: 2.5rem;
//           font-weight: 800;
//           margin-bottom: 16px;
//           background: linear-gradient(to right, #fff, #e2e8f0);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .section-description {
//           font-size: 1.125rem;
//           color: rgba(255, 255, 255, 0.8);
//           max-width: 600px;
//           margin: 0 auto;
//           line-height: 1.6;
//         }

//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 30px;
//           margin-top: 48px;
//         }

//         .stat-item {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: var(--radius-lg);
//           padding: 40px 30px;
//           text-align: center;
//           transition: var(--transition);
//           position: relative;
//           overflow: hidden;
//         }

//         .stat-item::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 4px;
//           background: var(--gradient-primary);
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .stat-item:hover::before {
//           opacity: 1;
//         }

//         .stat-item:hover {
//           transform: translateY(-8px);
//           background: rgba(255, 255, 255, 0.08);
//           box-shadow: 
//             0 20px 40px rgba(0, 0, 0, 0.2),
//             inset 0 1px 0 rgba(255, 255, 255, 0.1);
//         }

//         .stat-icon {
//           width: 70px;
//           height: 70px;
//           margin: 0 auto 20px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.1);
//           font-size: 28px;
//           transition: var(--transition);
//         }

//         .stat-item:hover .stat-icon {
//           transform: scale(1.1) rotate(5deg);
//           background: rgba(255, 255, 255, 0.15);
//         }

//         .stat-value {
//           font-size: 3rem;
//           font-weight: 800;
//           margin-bottom: 8px;
//           background: linear-gradient(to right, #fff, #e2e8f0);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           line-height: 1;
//         }

//         .stat-value span {
//           font-size: 2rem;
//           font-weight: 600;
//         }

//         .stat-label {
//           font-size: 1.125rem;
//           color: rgba(255, 255, 255, 0.8);
//           font-weight: 500;
//         }

//         /* Animated counter */
//         .counter {
//           display: inline-block;
//         }

//         /* Responsive */
//         @media (max-width: 1024px) {
//           .stats-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
          
//           .section-title {
//             font-size: 2.2rem;
//           }
//         }

//         @media (max-width: 768px) {
//           .stats-section {
//             padding: 80px 0;
//           }
          
//           .stats-grid {
//             grid-template-columns: 1fr;
//             gap: 20px;
//           }
          
//           .section-title {
//             font-size: 2rem;
//           }
          
//           .section-description {
//             font-size: 1rem;
//           }
          
//           .stat-item {
//             padding: 30px 20px;
//           }
          
//           .stat-value {
//             font-size: 2.5rem;
//           }
          
//           .stat-icon {
//             width: 60px;
//             height: 60px;
//             font-size: 24px;
//           }
//         }

//         @media (max-width: 480px) {
//           .container {
//             padding: 0 16px;
//           }
          
//           .section-title {
//             font-size: 1.75rem;
//           }
          
//           .stat-value {
//             font-size: 2.2rem;
//           }
//         }

//         /* Animation for stats */
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         .stat-item:nth-child(1) .stat-icon {
//           color: #34d399;
//         }

//         .stat-item:nth-child(2) .stat-icon {
//           color: #34d399;
//         }

//         .stat-item:nth-child(3) .stat-icon {
//           color: #fbbf24;
//         }

//         .stat-item:nth-child(4) .stat-icon {
//           color: #34d399;
//         }

//         .stat-item:nth-child(5) .stat-icon {
//           color: #f87171;
//         }

//         .stat-item:nth-child(6) .stat-icon {
//           color: #8b5cf6;
//         }

//         /* Optional: Add a subtle pulse animation */
//         @keyframes pulse {
//           0%, 100% {
//             box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
//           }
//           50% {
//             box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
//           }
//         }

//         .stat-item {
//           animation: pulse 3s infinite;
//         }

//         .stat-item:nth-child(1) { animation-delay: 0s; }
//         .stat-item:nth-child(2) { animation-delay: 0.5s; }
//         .stat-item:nth-child(3) { animation-delay: 1s; }
//         .stat-item:nth-child(4) { animation-delay: 1.5s; }
//         .stat-item:nth-child(5) { animation-delay: 2s; }
//         .stat-item:nth-child(6) { animation-delay: 2.5s; }
//       `}</style>

//       <section className="stats-section">
//         <div className="container">
//           <div className="section-header">
//             <span className="section-subtitle">Pencapaian</span>
            
//             <p className="section-description">
//               Bertahun-tahun pengalaman telah menghasilkan pencapaian yang berarti bagi klien dan proyek.
//             </p>
//           </div>
          
//           <div className="stats-grid">
//             {stats.map((stat, index) => (
//               <div key={index} className="stat-item">
//                 <div className="stat-icon" style={{ color: stat.color }}>
//                   {stat.icon}
//                 </div>
//                 <div className="stat-value">
//                   <span className="counter">{stat.value}</span>
//                 </div>
//                 <div className="stat-label">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Stats;