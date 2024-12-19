import { createContext, useContext, useState, useEffect } from 'react';
import { apiGetUserById } from '../api/users';

const defaultUserState = {
  userId: '',
  avatar: '',
  username: '',
  unBookmarkId: '',
};

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [userData, setUserData] = useState(() => {
    const userId = localStorage.getItem('movieUserId');
    return userId ? { userId, avatar: '', username: '', unBookmarkId: '' } : defaultUserState;
  });

  const loadUserData = async (userId) => {
    try {
      const user = await apiGetUserById(userId);
      if (user) {
        setUserData((prevData) => ({
          ...prevData,
          userId: user.id,
          avatar: user.avatar || '',
          username: user.username || '',
        }));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  useEffect(() => {
    if (userData.userId) {
      loadUserData(userData.userId);
    }
  }, [userData.userId]);

  const login = (userId) => {
    localStorage.removeItem('formLogin');
    localStorage.setItem('movieUserId', userId);
    setUserData((prevData) => ({ ...prevData, userId }));
  };

  const logout = () => {
    localStorage.removeItem('formLogin');
    localStorage.removeItem('movieUserId');
    setUserData((prevData) => ({ ...prevData, userId: '' }));
  };

  const setUnBookmark = (movieId) => {
    setUserData((prevData) => ({ ...prevData, unBookmarkId: movieId }));
  };
  const updateAvatar = (newAvatar) => {
    setUserData((prevData) => ({ ...prevData, avatar: newAvatar }));
  };

  return (
    <UserContext.Provider
      value={{
        ...userData,
        login,
        logout,
        setUnBookmark,
        updateAvatar,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
