import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import './Dashboard.css';

function Brand() {
  return (
    <div className="dashboard-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        style={{ textAlign: 'center', maxWidth: '400px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ width: '80px', height: '80px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
          <ShieldAlert size={40} color="var(--accent-primary)" />
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'white' }}>Brand Identity Portal</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.05rem' }}>
          Upload your custom fonts, logo vectors, and universal color palettes to automatically sync across all your portfolios effortlessly.
        </p>
      </motion.div>
    </div>
  );
}

export default Brand;
