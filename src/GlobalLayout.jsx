import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Sparkles, CreditCard, LogOut } from 'lucide-react';

function GlobalLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('yourfolio_token');
    navigate('/login');
  };

  return (
    <div className="global-layout">
      {/* Global Sidebar Nav */}
      <nav className="global-nav">
        <div className="nav-brand" style={{marginTop: '1rem', marginBottom: '2rem', cursor: 'pointer'}} onClick={() => navigate('/')}>
          <img src="/logo.png" className="app-logo" alt="Your Folio" />
        </div>
        
        <div className="nav-links">
          <NavLink to="/app" end className={({isActive}) => `gnav-btn ${isActive ? 'active' : ''}`} title="Editor">
            <LayoutDashboard size={22} />
            <span className="tooltip">Editor</span>
          </NavLink>
          
          <NavLink to="/app/assistant" className={({isActive}) => `gnav-btn ${isActive ? 'active' : ''}`} title="AI Assistant">
            <Sparkles size={22} />
            <span className="tooltip">AI Assistant</span>
          </NavLink>
          
          <NavLink to="/app/subscription" className={({isActive}) => `gnav-btn ${isActive ? 'active' : ''}`} title="Billing">
            <CreditCard size={22} />
            <span className="tooltip">Billing</span>
          </NavLink>
        </div>
        
        <div className="nav-user" style={{marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
          <button onClick={handleLogout} className="gnav-btn" style={{background: 'transparent', border: 'none', cursor: 'pointer'}}>
            <LogOut size={20} />
            <span className="tooltip">Logout</span>
          </button>
          <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="User" />
        </div>
      </nav>

      {/* Main Feature Area Content (Outlet handles Editor/Assistant/Subscription) */}
      <div className="global-content">
        <Outlet />
      </div>
    </div>
  );
}

export default GlobalLayout;
