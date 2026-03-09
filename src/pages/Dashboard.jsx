import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowUpDown, LayoutGrid, Plus, Lock, Clock, Folder, CloudUpload } from 'lucide-react';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const mockDesigns = [
    { title: "Moneypick.pdf", time: "Edited 34 minutes ago", img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85" },
    { title: "2nd demo.pdf", time: "Edited 19 hours ago", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174" },
    { title: "1st demo.pdf", time: "Edited 20 hours ago", img: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f" },
    { title: "45.pdf", time: "Edited 1 day ago", img: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f" },
    { title: "Untitled Design", time: "Edited 5 days ago", img: "https://images.unsplash.com/photo-1542744094-3a31f272c490" },
    { title: "Untitled Design", time: "Edited 6 days ago", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113" }
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header-filters">
        <div className="filter-pills">
          <button className="pill-btn">Type <ChevronDown size={14} /></button>
          <button className="pill-btn">Category <ChevronDown size={14} /></button>
          <button className="pill-btn">Owner <ChevronDown size={14} /></button>
          <button className="pill-btn">Date modified <ChevronDown size={14} /></button>
        </div>
        <div className="filter-actions">
          <button className="icon-action"><ArrowUpDown size={18} /></button>
          <button className="icon-action"><LayoutGrid size={18} /></button>
          <button className="icon-action plus-btn" onClick={() => navigate('/editor')}>
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2 className="section-title">Recents</h2>
          <div className="designs-grid">
            {mockDesigns.map((design, i) => (
              <motion.div 
                className="design-card" 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate('/editor')}
              >
                <div className="card-thumbnail">
                  <div className="private-badge"><Lock size={10} /> Private</div>
                  <img src={design.img} alt={design.title} />
                </div>
                <div className="card-info">
                  <h4>{design.title}</h4>
                  <p>
                    <span className="dot-icon"></span>
                    {design.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">
            <Folder size={20} style={{marginRight: '0.5rem'}} /> Folders
          </h2>
          <div className="folders-grid">
            <div className="folder-card">
              <div className="folder-icon">
                <CloudUpload size={24} />
              </div>
              <div className="folder-info">
                <h4>Uploads</h4>
                <p><Lock size={12} style={{marginRight: '0.2rem'}} /> Private</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="dashboard-section">
          <h2 className="section-title">Designs</h2>
          <div className="designs-grid">
            {[...mockDesigns].reverse().map((design, i) => (
              <motion.div 
                className="design-card" 
                key={`d-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate('/editor')}
              >
                <div className="card-thumbnail">
                  <div className="private-badge"><Lock size={10} /> Private</div>
                  <img src={design.img} alt={design.title} />
                </div>
                <div className="card-info">
                  <h4>{design.title}</h4>
                  <p>
                    <span className="dot-icon"></span>
                    {design.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      
      {/* Floating purple question mark inspired by Canva */}
      <button className="floating-help-btn">?</button>
    </div>
  );
}

export default Dashboard;
