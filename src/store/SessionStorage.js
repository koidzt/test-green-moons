const getUser = () => {
  return sessionStorage.getItem('ACCESS_USER');
};

const setUser = (data) => {
  return sessionStorage.setItem('ACCESS_USER', data);
};

const getFavorite = () => {
  return sessionStorage.getItem('ACCESS_FAVORITE');
};

const setFavorite = (data) => {
  return sessionStorage.setItem('ACCESS_FAVORITE', data);
};

const clearUser = () => {
  sessionStorage.clear();
};

export default {
  getUser,
  setUser,
  clearUser,
  getFavorite,
  setFavorite,
};
