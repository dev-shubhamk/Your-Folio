import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Phone, Settings2, Sparkles, Layout, Palette, Type, CheckCircle, Save, Image as ImageIcon, Grid, CircleSlash, Box, Dribbble, Github, Twitter, Linkedin, Square, Circle, Search, Layers, Hexagon, Triangle, Briefcase, BarChart2, Globe, Inbox, ArrowRight, User } from 'lucide-react';
import { fetchPortfolio, savePortfolio, fetchProjects, saveProject, fetchSEO, fetchAnalytics, getMessages, uploadFile } from '../services/api';

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

  const [projects, setProjects] = useState([]);
  const [seo, setSEO] = useState({ title: '', description: '', keywords: '' });
  const [analytics, setAnalytics] = useState(null);
  const [messages, setMessages] = useState([]);
  const [device, setDevice] = useState('desktop');

  useEffect(() => {
    // Load portfolio config and comprehensive backend data
    const loadConfig = async () => {
      try {
        const [portData, projData, seoData, analyticsData, msgData] = await Promise.all([
           fetchPortfolio(),
           fetchProjects(),
           fetchSEO(),
           fetchAnalytics(),
           getMessages()
        ]);
        
        setPortfolio(prev => ({
          ...prev,
          ...portData,
          showSocials: portData.showSocials !== undefined ? portData.showSocials : 1
        }));
        setProjects(projData);
        setSEO(seoData);
        setAnalytics(analyticsData);
        setMessages(msgData);
      } catch (err) {
        console.error("Error loading workspace data:", err.message);
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
      {/* Your-Folio Advanced Sidebar Workspace */}
      <aside className="editor-sidebar yourfolio-sidebar">
        {/* Left Tabs */}
        <div className="yourfolio-tabs" style={{overflowY: 'auto', paddingRight: '4px'}}>
          <button className={`yourfolio-tab-btn ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>
            <Layout size={20} /><span>Designs</span>
          </button>
          <button className={`yourfolio-tab-btn ${activeTab === 'elements' ? 'active' : ''}`} onClick={() => setActiveTab('elements')}>
            <Box size={20} /><span>Elements</span>
          </button>
          <button className={`yourfolio-tab-btn ${activeTab === 'style' ? 'active' : ''}`} onClick={() => setActiveTab('style')}>
            <Palette size={20} /><span>Styles</span>
          </button>
          <button className={`yourfolio-tab-btn ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>
            <ImageIcon size={20} /><span>Media</span>
          </button>
          <button className={`yourfolio-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
             <Briefcase size={20} /><span>Projects</span>
          </button>
          <button className={`yourfolio-tab-btn ${activeTab === 'background' ? 'active' : ''}`} onClick={() => setActiveTab('background')}>
            <Grid size={20} /><span>Backdrop</span>
          </button>
          <button className={`yourfolio-tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <User size={20} /><span>Data</span>
          </button>
          <div style={{height: 1, width: '40px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0'}}></div>
          <button className={`yourfolio-tab-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
            <div style={{position:'relative'}}>
               <Inbox size={20} />
               {messages.length > 0 && <span style={{position:'absolute', top:-4, right:-4, background:'#f43f5e', color:'white', fontSize:'10px', borderRadius:'10px', width:14, height:14, display:'flex', alignItems:'center', justifyContent:'center'}}>{messages.length}</span>}
            </div>
            <span>Inbox</span>
          </button>
          <button className={`yourfolio-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
             <BarChart2 size={20} /><span>Analytics</span>
          </button>
          <button className={`yourfolio-tab-btn ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => setActiveTab('seo')}>
             <Globe size={20} /><span>SEO</span>
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
                    <input type="text" placeholder="Search 10,000+ Your-Folio Layouts..." style={{width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'white'}} />
                  </div>
                  
                  {/* Category Filter Pills */}
                  <div style={{display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem'}}>
                     {['All', 'Development', 'Design', 'Marketing', 'Photography', 'Business'].map(cat => (
                        <div key={cat} style={{padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.8rem', whiteSpace: 'nowrap', cursor: 'pointer', border: cat === 'All' ? '1px solid var(--accent-primary)' : '1px solid transparent'}}>
                           {cat}
                        </div>
                     ))}
                  </div>

                  <div className="template-grid" style={{maxHeight: '400px', overflowY: 'auto', paddingRight: '10px'}}>
                    {['minimal', 'bold', 'classic', 'split', 'agency', 'developer', 'startup', 'creative', 'magazine', 'portfolio', 'landing'].map(t => (
                      <div key={t} className={`template-card ${portfolio.template === t ? 'active' : ''}`} onClick={() => handleChange('template', t)}>
                        <div className={`template-preview ${['minimal', 'bold', 'classic', 'split'].includes(t) ? t : 'classic'}`} style={{background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`}}></div>
                        <span style={{textTransform:'capitalize'}}>{t} Format</span>
                      </div>
                    ))}
                    <div className="template-card" style={{opacity: 0.5}}>
                       <div className="template-preview" style={{display:'flex', alignItems:'center', justifyContent:'center'}}><Layers size={24}/></div>
                       <span>Explore Premium (2k+)</span>
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

                  {/* Advanced Toolbox UI mimicking modern editors */}
                  <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '450px', overflowY: 'auto', paddingRight: '10px'}}>
                    <div>
                      <div style={{display:'flex',justifyContent:'space-between', marginBottom:'0.75rem'}}>
                         <label className="section-label" style={{marginBottom:0}}>Lines & Shapes</label>
                         <span style={{fontSize:'0.8rem', color:'var(--text-muted)', cursor:'pointer'}}>See all</span>
                      </div>
                      <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                         <button className="radius-btn" style={{padding: '0.75rem', flex: '1 1 calc(25% - 0.5rem)'}}><Square size={20}/></button>
                         <button className="radius-btn" style={{padding: '0.75rem', flex: '1 1 calc(25% - 0.5rem)'}}><Circle size={20}/></button>
                         <button className="radius-btn" style={{padding: '0.75rem', flex: '1 1 calc(25% - 0.5rem)'}}><Triangle size={20}/></button>
                         <button className="radius-btn" style={{padding: '0.75rem', flex: '1 1 calc(25% - 0.5rem)'}}><Hexagon size={20}/></button>
                         <button className="radius-btn" style={{padding: '0.75rem', flex: '1 1 calc(25% - 0.5rem)'}}><hr style={{width: '20px', border:'1px solid white'}}/></button>
                         <button className="radius-btn" style={{padding: '0.75rem', flex: '1 1 calc(25% - 0.5rem)'}}><ArrowRight size={20}/></button>
                      </div>
                    </div>

                    <div>
                      <div style={{display:'flex',justifyContent:'space-between', marginBottom:'0.75rem'}}>
                         <label className="section-label" style={{marginBottom:0}}>Graphics & Stickers</label>
                         <span style={{fontSize:'0.8rem', color:'var(--text-muted)', cursor:'pointer'}}>See all</span>
                      </div>
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem'}}>
                         <div style={{aspectRatio:'1', background:'rgba(255,255,255,0.05)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}><Sparkles size={24} color="#a855f7"/></div>
                         <div style={{aspectRatio:'1', background:'rgba(255,255,255,0.05)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}><CheckCircle size={24} color="#10b981"/></div>
                         <div style={{aspectRatio:'1', background:'rgba(255,255,255,0.05)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}><Settings2 size={24} color="#3b82f6"/></div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="section-label">Your-Folio Pro Assets</label>
                      <div style={{padding: '1rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px'}}>
                         <p style={{color: 'var(--text-main)', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Unlock 10,000+ vector illustrations that automatically sync to your theme color.</p>
                         <button style={{width:'100%', padding:'0.5rem', background:'var(--text-main)', color:'black', borderRadius:'6px', fontWeight:'600', border:'none', cursor:'pointer'}}>Upgrade to Pro</button>
                      </div>
                    </div>
                  </div>
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
              {activeTab === 'projects' && (
                <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="control-group">
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
                     <label className="section-label" style={{marginBottom:0}}>Portfolio Case Studies</label>
                     <button style={{background:'var(--accent-primary)', border:'none', color:'white', padding:'0.4rem 0.8rem', borderRadius:'6px', fontSize:'0.8rem', cursor:'pointer', fontWeight:'600'}}>+ New</button>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', gap:'0.75rem', maxHeight: '450px', overflowY:'auto'}}>
                     {projects.length === 0 ? (
                        <div style={{padding:'2rem', textAlign:'center', border:'1px dashed var(--border-subtle)', borderRadius:'12px', color:'var(--text-muted)'}}>
                           <Briefcase size={32} style={{margin:'0 auto 1rem', opacity:0.5}} />
                           <p style={{fontSize:'0.9rem', marginBottom:'1rem'}}>You haven't added any projects yet.</p>
                        </div>
                     ) : (
                        projects.map((proj, idx) => (
                           <div key={idx} style={{background:'rgba(255,255,255,0.05)', padding:'1rem', borderRadius:'12px', border:'1px solid var(--border-subtle)'}}>
                              <h4 style={{margin:0, fontSize:'1rem', color:'white'}}>{proj.title}</h4>
                              <p style={{fontSize:'0.8rem', color:'var(--text-muted)', margin:'0.25rem 0 0.5rem'}}>{proj.description}</p>
                           </div>
                        ))
                     )}
                     
                     {/* Demo mocked project for empty state preview */}
                     {projects.length === 0 && (
                        <div style={{background:'rgba(255,255,255,0.03)', padding:'1rem', borderRadius:'12px', border:'1px solid var(--border-subtle)', opacity:0.7}}>
                           <h4 style={{margin:0, fontSize:'1rem', color:'white'}}>Fintech App Redesign</h4>
                           <p style={{fontSize:'0.8rem', color:'var(--text-muted)', margin:'0.25rem 0'}}>Increased checkout conversion by 45% using streamlined UX.</p>
                           <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" style={{width:'100%', height: '80px', objectFit:'cover', borderRadius:'6px', marginTop:'0.5rem'}} alt="Demo"/>
                        </div>
                     )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'seo' && (
                <motion.div key="seo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="control-group">
                  <label className="section-label"><Globe size={16} /> Web Visibility</label>
                  <div className="input-group">
                    <label>Meta Title</label>
                    <input type="text" placeholder="John Doe - Lead Designer" value={seo.title} onChange={e => setSEO({...seo, title: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label>Meta Description</label>
                    <textarea placeholder="Portfolio of John Doe, specializing in SaaS UX." rows="3" value={seo.description} onChange={e => setSEO({...seo, description: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label>Custom Domain</label>
                    <div style={{display:'flex', gap:'0.5rem'}}>
                       <input type="text" placeholder="www.johndoe.com" style={{flex:1}} />
                       <button style={{background:'var(--bg-dark)', border:'1px solid var(--border-subtle)', color:'white', padding:'0 1rem', borderRadius:'8px', cursor:'pointer'}}>Connect</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="control-group">
                  <label className="section-label"><BarChart2 size={16} /> Real-time Analytics</label>
                  {analytics ? (
                     <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
                           <div style={{background:'var(--bg-dark)', padding:'1rem', borderRadius:'12px', border:'1px solid var(--border-subtle)'}}>
                              <div style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Page Views</div>
                              <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'white'}}>{analytics.pageViews}</div>
                           </div>
                           <div style={{background:'var(--bg-dark)', padding:'1rem', borderRadius:'12px', border:'1px solid var(--border-subtle)'}}>
                              <div style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Unique Visitors</div>
                              <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'white'}}>{analytics.uniqueVisitors}</div>
                           </div>
                        </div>
                        <div style={{background:'var(--bg-dark)', padding:'1rem', borderRadius:'12px', border:'1px solid var(--border-subtle)'}}>
                           <div style={{fontSize:'0.8rem', color:'var(--text-muted)', marginBottom:'0.5rem'}}>Top Traffic Sources</div>
                           {analytics.topReferrers.map((ref, i) => (
                              <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'0.5rem 0', borderBottom: i < analytics.topReferrers.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none'}}>
                                 <span style={{fontSize:'0.9rem'}}>{ref}</span>
                                 <span style={{color:'var(--accent-primary)', fontSize:'0.9rem'}}>{Math.floor(Math.random()*40)+10}%</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  ) : (
                     <div style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>Loading metrics...</div>
                  )}
                </motion.div>
              )}

              {activeTab === 'messages' && (
                <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="control-group">
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
                     <label className="section-label" style={{marginBottom:0}}>Contact Inbox</label>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                     {messages.length === 0 ? (
                        <div style={{padding:'2rem', textAlign:'center', color:'var(--text-muted)'}}>No new messages.</div>
                     ) : (
                        messages.map(msg => (
                           <div key={msg.id} style={{background:'var(--bg-dark)', padding:'1rem', borderRadius:'12px', border:'1px solid var(--border-light)'}}>
                              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
                                 <h5 style={{margin:0, fontSize:'0.95rem', color:'white'}}>{msg.name}</h5>
                                 <span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}>{msg.date}</span>
                              </div>
                              <div style={{fontSize:'0.8rem', color:'var(--accent-primary)', marginBottom:'0.5rem'}}>{msg.email}</div>
                              <p style={{margin:0, fontSize:'0.85rem', color:'var(--text-muted)', lineHeight:'1.4'}}>{msg.message}</p>
                           </div>
                        ))
                     )}
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
