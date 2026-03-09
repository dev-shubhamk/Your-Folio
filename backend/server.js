const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to Database (Compatible with Vercel Serverless /tmp/ writes or Cloud PostgreSQL/Mongo URI)
// Vercel only allows writing to the /tmp/ directory in serverless functions!
const dbPath = process.env.NODE_ENV === 'production' ? '/tmp/database.sqlite' : './database.sqlite';
const db = new sqlite3.Database(dbPath);
const SECRET = 'yourfolio-super-secret-key-2026';

// Document Initialization
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS portfolios (
    userId INTEGER PRIMARY KEY,
    name TEXT,
    role TEXT,
    bio TEXT,
    contactEmail TEXT,
    themeColor TEXT,
    font TEXT,
    template TEXT,
    avatar TEXT,
    cover TEXT,
    backgroundTexture TEXT,
    borderRadius TEXT,
    showSocials INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);

  // Migrations for existing DBs to handle newly added columns instantly
  db.run(`ALTER TABLE portfolios ADD COLUMN avatar TEXT`, () => {});
  db.run(`ALTER TABLE portfolios ADD COLUMN cover TEXT`, () => {});
  db.run(`ALTER TABLE portfolios ADD COLUMN backgroundTexture TEXT`, () => {});
  db.run(`ALTER TABLE portfolios ADD COLUMN borderRadius TEXT`, () => {});
  db.run(`ALTER TABLE portfolios ADD COLUMN showSocials INTEGER`, () => {});
});

// Auth Middleware
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    res.status(401).json({ error: "Unauthorized access. Please log in again." });
  }
};

// Registration Endpoint
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

  const hash = bcrypt.hashSync(password, 10);
  
  db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, hash], function(err) {
    if (err) return res.status(400).json({ error: "Email already exists" });
    const userId = this.lastID;
    const token = jwt.sign({ userId }, SECRET, { expiresIn: '7d' });
    
    // Initialize their default portfolio
    db.run(
      `INSERT INTO portfolios (userId, name, role, bio, contactEmail, themeColor, font, template, avatar, cover, backgroundTexture, borderRadius, showSocials) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
      [userId, name, 'Product Designer & Developer', 'I build beautiful, user-centric experiences that blend design with function.', email, 'emerald', 'font-playfair', 'classic', 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name), 'https://images.unsplash.com/photo-1557682250-33bd709cbe85', 'dots', 'lg', 1]
    );
      
    res.json({ token, user: { id: userId, name, email } });
  });
});

// Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email }});
  });
});

// Get User's Portfolio
app.get('/api/portfolio', auth, (req, res) => {
  db.get(`SELECT * FROM portfolios WHERE userId = ?`, [req.userId], (err, row) => {
    if (err || !row) return res.status(404).json({ error: "Portfolio not found" });
    res.json(row);
  });
});

// Update User's Portfolio
app.put('/api/portfolio', auth, (req, res) => {
  const { name, role, bio, contactEmail, themeColor, font, template, avatar, cover, backgroundTexture, borderRadius, showSocials } = req.body;
  db.run(
    `UPDATE portfolios SET name=?, role=?, bio=?, contactEmail=?, themeColor=?, font=?, template=?, avatar=?, cover=?, backgroundTexture=?, borderRadius=?, showSocials=? WHERE userId=?`,
    [name, role, bio, contactEmail, themeColor, font, template, avatar, cover, backgroundTexture, borderRadius, showSocials, req.userId], 
    function(err) {
      if (err) return res.status(500).json({ error: "Failed to update portfolio" });
      res.json({ success: true, message: "Portfolio successfully saved!" });
    }
  );
});

// Serve Frontend for Production Deployment
const path = require('path');
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Run server (only if not running in a serverless environment)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ yourfolio Backend API is running on http://localhost:${PORT}`);
  });
}

// Export the Express API for Vercel Serverless Functions
module.exports = app;
