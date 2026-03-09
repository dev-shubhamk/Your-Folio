import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

import { register, oauthLogin } from '../services/api';

function SignUp() {
  const [step, setStep] = useState('auth'); // 'auth' | 'oauth_creds' | 'otp'
  const [oauthProvider, setOauthProvider] = useState('');
  const [oauthEmail, setOauthEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [pendingUser, setPendingUser] = useState(null); // stores either standard form or oauth data
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleStandardSubmit = (e) => {
    e.preventDefault();
    setPendingUser({ type: 'standard', ...formData });
    setStep('otp');
    setError(null);
  };

  const handleOAuthClick = (provider) => {
    setOauthProvider(provider);
    setStep('oauth_creds');
    setError(null);
  };

  const handleOAuthSubmit = (e) => {
    e.preventDefault();
    setPendingUser({ type: 'oauth', provider: oauthProvider, email: oauthEmail });
    setStep('otp');
    setError(null);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (otpCode.length < 6) {
      setError("Please enter a valid 6-digit OTP code.");
      return;
    }
    
    try {
      if (pendingUser.type === 'standard') {
        const { token } = await register(pendingUser.name, pendingUser.email, pendingUser.password);
        localStorage.setItem('yourfolio_token', token);
      } else {
        const { token } = await oauthLogin(pendingUser.provider, pendingUser.email);
        localStorage.setItem('yourfolio_token', token);
      }
      navigate('/app');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
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
        <AnimatePresence mode="wait">
          {step === 'auth' && (
            <motion.div 
              key="auth"
              className="auth-form-wrapper"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-header">
                <h1>Create your account</h1>
                <p>Start building your portfolio for free today.</p>
              </div>

              <div className="oauth-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', width: '100%' }}>
                <button className="oauth-btn" type="button" onClick={() => handleOAuthClick("Google")}>
                  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Sign up with Google
                </button>
                <button className="oauth-btn" type="button" onClick={() => handleOAuthClick("GitHub")}>
                  <svg height="18" viewBox="0 0 16 16" width="18" fill="white"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                  Sign up with GitHub
                </button>
                <button className="oauth-btn" type="button" onClick={() => handleOAuthClick("Magic Link")}>
                  <Mail size={18} color="#94a3b8" />
                  Sign up with Email Link
                </button>
              </div>

              <div className="auth-divider">
                <span>Or sign up manually</span>
              </div>

              {error && <div style={{ color: '#f43f5e', marginBottom: '1rem', background: 'rgba(244,63,94,0.1)', padding: '0.75rem', borderRadius: '8px' }}>{error}</div>}

              <form onSubmit={handleStandardSubmit} className="auth-form">
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
          )}

          {step === 'oauth_creds' && (
            <motion.div 
              key="oauth_creds"
              className="auth-form-wrapper"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-header" style={{textAlign:'center', marginBottom: '2rem'}}>
                <div style={{display:'flex', justifyContent:'center', marginBottom:'1rem'}}>
                  {oauthProvider === 'Google' && (
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  )}
                  {oauthProvider === 'GitHub' && (
                    <svg height="40" viewBox="0 0 16 16" width="40" fill="white"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                  )}
                  {oauthProvider === 'Magic Link' && <Mail size={40} color="var(--accent-primary)" />}
                </div>
                <h2>Sign in with {oauthProvider}</h2>
                <p style={{fontSize:'0.9rem', color:'var(--text-muted)', marginTop:'0.5rem'}}>Please provide your {oauthProvider} account email to connect to Your-Folio.</p>
              </div>

              <form onSubmit={handleOAuthSubmit} className="auth-form">
                <div className="input-group-auth">
                  <label>Provider Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      placeholder={`your.${oauthProvider.toLowerCase().replace(' ', '')}@example.com`}
                      required
                      value={oauthEmail}
                      onChange={(e) => setOauthEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="auth-submit-btn" style={{marginTop:'1.5rem'}}>
                  Continue <ArrowRight size={18} />
                </button>
                <div style={{textAlign:'center', marginTop:'1.5rem'}}>
                   <span style={{color: 'var(--text-muted)', fontSize:'0.9rem', cursor:'pointer'}} onClick={() => setStep('auth')}>← Back</span>
                </div>
              </form>
            </motion.div>
          )}

          {step === 'otp' && (
            <motion.div 
              key="otp"
              className="auth-form-wrapper"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-header" style={{textAlign:'center', marginBottom: '2rem'}}>
                <div style={{display:'inline-flex', padding:'1rem', background:'rgba(244,63,94,0.1)', borderRadius:'50%', marginBottom:'1rem'}}>
                   <ShieldCheck size={32} color="#f43f5e" />
                </div>
                <h2>Check your inbox</h2>
                <p style={{fontSize:'0.95rem', color:'var(--text-muted)', marginTop:'0.5rem'}}>
                  To verify your identity, we've sent a mandatory 6-digit OTP code to <strong style={{color:'white'}}>{pendingUser?.email}</strong>.
                </p>
              </div>

              {error && <div style={{ color: '#f43f5e', marginBottom: '1rem', background: 'rgba(244,63,94,0.1)', padding: '0.75rem', borderRadius: '8px' }}>{error}</div>}

              <form onSubmit={handleOTPSubmit} className="auth-form">
                <div className="input-group-auth" style={{alignItems:'center'}}>
                  <label style={{textAlign:'center', width:'100%', marginBottom:'1rem'}}>Enter 6-Digit Code</label>
                  <input 
                    type="text" 
                    placeholder="• • • • • •" 
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    style={{fontSize:'2rem', letterSpacing:'0.5em', textAlign:'center', padding:'1rem', width:'100%', borderRadius:'12px', background:'var(--bg-panel)', border:'2px solid var(--border-subtle)', color:'white'}}
                  />
                </div>
                
                <button type="submit" className="auth-submit-btn" style={{marginTop:'2rem'}}>
                  Verify & Create Account <Sparkles size={18} />
                </button>
                <div style={{textAlign:'center', marginTop:'1.5rem'}}>
                   <span style={{color: 'var(--text-muted)', fontSize:'0.9rem', cursor:'pointer'}} onClick={() => setStep('auth')}>← Cancel and try different email</span>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SignUp;
