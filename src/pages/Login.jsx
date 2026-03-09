import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';

import { login } from '../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(formData.email, formData.password);
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
          <h2>Welcome back.</h2>
          <p>Pick up where you left off creating your masterpiece.</p>
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
            <h1>Log in</h1>
            <p>Enter your details to access your dashboard.</p>
          </div>

          {error && <div style={{ color: '#f43f5e', marginBottom: '1rem', background: 'rgba(244,63,94,0.1)', padding: '0.75rem', borderRadius: '8px' }}>{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="••••••••" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Log In <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
