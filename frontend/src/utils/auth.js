export const setToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const removeToken = () => {
  sessionStorage.removeItem('token');
};

export const setUsername = (username) => {
  sessionStorage.setItem('username', username);
};

export const getUsername = () => {
  return sessionStorage.getItem('username');
};

export const removeUsername = () => {
  sessionStorage.removeItem('username');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  removeToken();
  removeUsername();
};
