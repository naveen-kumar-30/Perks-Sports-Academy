"use client";

import React, { useState, useEffect } from "react";

// --- 1. LOCAL DATA WITH PROFESSIONAL UX METADATA ---
const sportsData = [
  { id: "swim", name: "Swimming Academy", img: "/images/swimming-390x250.jpg", tag: "Endurance & Form", desc: "Semi-Olympic aquatic center engineered for elite endurance and technique." },
  { id: "tennis", name: "Tennis", img: "/images/tennis.jpg", tag: "Agility & Pace", desc: "Pro-grade synthetic courts built for championship pace and precision." },
  { id: "basket", name: "Basketball", img: "/images/basketball.jpg", tag: "Team Dynamics", desc: "Premium indoor hardwood floors for absolute court dominance." },
  { id: "badmin", name: "Badminton", img: "/images/badminton.jpg", tag: "Reflexes & Speed", desc: "BWF-approved synthetic mats with optimal anti-glare lighting." },
  { id: "tkd", name: "Taekwondo", img: "/images/taekwondo.jpg", tag: "Power & Discipline", desc: "A dedicated dojo focusing on discipline, high-impact power, and agility." },
  { id: "karate", name: "Karate", img: "/images/karate-345x220.jpg", tag: "Focus & Defense", desc: "Master the ancient art of striking, kata, and elite self-defense." },
  { id: "tt", name: "Table Tennis", img: "/images/table-tennis.jpg", tag: "Extreme Coordination", desc: "Develop lightning-fast reflexes on tournament-grade ITTF tables." },
  { id: "silam", name: "Silambam", img: "/images/silambam-390x250.jpg", tag: "Heritage Martial Art", desc: "Preserving the dynamic, weapon-based martial art of Tamil Nadu." },
  { id: "kalari", name: "Kalari", img: "/images/kalari-390x250.jpg", tag: "Ancient Combat", desc: "Train in the oldest, most foundational martial art form in the world." },
  { id: "adi", name: "Adimurai", img: "/images/adimurai-390x250.jpg", tag: "Unarmed Mastery", desc: "Lethal, unarmed combat techniques passed down through generations." },
  { id: "skate", name: "Skating", img: "/images/skating.jpg", tag: "Balance & Core", desc: "Smooth, specialized rinks engineered for speed, balance, and safety." }
];

// --- 2. PROFESSIONAL SVG ICONS LIBRARY (NO EMOJIS) ---
const Icons = {
  MapPin: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Shield: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Medal: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  Target: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Zap: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Trophy: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  ChevronDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  CheckCircle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Facebook: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  Twitter: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>,
  Instagram: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  LinkedIn: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
};

export default function PerksAcademyInteractive() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuHover, setMegaMenuHover] = useState(sportsData[0]);
  const [showAll, setShowAll] = useState(false);
  const [activePathway, setActivePathway] = useState('foundation');

  const visibleSports = showAll ? sportsData : sportsData.slice(0, 6);

  useEffect(() => {
    document.body.classList.add("site-loaded");
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when a link is clicked
  const handleMobileNavClick = () => {
    if (window.innerWidth <= 1024) {
      setMobileMenuOpen(false);
    }
  };

  const handleToggleSports = () => {
    setShowAll(!showAll);
    if (showAll) {
      document.getElementById('programs').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="interactive-wrapper">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* --- TOP PROFESSIONAL BAR --- */}
      <div className="top-bar-pro">
        <div className="container top-bar-flex">
          <div className="top-bar-info">
            <span className="info-item"><Icons.Phone /> +91 81481 90834</span>
            <span className="info-item"><Icons.Clock /> Facility Timings: 6:00 AM - 8:00 PM</span>
            <span className="info-item"><Icons.Mail /> info@perkssportsacademy.com</span>
          </div>
          <div className="top-bar-socials">
            <a href="#" aria-label="Facebook"><Icons.Facebook /></a>
            <a href="#" aria-label="Twitter"><Icons.Twitter /></a>
            <a href="#" aria-label="Instagram"><Icons.Instagram /></a>
            <a href="#" aria-label="LinkedIn"><Icons.LinkedIn /></a>
          </div>
        </div>
      </div>

      {/* --- FLOATING NAVBAR --- */}
      <nav className={`nav-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-box">
          <a href="#" className="nav-logo" onClick={handleMobileNavClick}>
            <img src="/images/logo-2.png" alt="Perks Academy" />
          </a>

          <div className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <a href="#home" className="nav-item" onClick={handleMobileNavClick}>Home</a>
            
            <div className="dropdown-wrap">
              <span className="nav-item">Overview <Icons.ChevronDown /></span>
              <div className="dropdown-simple">
                <a href="#about" onClick={handleMobileNavClick}>About Us</a>
                <a href="#" onClick={handleMobileNavClick}>Founder Message</a>
                <a href="#" onClick={handleMobileNavClick}>Trainers</a>
                <a href="#" onClick={handleMobileNavClick}>Infrastructure</a>
              </div>
            </div>

            <div className="dropdown-wrap">
              <span className="nav-item">Academy <Icons.ChevronDown /></span>
              <div className="mega-panel">
                <div className="mega-layout">
                  <div className="mega-list">
                    <h4>Our Programs</h4>
                    <div className="mega-grid">
                      {sportsData.map((sport) => (
                        <a 
                          key={sport.id} href={`#${sport.id}`}
                          onMouseEnter={() => setMegaMenuHover(sport)}
                          className="mega-link"
                          onClick={handleMobileNavClick}
                        >
                          {sport.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="mega-preview">
                    <img src={megaMenuHover.img} alt={megaMenuHover.name} key={megaMenuHover.id} className="preview-animate" />
                    <div className="preview-content">
                      <span className="preview-tag">{megaMenuHover.tag}</span>
                      <h3>{megaMenuHover.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <a href="#register" className="nav-item" onClick={handleMobileNavClick}>Registration</a>
            <a href="#contact" className="nav-item" onClick={handleMobileNavClick}>Contact Us</a>
            
            {/* Mobile Only CTA inside menu */}
            <div className="mobile-only-cta" style={{ marginTop: '20px', width: '100%' }}>
               <button className="btn-primary" style={{ width: '100%' }}>Get In Touch</button>
            </div>
          </div>

          <div className="nav-end">
            <button className="btn-primary desktop-only">Get In Touch <Icons.ArrowRight /></button>
            <button className={`menu-toggle mobile-only ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="hero-module">
        <div className="hero-background" style={{backgroundImage: `url('/images/Slide02.jpg')`}}></div>
        <div className="hero-shade"></div>
        <div className="container hero-content">
          <div className="hero-text text-center mx-auto">
            <span className="tagline">The Standard of Excellence</span>
            <h1>Your Journey to Sporting <br/><span className="text-highlight">Excellence Starts Here.</span></h1>
            <p>Coimbatore's Best Sports Academy. Professional coaching, world-class facilities, and a legacy of building champions.</p>
            <div className="action-row justify-center">
              <a href="#programs" className="btn-primary btn-large">Explore Programs</a>
              <a href="#pathway" className="btn-secondary btn-large">Our Pathway</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST BAR --- */}
      <div className="trust-bar">
        <div className="container trust-flex">
          <div className="trust-item">
            <Icons.Shield /> <span>Safe & Professional Environment</span>
          </div>
          <div className="trust-item desktop-only">
            <Icons.Medal /> <span>BWF & Olympic Standard Infrastructure</span>
          </div>
          <div className="trust-item">
            <Icons.Phone /> <span>Admissions: +91 81481 90834</span>
          </div>
        </div>
      </div>

      {/* --- INTERACTIVE ATHLETE PATHWAY --- */}
      <section id="pathway" className="pathway-section">
        <div className="container">
          <div className="section-title text-center">
            <h2>A Program for <span className="text-highlight">Every Stage</span></h2>
            <p>We tailor our coaching methodologies to your specific skill level, goals, and athletic journey.</p>
          </div>
          
          <div className="pathway-interactive">
            <div className="pathway-tabs">
              <button className={`tab-btn ${activePathway === 'foundation' ? 'active' : ''}`} onClick={() => setActivePathway('foundation')}>
                <Icons.Target /> Foundation
              </button>
              <button className={`tab-btn ${activePathway === 'development' ? 'active' : ''}`} onClick={() => setActivePathway('development')}>
                <Icons.Zap /> Performance
              </button>
              <button className={`tab-btn ${activePathway === 'elite' ? 'active' : ''}`} onClick={() => setActivePathway('elite')}>
                <Icons.Trophy /> Elite & Pro
              </button>
            </div>
            
            <div className="pathway-content">
              {activePathway === 'foundation' && (
                <div className="path-panel animate-fade">
                  <h3>Fundamentals & Mechanics</h3>
                  <p>Designed for beginners of all backgrounds. Our foundation programs focus on building essential motor skills, core balance, sport-specific mechanics, and confidence in a 100% safe environment.</p>
                </div>
              )}
              {activePathway === 'development' && (
                <div className="path-panel animate-fade">
                  <h3>Technique, Conditioning & Strategy</h3>
                  <p>For athletes ready to elevate their game. We introduce advanced structured coaching, rigorous physical conditioning, strategic gameplay, and the discipline required to compete.</p>
                </div>
              )}
              {activePathway === 'elite' && (
                <div className="path-panel animate-fade">
                  <h3>High Performance & Competition</h3>
                  <p>For athletes targeting state, national, or professional levels. Gain access to pro-grade infrastructure, advanced biomechanical correction, match-simulation, and psychological conditioning.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- APP-LIKE INTERACTIVE SPORTS GRID --- */}
      <section id="programs" className="programs-grid-section">
        <div className="container">
          <div className="section-title text-center">
            <h2>Our <span className="text-highlight">Programs</span></h2>
            <p>11 specialized academies. World-class infrastructure. Which path will you choose?</p>
          </div>

          <div className="interactive-grid">
            {visibleSports.map((sport) => (
              <div className="sport-bento-card" key={sport.id} id={sport.id}>
                <img src={sport.img} alt={sport.name} className="bento-bg" loading="lazy" />
                
                <div className="bento-front">
                  <span className="bento-tag">{sport.tag}</span>
                  <h3>{sport.name}</h3>
                </div>
                
                <div className="bento-reveal">
                  <h3>{sport.name}</h3>
                  <p>{sport.desc}</p>
                  <button className="btn-action-small">View Program <Icons.ArrowRight /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{marginTop: 'clamp(30px, 5vw, 50px)'}}>
            <button className="btn-secondary" onClick={handleToggleSports}>
              {showAll ? "View Less Programs" : "Discover All Programs"}
            </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="about-module">
        <div className="container">
          <div className="about-layout">
            <div className="about-images">
              <img src="/images/skating.jpg" alt="Athletic Training" className="img-primary shadow-heavy" />
              <div className="experience-box">
                <h2>30+</h2>
                <span>Years Setting<br/>The Standard</span>
              </div>
            </div>
            
            <div className="about-text">
              <h2>Building Character <br className="desktop-only" />Through <span className="text-highlight">Sports.</span></h2>
              <p>Since 1993, Perks Sports Academy has been more than just a training facility. We are a community dedicated to holistic athletic development for all ages.</p>
              
              <div className="feature-blocks">
                <div className="f-block">
                  <div className="f-icon"><Icons.Shield /></div>
                  <div>
                    <h4>Uncompromising Safety</h4>
                    <p>Hygienic environments, secure premises, and professional staff dedicated to injury prevention.</p>
                  </div>
                </div>
                <div className="f-block">
                  <div className="f-icon"><Icons.Medal /></div>
                  <div>
                    <h4>Elite Infrastructure</h4>
                    <p>BWF mats, semi-Olympic pools, and synthetic courts designed to maximize your potential.</p>
                  </div>
                </div>
              </div>
              
              <button className="btn-primary" style={{marginTop: 'clamp(20px, 4vw, 30px)'}}>Join the Perks Family</button>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <div className="container footer-layout">
          
          <div className="footer-brand">
            <img src="/images/logo-2.png" alt="Perks Academy" className="footer-logo-img" />
            <p>Coimbatore's most trusted destination for athletic excellence. Professional coaching and world-class facilities since 1993.</p>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-link-list">
              <li><a href="#about">About Us</a></li>
              <li><a href="#programs">Facility Tour</a></li>
              <li><a href="#">Coaching Staff</a></li>
              <li><a href="#register">Registration</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col programs-footer-col">
            <h4>Our Programs</h4>
            <ul className="footer-programs-grid">
              {sportsData.map(sport => (
                <li key={sport.id}><a href={`#${sport.id}`}>{sport.name}</a></li>
              ))}
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Contact Details</h4>
            <div className="contact-info-stack">
              <div className="contact-detail">
                <span className="icon-wrap"><Icons.MapPin /></span> 
                <span><strong>Perks Campus</strong><br/>Uppilipalayam, Coimbatore - 641015</span>
              </div>
              <div className="contact-detail">
                <span className="icon-wrap"><Icons.Phone /></span> 
                <strong>+91 81481 90834</strong>
              </div>
              <div className="contact-detail">
                <span className="icon-wrap"><Icons.Mail /></span> 
                <strong style={{wordBreak: 'break-all'}}>info@perkssportsacademy.com</strong>
              </div>
            </div>
          </div>

        </div>
        <div className="footer-base">
          <div className="container base-flex">
            <p>© 2026 Perks Sports Academy. All Rights Reserved.</p>
            <p>Designed by NetVantage Systems Private Limited</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- STRICTLY PROFESSIONAL CSS WITH UNIVERSAL SCALING ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

  :root {
    --brand-dark: #0B1221;
    --brand-navy: #152238;
    --brand-blue: #0f4c81;
    --brand-orange: #f39c12;
    --brand-orange-hover: #d68910;
    
    --bg-white: #ffffff;
    --bg-slate: #f8fafc;
    
    --text-main: #334155;
    --text-light: #94a3b8;
    
    --border-color: #e2e8f0;
    
    --radius-md: clamp(8px, 2vw, 12px);
    --radius-lg: clamp(12px, 3vw, 20px);
    
    --shadow-soft: 0 10px 40px -10px rgba(15,23,42,0.06);
    --shadow-heavy: 0 20px 40px -10px rgba(15,23,42,0.15);
    
    --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.1);
    --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* --- FLUID BASE SETUP --- */
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Outfit', sans-serif; }
  html { scroll-behavior: smooth; font-size: 16px; overflow-x: hidden; }
  body { background: var(--bg-white); color: var(--text-main); line-height: 1.6; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
  a { text-decoration: none; color: inherit; transition: all 0.3s; }
  img { max-width: 100%; height: auto; display: block; object-fit: cover; }
  button { cursor: pointer; border: none; outline: none; background: none; font-family: inherit; }

  /* Fluid Container logic: 90% width on mobile, max 1280px on massive screens */
  .container { width: 92%; max-width: 1280px; margin: 0 auto; position: relative; }
  
  .text-center { text-align: center; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .justify-center { justify-content: center; }
  .text-highlight { color: var(--brand-orange); }
  
  /* Utility Classes for Display */
  .desktop-only { display: flex; } 
  .mobile-only { display: none; }
  .mobile-only-cta { display: none; }

  /* --- BUTTONS --- */
  .btn-primary { 
    background: var(--brand-orange); color: white; 
    padding: clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px); 
    font-size: clamp(14px, 1.5vw, 15px); font-weight: 700; 
    border-radius: 100px; transition: all 0.3s var(--ease-smooth); 
    display: inline-flex; align-items: center; justify-content: center; gap: 8px; 
  }
  .btn-primary:hover { background: var(--brand-orange-hover); transform: translateY(-3px); box-shadow: 0 10px 25px rgba(243, 156, 18, 0.3); }
  
  .btn-secondary { 
    background: white; color: var(--brand-dark); 
    padding: clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px); 
    font-size: clamp(14px, 1.5vw, 15px); font-weight: 700; 
    border-radius: 100px; transition: all 0.3s var(--ease-smooth); 
    display: inline-flex; align-items: center; justify-content: center; 
    border: 2px solid var(--border-color); 
  }
  .btn-secondary:hover { border-color: var(--brand-dark); background: var(--brand-dark); color: white; transform: translateY(-3px); }
  
  .btn-large { padding: clamp(12px, 2.5vw, 16px) clamp(24px, 5vw, 40px); font-size: clamp(15px, 2vw, 16px); }

  /* --- TOP PROFESSIONAL BAR --- */
  .top-bar-pro { background: var(--brand-blue); color: white; padding: 10px 0; font-size: clamp(11px, 1.5vw, 13px); font-weight: 500; }
  .top-bar-flex { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;}
  .top-bar-info { display: flex; gap: clamp(10px, 3vw, 20px); align-items: center; flex-wrap: wrap; justify-content: center;}
  .info-item { display: flex; align-items: center; gap: 6px; white-space: nowrap;}
  .info-item svg { color: var(--brand-orange); }
  .top-bar-socials { display: flex; gap: 12px; }
  .top-bar-socials a { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: var(--brand-orange); color: white; border-radius: 50%; transition: 0.3s; }
  .top-bar-socials a:hover { background: white; color: var(--brand-orange); transform: translateY(-2px);}

  /* --- NAVBAR --- */
  .nav-header { 
    background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(16px); 
    position: sticky; top: 0; z-index: 1000; transition: all 0.3s var(--ease-smooth); 
    border-bottom: 1px solid var(--border-color); 
  }
  .nav-header.scrolled { box-shadow: var(--shadow-soft); background: rgba(255,255,255,1); }
  .nav-box { display: flex; justify-content: space-between; align-items: center; height: clamp(65px, 8vw, 85px); }
  .nav-logo img { height: clamp(40px, 6vw, 55px); }

  .nav-links { display: flex; align-items: center; gap: clamp(15px, 3vw, 30px); height: 100%; }
  .nav-item { font-size: clamp(14px, 1.5vw, 15px); font-weight: 600; color: var(--brand-dark); display: flex; align-items: center; gap: 6px; cursor: pointer; height: 100%; }
  .nav-item:hover { color: var(--brand-orange); }

  /* Dropdowns */
  .dropdown-wrap { position: relative; height: 100%; display: flex; align-items: center; }
  .dropdown-simple { 
    position: absolute; top: 100%; left: 0; background: white; min-width: 220px; 
    box-shadow: var(--shadow-heavy); border-radius: var(--radius-md); border: 1px solid var(--border-color); 
    padding: 10px; opacity: 0; visibility: hidden; transform: translateY(15px); transition: all 0.3s; 
  }
  .dropdown-wrap:hover .dropdown-simple { opacity: 1; visibility: visible; transform: translateY(0); }
  .dropdown-simple a { display: block; padding: 12px 16px; font-size: 14px; font-weight: 500; border-radius: 8px;}
  .dropdown-simple a:hover { background: var(--bg-slate); color: var(--brand-orange); }

  /* Mega Menu (Desktop Only Logic applied later) */
  .mega-panel { 
    position: absolute; top: 100%; left: -200px; width: min(800px, 90vw); background: white; 
    box-shadow: var(--shadow-heavy); border-radius: var(--radius-lg); border: 1px solid var(--border-color); 
    padding: clamp(15px, 3vw, 30px); opacity: 0; visibility: hidden; transform: translateY(15px); transition: all 0.3s; pointer-events: none; 
  }
  .dropdown-wrap:hover .mega-panel { opacity: 1; visibility: visible; transform: translateY(0); pointer-events: auto; }
  .mega-layout { display: flex; gap: clamp(15px, 3vw, 30px); }
  .mega-list { flex: 1.5; }
  .mega-list h4 { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--text-light); margin-bottom: 20px;}
  .mega-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; }
  .mega-link { padding: 10px 15px; font-size: 14px; font-weight: 600; border-radius: 8px; color: var(--brand-navy); }
  .mega-link:hover { background: #fff7ed; color: var(--brand-orange); }
  
  .mega-preview { flex: 1; border-radius: 16px; overflow: hidden; position: relative; background: var(--brand-navy); display: flex;}
  .preview-animate { width: 100%; height: 280px; object-fit: cover; opacity: 0.8; animation: fadeZoom 0.4s ease; }
  @keyframes fadeZoom { from { opacity: 0; transform: scale(1.05); } to { opacity: 0.8; transform: scale(1); } }
  .preview-content { position: absolute; bottom: 0; left: 0; padding: 25px; background: linear-gradient(to top, rgba(15,23,42,0.95), transparent); width: 100%; color: white;}
  .preview-tag { font-size: 11px; font-weight: 700; background: var(--brand-orange); padding: 4px 10px; border-radius: 100px; display: inline-block; margin-bottom: 8px;}
  .preview-content h3 { font-size: clamp(18px, 2vw, 22px); font-weight: 800; }

  /* --- HERO --- */
  .hero-module { position: relative; height: clamp(500px, 90vh, 800px); display: flex; align-items: center; overflow: hidden; }
  .hero-background { position: absolute; inset: 0; background-position: center; background-size: cover; transform: scale(1.02); }
  .hero-shade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0.3) 100%); }
  .hero-content { position: relative; z-index: 10; color: white; width: 100%; }
  .hero-text { max-width: 800px; animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
  
  .tagline { font-size: clamp(12px, 1.5vw, 14px); font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: var(--brand-orange); margin-bottom: clamp(10px, 2vw, 20px); display: block; }
  .hero-text h1 { font-size: clamp(2.2rem, 6vw, 5rem); font-weight: 900; line-height: 1.1; margin-bottom: clamp(15px, 3vw, 25px); }
  .hero-text p { font-size: clamp(1rem, 2vw, 1.2rem); color: #e2e8f0; margin-bottom: clamp(25px, 5vw, 40px); }
  .action-row { display: flex; gap: clamp(10px, 2vw, 15px); flex-wrap: wrap; }

  /* --- TRUST BAR --- */
  .trust-bar { background: var(--brand-dark); color: #cbd5e1; padding: clamp(10px, 2vw, 15px) 0; font-size: clamp(12px, 1.5vw, 14px); }
  .trust-flex { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
  .trust-item { display: flex; align-items: center; gap: 10px; justify-content: center; flex: 1; min-width: 250px;}
  .trust-item svg { color: var(--brand-orange); flex-shrink: 0;}

  /* --- SECTION TITLES --- */
  .section-title { margin-bottom: clamp(30px, 6vw, 60px); max-width: 700px; margin-inline: auto; padding: 0 15px;}
  .section-title h2 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; color: var(--brand-dark); line-height: 1.2; margin-bottom: clamp(10px, 2vw, 15px); letter-spacing: -1px;}
  .section-title p { font-size: clamp(1rem, 1.5vw, 1.15rem); color: var(--text-main); }

  /* --- PATHWAY --- */
  .pathway-section { padding: clamp(50px, 8vw, 100px) 0; background: var(--bg-white); }
  .pathway-interactive { max-width: 900px; margin: 0 auto; background: var(--bg-slate); border-radius: var(--radius-lg); padding: clamp(5px, 1vw, 10px); border: 1px solid var(--border-color); }
  .pathway-tabs { display: flex; gap: 10px; background: white; padding: 10px; border-radius: var(--radius-md); box-shadow: var(--shadow-soft); flex-wrap: wrap;}
  .tab-btn { flex: 1; min-width: 150px; padding: clamp(12px, 2vw, 16px) 10px; font-size: clamp(13px, 1.5vw, 15px); font-weight: 700; color: var(--text-light); border-radius: 12px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;}
  .tab-btn.active { background: var(--brand-navy); color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
  .pathway-content { padding: clamp(20px, 4vw, 40px) clamp(15px, 3vw, 30px); text-align: center; }
  .path-panel h3 { font-size: clamp(20px, 3vw, 24px); font-weight: 800; color: var(--brand-dark); margin-bottom: 15px;}
  .path-panel p { font-size: clamp(15px, 2vw, 17px); color: var(--text-main); max-width: 700px; margin: 0 auto; line-height: 1.6;}
  .animate-fade { animation: fadeIn 0.5s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* --- BENTO GRID --- */
  .programs-grid-section { padding: clamp(50px, 8vw, 100px) 0; background: var(--bg-slate); border-top: 1px solid var(--border-color);}
  /* This is the magic grid scaling: min 300px per card, fits as many as possible */
  .interactive-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: clamp(15px, 3vw, 25px); }
  
  .sport-bento-card { position: relative; height: clamp(240px, 30vw, 280px); border-radius: var(--radius-lg); overflow: hidden; background: var(--brand-dark); cursor: pointer; box-shadow: var(--shadow-soft); }
  .bento-bg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.6; transition: 0.6s var(--ease-spring); }
  .bento-front { position: absolute; inset: 0; padding: clamp(15px, 3vw, 30px); display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to top, rgba(15,23,42,0.9), transparent); transition: 0.4s; }
  .bento-tag { align-self: flex-start; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); color: white; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 100px; margin-bottom: 15px; }
  .bento-front h3 { color: white; font-size: clamp(20px, 3vw, 26px); font-weight: 800; }
  
  .bento-reveal { position: absolute; inset: 0; background: rgba(255, 255, 255, 0.95); padding: clamp(15px, 3vw, 30px); display: flex; flex-direction: column; justify-content: center; transform: translateY(100%); transition: 0.5s var(--ease-spring); }
  .bento-reveal h3 { font-size: clamp(18px, 2.5vw, 22px); font-weight: 800; color: var(--brand-dark); margin-bottom: 10px; }
  .bento-reveal p { font-size: clamp(13px, 1.5vw, 15px); color: var(--text-main); margin-bottom: 20px; line-height: 1.5; }
  .btn-action-small { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: var(--brand-orange); font-size: 15px; }
  
  .sport-bento-card:hover .bento-bg { transform: scale(1.1); opacity: 1; }
  .sport-bento-card:hover .bento-front { opacity: 0; }
  .sport-bento-card:hover .bento-reveal { transform: translateY(0); }

  /* --- ABOUT --- */
  .about-module { padding: clamp(60px, 10vw, 120px) 0; }
  .about-layout { display: flex; align-items: center; gap: clamp(40px, 8vw, 80px); flex-wrap: wrap;}
  
  .about-images { flex: 1; min-width: min(100%, 400px); position: relative; }
  .img-primary { border-radius: var(--radius-lg); width: 90%; }
  .shadow-heavy { box-shadow: var(--shadow-heavy); }
  .experience-box { 
    position: absolute; bottom: clamp(-15px, -3vw, -30px); right: 0; 
    background: var(--brand-navy); color: white; 
    padding: clamp(15px, 3vw, 30px); border-radius: var(--radius-md); 
    border-top: 4px solid var(--brand-orange); text-align: center; 
  }
  .experience-box h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; line-height: 1; color: var(--brand-orange); }
  .experience-box span { font-size: clamp(10px, 1.5vw, 14px); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

  .about-text { flex: 1; min-width: min(100%, 400px); }
  .about-text h2 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; color: var(--brand-dark); line-height: 1.1; margin-bottom: 20px; }
  .about-text > p { font-size: clamp(1rem, 1.5vw, 1.15rem); margin-bottom: 40px; }
  
  .feature-blocks { display: flex; flex-direction: column; gap: 25px; }
  .f-block { display: flex; gap: 20px; align-items: flex-start; }
  .f-icon { width: clamp(40px, 5vw, 50px); height: clamp(40px, 5vw, 50px); background: #fff7ed; color: var(--brand-orange); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .f-block h4 { font-size: clamp(16px, 2vw, 18px); font-weight: 800; color: var(--brand-dark); margin-bottom: 5px; }
  .f-block p { font-size: clamp(14px, 1.5vw, 15px); line-height: 1.5; }

  /* --- FOOTER --- */
  .site-footer { background: var(--brand-dark); color: #cbd5e1; padding-top: clamp(50px, 8vw, 80px); }
  /* Universal Grid for Footer */
  .footer-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: clamp(30px, 5vw, 40px); padding-bottom: clamp(40px, 6vw, 60px); }
  
  .footer-logo-img { height: clamp(45px, 6vw, 55px); background: white; padding: 8px; border-radius: 8px; margin-bottom: 25px; }
  .footer-col h4 { color: white; font-size: clamp(16px, 2vw, 18px); font-weight: 700; margin-bottom: 25px; }
  .footer-link-list { list-style: none; }
  .footer-link-list li { margin-bottom: 12px; }
  .footer-col a { font-size: clamp(13px, 1.5vw, 14px); color: #94a3b8; transition: 0.3s; }
  .footer-col a:hover { color: var(--brand-orange); padding-left: 5px; }

  .footer-programs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; list-style: none; }
  
  .contact-info-stack { display: flex; flex-direction: column; gap: 20px; }
  .contact-detail { font-size: clamp(13px, 1.5vw, 14px); display: flex; gap: 10px; line-height: 1.6; align-items: flex-start;}
  .icon-wrap { color: var(--brand-orange); flex-shrink: 0; margin-top: 3px; }

  .footer-base { background: #080f1e; padding: 25px 0; border-top: 1px solid rgba(255,255,255,0.05); font-size: clamp(12px, 1.5vw, 13px); color: #64748b; }
  .base-flex { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;}


  /* =========================================
     UNIVERSAL DEVICE ADAPTATION (MEDIA QUERIES)
     ========================================= */

  /* 1. Large Tablets to Small Laptops (Max 1024px) */
  @media (max-width: 1024px) {
    .desktop-only { display: none !important; }
    .mobile-only { display: flex !important; }
    
    .top-bar-pro { display: none; } /* Hide top bar on mobile/tablet to save space */
    
    /* Mobile Menu Logic */
    .nav-links { display: none; }
    .nav-links.mobile-active { 
      display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100vh; 
      background: white; flex-direction: column; padding: 85px 5% 40px; 
      gap: 15px; z-index: -1; overflow-y: auto; align-items: flex-start;
    }
    .mobile-only-cta { display: block; }

    .nav-item { width: 100%; justify-content: space-between; font-size: 18px; padding: 10px 0; border-bottom: 1px solid var(--border-color);}
    
    /* Convert Dropdowns to Accordions for Mobile */
    .dropdown-wrap { width: 100%; flex-direction: column; align-items: flex-start; }
    .dropdown-simple, .mega-panel { 
      position: static; opacity: 1; visibility: visible; transform: none; 
      width: 100%; box-shadow: none; border: none; padding: 10px 0 10px 15px; 
      display: none; background: transparent; pointer-events: auto;
    }
    /* Add basic tap-to-open CSS logic for mobile menu */
    .dropdown-wrap:active .dropdown-simple, 
    .dropdown-wrap:active .mega-panel,
    .dropdown-wrap:focus-within .dropdown-simple, 
    .dropdown-wrap:focus-within .mega-panel { display: block; }
    
    .mega-preview { display: none; } /* Hide heavy images in mobile menu */
    .mega-layout { flex-direction: column; }
    .mega-grid { grid-template-columns: 1fr; }
    
    .img-primary { width: 100%; }
    .experience-box { right: 20px; bottom: -20px; padding: 20px; }
  }

  /* 2. Mobile Phones (Max 600px) */
  @media (max-width: 600px) {
    /* Make buttons full width on small phones */
    .action-row { flex-direction: column; width: 100%; }
    .btn-large { width: 100%; }
    
    /* Fix pathway tabs to stack */
    .pathway-tabs { flex-direction: column; }
    
    /* Ensure Footer items stack perfectly */
    .footer-programs-grid { grid-template-columns: 1fr; }
    .base-flex { flex-direction: column; text-align: center; }
  }

  /* 3. Tiny/Foldable Phones (Max 360px) */
  @media (max-width: 360px) {
    .hero-text h1 { font-size: 2rem; }
    .bento-front h3 { font-size: 18px; }
  }

  /* Hamburger Menu Animation CSS */
  .menu-toggle { flex-direction: column; justify-content: center; align-items: flex-end; gap: 6px; width: 40px; height: 40px; z-index: 1001;}
  .menu-toggle span { display: block; width: 28px; height: 3px; background: var(--brand-dark); transition: 0.3s; border-radius: 2px;}
  .menu-toggle.open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
  .menu-toggle.open span:nth-child(2) { opacity: 0; }
  .menu-toggle.open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
`;