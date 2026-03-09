import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Folder, AppWindow, ShieldAlert, LogOut, Plus, Sparkles } from 'lucide-react';

function GlobalLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('yourfolio_token');
    navigate('/login');
  };

  return (
    <div className="global-layout">
      {/* Expanded Canvas-style Sidebar Nav */}
      <nav className="global-nav expanded-nav">
        <div className="nav-brand" style={{marginTop: '0.5rem', marginBottom: '1.5rem', cursor: 'pointer', paddingLeft: '1.5rem', width: '100%', display: 'flex'}} onClick={() => navigate('/')}>
          <img src="/logo.png" className="app-logo" style={{height:'36px', width:'auto'}} alt="Your Folio" />
        </div>
        
        <div style={{padding: '0 1.5rem', width: '100%', marginBottom: '2rem'}}>
           <button className="create-big-btn" onClick={() => navigate('/editor')}>
              <Plus size={20} />
              <span>Create design</span>
           </button>
        </div>

        <div className="nav-links expanded-links">
          <NavLink to="/app" end className={({isActive}) => `gnav-btn ${isActive ? 'active' : ''}`}>
            <Home size={20} />
            <span className="nav-text">Home</span>
          </NavLink>
          
          <NavLink to="/app/projects" className={({isActive}) => `gnav-btn ${isActive ? 'active' : ''}`}>
             <Folder size={20} />
             <span className="nav-text">Projects</span>
          </NavLink>
          
          <NavLink to="/app/templates" className={({isActive}) => `gnav-btn ${isActive ? 'active' : ''}`}>
             <AppWindow size={20} />
             <span className="nav-text">Templates</span>
          </NavLink>
          
          <NavLink to="/app/brand" className={({isActive}) => `gnav-btn ${isActive ? 'active' : ''}`}>
             <ShieldAlert size={20} />
             <span className="nav-text">Brand</span>
          </NavLink>

          <NavLink to="/app/assistant" className={({isActive}) => `gnav-btn ${isActive ? 'active' : ''}`}>
            <Sparkles size={20} />
            <span className="nav-text">AI Assistant</span>
          </NavLink>
        </div>
        
        <div className="nav-user profile-dock">
          <button onClick={handleLogout} className="gnav-btn" style={{background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', justifyContent: 'flex-start'}}>
            <LogOut size={20} />
            <span className="nav-text">Logout</span>
          </button>
          <div className="user-pill">
             <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="User" />
             <span className="nav-text">Personal</span>
          </div>
        </div>
      </nav>

      {/* Main Feature Area Content */}
      <div className="global-content">
        <Outlet />
      </div>
    </div>
  );
}

export default GlobalLayout;
