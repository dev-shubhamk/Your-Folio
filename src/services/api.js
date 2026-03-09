// Dynamically switch base URL whether in dev or compiled production
const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const getHeaders = () => {
  const token = localStorage.getItem('yourfolio_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const register = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const fetchPortfolio = async () => {
  const res = await fetch(`${BASE_URL}/portfolio`, {
    headers: getHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const savePortfolio = async (portfolioData) => {
  const res = await fetch(`${BASE_URL}/portfolio`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(portfolioData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};
