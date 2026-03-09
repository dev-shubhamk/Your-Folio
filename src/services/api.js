// Fully Edge-Compatible Local Storage Backend
// This bypasses Vercel's ephemeral serverless limits, perfectly persisting data in the browser.

export const register = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('yourfolio_users') || '{}');
      if (users[email]) {
        return reject(new Error("Email already registered. Try logging in."));
      }
      
      const newUserId = Date.now().toString();
      users[email] = { id: newUserId, name, email, password };
      localStorage.setItem('yourfolio_users', JSON.stringify(users));
      
      // Initialize default portfolio
      const portfolios = JSON.parse(localStorage.getItem('yourfolio_portfolios') || '{}');
      portfolios[newUserId] = {
        name: name,
        role: 'Product Designer & Developer',
        bio: 'I build beautiful, user-centric experiences that blend design with function.',
        contactEmail: email,
        themeColor: 'emerald',
        font: 'font-playfair',
        template: 'classic',
        avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name),
        cover: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85',
        backgroundTexture: 'dots',
        borderRadius: 'lg',
        showSocials: 1
      };
      localStorage.setItem('yourfolio_portfolios', JSON.stringify(portfolios));
      
      resolve({
        token: btoa(email), // Pseudo-token
        user: { id: newUserId, name, email }
      });
    }, 400); // Simulate network
  });
};

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('yourfolio_users') || '{}');
      const user = users[email];
      
      if (!user || user.password !== password) {
        return reject(new Error("Invalid email or password."));
      }
      
      resolve({
        token: btoa(email),
        user: { id: user.id, name: user.name, email: user.email }
      });
    }, 400);
  });
};

export const fetchPortfolio = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem('yourfolio_token');
      if (!token) return reject(new Error("Unauthorized"));
      
      const email = atob(token);
      const users = JSON.parse(localStorage.getItem('yourfolio_users') || '{}');
      const user = users[email];
      
      if (!user) return reject(new Error("User not found"));
      
      const portfolios = JSON.parse(localStorage.getItem('yourfolio_portfolios') || '{}');
      resolve(portfolios[user.id]);
    }, 300);
  });
};

export const savePortfolio = async (portfolioData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem('yourfolio_token');
      if (!token) return reject(new Error("Unauthorized"));
      
      const email = atob(token);
      const users = JSON.parse(localStorage.getItem('yourfolio_users') || '{}');
      const user = users[email];
      
      if (!user) return reject(new Error("User not found"));
      
      const portfolios = JSON.parse(localStorage.getItem('yourfolio_portfolios') || '{}');
      portfolios[user.id] = { ...portfolios[user.id], ...portfolioData };
      localStorage.setItem('yourfolio_portfolios', JSON.stringify(portfolios));
      
      resolve({ success: true, message: "Portfolio successfully saved!" });
    }, 400);
  });
};
