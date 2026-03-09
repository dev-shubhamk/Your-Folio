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

          <div className="oauth-container">
            <button className="oauth-btn" type="button" onClick={() => alert("Google OAuth flow connecting...")}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width="18" />
              Continue with Google
            </button>
            <button className="oauth-btn" type="button" onClick={() => alert("GitHub OAuth flow connecting...")}>
              <svg height="18" viewBox="0 0 16 16" width="18" fill="white"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
              Continue with GitHub
            </button>
            <button className="oauth-btn" type="button" onClick={() => alert("Magic Link sent to email!")}>
              <Mail size={18} color="#94a3b8" />
              Continue with Magic Link
            </button>
          </div>

          <div className="auth-divider">
            <span>Or log in with email</span>
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
