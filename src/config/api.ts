const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const endpoints = {
  auth: {
    login: `${API_URL}/api/auth/login`,
    register: `${API_URL}/api/auth/register`,
  },
  game: {
    spin: `${API_URL}/api/game/spin`,
  },
  user: {
    profile: `${API_URL}/api/users/profile`,
    update: `${API_URL}/api/users/profile`,
  },
};

export default API_URL;