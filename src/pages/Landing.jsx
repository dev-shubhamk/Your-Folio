import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Layers, Zap, PenTool, Users, LayoutTemplate, Clock, Headphones } from 'lucide-react';

function Landing() {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-brand">
          <img src="/logo.png" className="app-logo" alt="Your Folio Powered by Foliomate" />
        </div>
        <div className="nav-actions">
          <Link to="/app" className="nav-link">Features</Link>
          <Link to="/app/subscription" className="nav-link">Pricing</Link>
          <Link to="/login" className="nav-link login">Log in</Link>
          <Link to="/signup" className="nav-btn primary">Get Started Free</Link>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Build your dream portfolio. <br />
          <span className="gradient-text">In minutes, not days.</span>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Join thousands of designers, developers, and creatives using yourfolio 
          to present their work with premium interactive templates, lightning-fast hosting, and the power of AI. Build something extraordinary.
        </motion.p>
        
        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link to="/signup" className="hero-btn primary">
            Start Building <ArrowRight size={18} />
          </Link>
          <Link to="/app" className="hero-btn secondary">
            Try the Editor
          </Link>
        </motion.div>
      </header>

      <section className="features-section">
        <div className="section-header">
          <h2>Everything you need. Nothing you don't.</h2>
          <p>We've stripped away the complexity of building a website so you can focus on showing off your work.</p>
        </div>
        <div className="feature-grid">
          <motion.div className="feature-card" whileHover={{ y: -5 }}>
            <div className="feature-icon"><Layers size={24} /></div>
            <h3>Premium Templates</h3>
            <p>Stand out from the crowd with our handcrafted, highly customizable interactive layouts designed by industry experts.</p>
          </motion.div>

          <motion.div className="feature-card" whileHover={{ y: -5 }}>
            <div className="feature-icon"><Zap size={24} /></div>
            <h3>Framer Motion Ready</h3>
            <p>Delight your visitors with buttery-smooth micro-interactions and scroll animations straight out of the box.</p>
          </motion.div>

          <motion.div className="feature-card" whileHover={{ y: -5 }}>
            <div className="feature-icon"><PenTool size={24} /></div>
            <h3>Foliomate AI Integration</h3>
            <p>Stuck writing a bio? Our integrated AI assistant natively brainstorms and writes compelling copy instantly for you.</p>
          </motion.div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-box">
          <div className="stat-icon"><Users size={32} /></div>
          <h2>10k+</h2>
          <p>Active Users</p>
        </div>
        <div className="stat-box">
          <div className="stat-icon"><LayoutTemplate size={32} /></div>
          <h2>50k+</h2>
          <p>Portfolios Built</p>
        </div>
        <div className="stat-box">
          <div className="stat-icon"><Clock size={32} /></div>
          <h2>99.9%</h2>
          <p>Uptime SLA</p>
        </div>
        <div className="stat-box">
          <div className="stat-icon"><Headphones size={32} /></div>
          <h2>24/7</h2>
          <p>Expert Support</p>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-header">
          <h2>Trusted by creatives worldwide.</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"yourfolio completely changed how I present my design work. I was able to build an agency-level website in under 20 minutes."</p>
            <div className="author">
              <img src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random" alt="Sarah" />
              <div>
                <strong>Sarah Jenkins</strong>
                <span>Senior Product Designer</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"The Foliomate AI wrote my entire 'About Me' page perfectly. It read my mind and saved me hours of struggling with copy."</p>
            <div className="author">
              <img src="https://ui-avatars.com/api/?name=David+Chen&background=random" alt="David" />
              <div>
                <strong>David Chen</strong>
                <span>Frontend Developer</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"I rely on the 'Split' template for my photography portfolio. The dark mode combined with the smooth animations makes everything look incredibly premium."</p>
            <div className="author">
              <img src="https://ui-avatars.com/api/?name=Elena+Rodriguez&background=random" alt="Elena" />
              <div>
                <strong>Elena Rodriguez</strong>
                <span>Creative Director</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="photo-gallery-section">
        <div className="section-header">
          <h2>Stunning visual designs.</h2>
          <p>We provide the canvas, you provide the masterpiece. Built for creatives who care about details.</p>
        </div>
        <div className="gallery-grid">
          <motion.div className="gallery-item" whileHover={{ scale: 1.03 }}>
             <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Creative Workspace" />
          </motion.div>
          <motion.div className="gallery-item" whileHover={{ scale: 1.03 }}>
             {/* Swapped broken charts image for a high reliability web design image */}
             <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Digital Design" />
          </motion.div>
          <motion.div className="gallery-item" whileHover={{ scale: 1.03 }}>
             <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" alt="Coding Web App" />
          </motion.div>
        </div>
      </section>

      <section className="video-showcase-section">
        <div className="section-header">
          <h2>Experience it in motion.</h2>
          <p>Watch exactly how our premium components animate beautifully natively within the browser engine.</p>
        </div>
        <div className="video-container">
            {/* Extremely high fidelity WebP recording perfectly showcasing the Foliomate builder interface */}
            <img src="/demo.webp" alt="Foliomate Builder Platform Demo" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </section>

      <section className="bottom-cta">
        <h2>Ready to upgrade your web presence?</h2>
        <p>Join the community and start building your free portfolio today.</p>
        <Link to="/signup" className="hero-btn primary" style={{marginTop: '2rem'}}>
          Create Your Free Account <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 yourfolio Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
