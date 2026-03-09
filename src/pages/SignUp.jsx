import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';

import { register } from '../services/api';

function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await register(formData.name, formData.email, formData.password);
      localStorage.setItem('yourfolio_token', token);
      navigate('/app');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand" onClick={() => navigate('/')}>
          <img src="/logo.png" className="app-logo" alt="Your Folio" />
        </div>
        
        <div className="auth-feature">
          <h2>Your work deserves to be seen.</h2>
          <p>Create a stunning portfolio that tells your unique story in a way a resume never could.</p>
          
          <div className="auth-reviews">
            <div className="review-avatars">
              <img src="https://ui-avatars.com/api/?name=Jane+Doe&background=random" alt="User User" />
              <img src="https://ui-avatars.com/api/?name=Alex+Smith&background=random" alt="User User" />
              <img src="https://ui-avatars.com/api/?name=Sam+Jones&background=random" alt="User User" />
            </div>
            <span>Join 10,000+ creatives</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <motion.div 
          className="auth-form-wrapper"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-header">
            <h1>Create your account</h1>
            <p>Start building your portfolio for free today.</p>
          </div>

          {error && <div style={{ color: '#f43f5e', marginBottom: '1rem', background: 'rgba(244,63,94,0.1)', padding: '0.75rem', borderRadius: '8px' }}>{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group-auth">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="input-group-auth">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="input-group-auth">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="Must be at least 8 characters" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Create Account <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SignUp;
