import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Phone, Settings2, Sparkles, Layout, Palette, Type, CheckCircle, Save, Image as ImageIcon, Grid, CircleSlash, Box, Dribbble, Github, Twitter, Linkedin, Square, Circle, Search, Layers, Hexagon, Triangle } from 'lucide-react';
import { fetchPortfolio, savePortfolio } from '../services/api';

function Editor() {
  const [activeTab, setActiveTab] = useState('templates');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  const [portfolio, setPortfolio] = useState({
    name: 'John Doe',
    role: 'Product Designer & Developer',
    bio: 'I build beautiful, user-centric experiences that blend design with function.',
    contactEmail: 'hi@example.com',
    themeColor: 'emerald',
    font: 'font-playfair',
    template: 'classic',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    cover: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85',
    backgroundTexture: 'dots',
    borderRadius: 'lg',
    showSocials: 1
  });

  const [device, setDevice] = useState('desktop');

  useEffect(() => {
    // Load portfolio config from Backend
    const loadConfig = async () => {
      try {
        const data = await fetchPortfolio();
        setPortfolio(prev => ({
          ...prev,
          ...data,
          showSocials: data.showSocials !== undefined ? data.showSocials : 1
        }));
      } catch (err) {
        console.error("Error loading portfolio:", err.message);
      }
    };
    loadConfig();
  }, []);

  const handleChange = (key, value) => {
    setPortfolio(p => ({ ...p, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await savePortfolio(portfolio);
      setSaveMessage('Saved Successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setSaveMessage('Failed to save.');
    }
    setIsSaving(false);
  };

  return (
    <div className="app-container">
      {/* Canva-style Sidebar */}
      <aside className="editor-sidebar canva-sidebar">
        {/* Left Tabs */}
        <div className="canva-tabs">
          <button className={`canva-tab-btn ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>
            <Layout size={20} /><span>Designs</span>
          </button>
          <button className={`canva-tab-btn ${activeTab === 'elements' ? 'active' : ''}`} onClick={() => setActiveTab('elements')}>
            <Box size={20} /><span>Elements</span>
          </button>
          <button className={`canva-tab-btn ${activeTab === 'style' ? 'active' : ''}`} onClick={() => setActiveTab('style')}>
            <Palette size={20} /><span>Styles</span>
          </button>
          <button className={`canva-tab-btn ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>
            <ImageIcon size={20} /><span>Media</span>
          </button>
          <button className={`canva-tab-btn ${activeTab === 'background' ? 'active' : ''}`} onClick={() => setActiveTab('background')}>
            <Grid size={20} /><span>Backdrop</span>
          </button>
          <button className={`canva-tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <Settings2 size={20} /><span>Profile</span>
          </button>
        </div>

        {/* Panel Content */}
        <div className="editor-panel">
          <div className="editor-content">
            <h2 className="panel-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="control-group">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" value={portfolio.name} onChange={(e) => handleChange('name', e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>Role / Title</label>
                    <input type="text" value={portfolio.role} onChange={(e) => handleChange('role', e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>Bio</label>
                    <textarea value={portfolio.bio} onChange={(e) => handleChange('bio', e.target.value)} rows="4" />
                  </div>
                  <div className="input-group">
                    <label>Contact Email</label>
                    <input type="email" value={portfolio.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} />
                  </div>
                  <div className="input-group" style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:'1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px'}}>
                    <label style={{marginBottom:0}}>Show Social Links</label>
                    <input type="checkbox" checked={portfolio.showSocials === 1} onChange={(e) => handleChange('showSocials', e.target.checked ? 1 : 0)} style={{width:'auto'}} />
                  </div>
                </motion.div>
              )}

              {activeTab === 'media' && (
                <motion.div key="media" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="control-group">
                  <div className="input-group">
                    <label>Avatar Photo URL</label>
                    <input type="text" value={portfolio.avatar} onChange={(e) => handleChange('avatar', e.target.value)} placeholder="https://..." />
                    {portfolio.avatar && <img src={portfolio.avatar} alt="Preview" className="radius-element" style={{width: 80, height: 80, objectFit: 'cover', marginTop: 15, border: '2px solid rgba(255,255,255,0.1)'}}/>}
                  </div>
                  <div className="input-group" style={{marginTop: '1.5rem'}}>
                    <label>Cover / Hero Image URL</label>
                    <input type="text" value={portfolio.cover} onChange={(e) => handleChange('cover', e.target.value)} placeholder="https://..." />
                    {portfolio.cover && <img src={portfolio.cover} alt="Preview" className="radius-element" style={{width: '100%', height: 120, objectFit: 'cover', marginTop: 15, border: '2px solid rgba(255,255,255,0.1)'}}/>}
                  </div>
                </motion.div>
              )}

              {activeTab === 'templates' && (
                <motion.div key="templates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="control-group">
                  <div className="input-with-icon" style={{marginBottom: '1rem'}}>
                    <Search size={16} className="input-icon" />
                    <input type="text" placeholder="Search 1,000+ Canva-style Templates..." style={{width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'white'}} />
                  </div>
                  <div className="template-grid" style={{maxHeight: '400px', overflowY: 'auto', paddingRight: '10px'}}>
                    {['minimal', 'bold', 'classic', 'split', 'agency', 'developer', 'startup', 'creative', 'magazine', 'portfolio', 'landing'].map(t => (
                      <div key={t} className={`template-card ${portfolio.template === t ? 'active' : ''}`} onClick={() => handleChange('template', t)}>
                        <div className={`template-preview ${['minimal', 'bold', 'classic', 'split'].includes(t) ? t : 'classic'}`} style={{background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`}}></div>
                        <span style={{textTransform:'capitalize'}}>{t}</span>
                      </div>
                    ))}
                    <div className="template-card" style={{opacity: 0.5}}>
                       <div className="template-preview" style={{display:'flex', alignItems:'center', justifyContent:'center'}}><Layers size={24}/></div>
                       <span>Load More (989+)</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'elements' && (
                <motion.div key="elements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="control-group">
                  <div className="input-with-icon" style={{marginBottom: '1rem'}}>
                    <Search size={16} className="input-icon" />
                    <input type="text" placeholder="Search Shapes, Graphics, Stickers..." style={{width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'white'}} />
                  </div>
                  <label className="section-label">Basic Shapes</label>
                  <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
                     <button className="radius-btn" style={{padding: '1rem', flex: 1}}><Square size={24}/></button>
                     <button className="radius-btn" style={{padding: '1rem', flex: 1}}><Circle size={24}/></button>
                     <button className="radius-btn" style={{padding: '1rem', flex: 1}}><Triangle size={24}/></button>
                     <button className="radius-btn" style={{padding: '1rem', flex: 1}}><Hexagon size={24}/></button>
                  </div>
                  <label className="section-label">Premium Vector Assets</label>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>10,000+ vector elements automatically sync with your selected brand colors.</p>
                </motion.div>
              )}

              {activeTab === 'style' && (
                <motion.div key="style" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="control-group">
                  <label className="section-label"><Type size={16} /> Typography Library</label>
                  <div className="font-selector" style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                    {['outfit', 'inter', 'playfair', 'roboto', 'poppins', 'montserrat', 'lora', 'raleway'].map(f => (
                      <button key={f} className={`font-btn ${f} ${portfolio.font === 'font-'+f ? 'active' : ''}`} onClick={() => handleChange('font', 'font-'+f)} style={{flex: '1 1 calc(50% - 0.5rem)'}}>
                         {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>

                  <label className="section-label" style={{marginTop: '2rem'}}><Palette size={16} /> Brand Color</label>
                  <div className="color-selector">
                    {['blue', 'purple', 'emerald', 'rose'].map(color => (
                      <button key={color} className={`color-btn ${color} ${portfolio.themeColor === color ? 'active' : ''}`} onClick={() => handleChange('themeColor', color)}>
                        {portfolio.themeColor === color && <CheckCircle size={14} />}
                      </button>
                    ))}
                  </div>

                  <label className="section-label" style={{marginTop: '2rem'}}><Box size={16} /> Corner Elements</label>
                  <div className="radius-selector">
                     {['none', 'sm', 'md', 'lg', 'full'].map(r => (
                        <button key={r} className={`radius-btn ${portfolio.borderRadius === r ? 'active' : ''}`} onClick={() => handleChange('borderRadius', r)}>
                           {r === 'none' && <Square size={16}/>}
                           {(r === 'sm' || r === 'md') && <Box size={16} />}
                           {(r === 'lg' || r === 'full') && <Circle size={16} />}
                           <span style={{textTransform: 'capitalize'}}>{r}</span>
                        </button>
                     ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'background' && (
                <motion.div key="background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="control-group">
                  <label className="section-label"><Grid size={16} /> Canvas Texture</label>
                  <div className="texture-grid">
                     {['none', 'dots', 'grid', 'waves'].map(tex => (
                       <button key={tex} className={`texture-btn ${portfolio.backgroundTexture === tex ? 'active' : ''}`} onClick={() => handleChange('backgroundTexture', tex)}>
                          <div className={`texture-preview bg-${tex}`}></div>
                          <span style={{textTransform:'capitalize'}}>{tex}</span>
                       </button>
                     ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="editor-footer" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            {saveMessage && <div style={{fontSize: '0.9rem', color: '#34d399', textAlign: 'center', fontWeight: '500'}}>{saveMessage}</div>}
            <button className="publish-btn" onClick={handleSave} disabled={isSaving}>
              <Save size={18} style={{marginRight: '0.5rem', verticalAlign: 'middle'}}/>
              {isSaving ? 'Saving...' : 'Save Portfolio'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="preview-area">
        <div className="preview-toolbar">
          <div className="view-toggles">
            <button className={device === 'desktop' ? 'active' : ''} onClick={() => setDevice('desktop')}><Monitor size={18} /></button>
            <button className={device === 'mobile' ? 'active' : ''} onClick={() => setDevice('mobile')}><Phone size={18} /></button>
          </div>
          <div className="url-bar">yourfolio.com/preview</div>
        </div>
        
        <div className={`preview-stage ${device}`}>
          <div className={`portfolio-preview theme-${portfolio.themeColor} ${portfolio.font} template-${portfolio.template} bg-${portfolio.backgroundTexture} radius-${portfolio.borderRadius}`}>
            
            <motion.div 
              className="portfolio-content-layer z-10"
              key={`${portfolio.template}-${portfolio.font}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {portfolio.template === 'minimal' && (
                <div className="tpl-minimal">
                  <header>
                    <h2>{portfolio.name}</h2>
                    <nav><a href="#">Work</a><a href="#">About</a></nav>
                  </header>
                  <section className="hero">
                    <h1>{portfolio.role}</h1>
                    <p>{portfolio.bio}</p>
                    {portfolio.showSocials === 1 && (
                      <div className="social-links dark-mode-fix">
                        <Github size={20}/> <Twitter size={20}/> <Linkedin size={20}/> <Dribbble size={20}/>
                      </div>
                    )}
                    <button className="primary-btn radius-element mt-6">Get in touch</button>
                  </section>
                </div>
              )}

              {portfolio.template === 'bold' && (
                <div className="tpl-bold">
                  <div className="bold-split">
                    <div className="bold-left decoration">
                      {portfolio.cover ? (
                        <motion.img src={portfolio.cover} alt="Cover" className="cover-img object-cover w-full h-full radius-element" style={{opacity: 0.8, width:'100%', height:'100%', objectFit:'cover'}} />
                      ) : (
                        <div className="abstract-shape radius-element" />
                      )}
                    </div>
                    <div className="bold-right content">
                      {portfolio.avatar && <img src={portfolio.avatar} className="avatar-img radius-element" alt="Avatar" />}
                      <h3>Hello, I'm {portfolio.name}</h3>
                      <h1>{portfolio.role}</h1>
                      <p>{portfolio.bio}</p>
                      {portfolio.showSocials === 1 && (
                        <div className="social-links dark">
                          <Github size={20}/> <Twitter size={20}/> <Linkedin size={20}/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {portfolio.template === 'classic' && (
                <div className="tpl-classic">
                  <div className="classic-cover radius-element">
                     {portfolio.cover && <img src={portfolio.cover} alt="Cover" />}
                     <div className="classic-cover-overlay"></div>
                  </div>
                  <div className="classic-body">
                    {portfolio.avatar && <img src={portfolio.avatar} className="classic-avatar radius-element shadow-lg" alt="Avatar" />}
                    <h1>{portfolio.name}</h1>
                    <h3 className="brand-text">{portfolio.role}</h3>
                    <p>{portfolio.bio}</p>
                    {portfolio.showSocials === 1 && (
                      <div className="social-links justify-center dark-mode-fix">
                        <Github size={22}/> <Twitter size={22}/> <Linkedin size={22}/> <Dribbble size={22}/>
                      </div>
                    )}
                    <button className="primary-btn radius-element mt-6">Hire Me</button>
                  </div>
                </div>
              )}

              {portfolio.template === 'split' && (
                <div className="tpl-split">
                  <div className="split-left">
                    <div className="split-card radius-element shadow-xl">
                      {portfolio.avatar && <img src={portfolio.avatar} className="split-avatar radius-element shadow-md" alt="Avatar" />}
                      <h2>{portfolio.name}</h2>
                      <div className="brand-line radius-element"></div>
                      <p>{portfolio.bio}</p>
                      {portfolio.showSocials === 1 && (
                        <div className="social-links dark-mode-fix justify-center" style={{width:'100%'}}>
                          <Github size={18}/> <Linkedin size={18}/>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="split-right">
                    <h1 className="brand-text">{portfolio.role}</h1>
                    <p className="lead">Passionate about creating memorable experiences through digital products and scalable systems.</p>
                    <div className="split-image-holder radius-element shadow-lg">
                       {portfolio.cover && <img src={portfolio.cover} alt="Cover" />}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Editor;
