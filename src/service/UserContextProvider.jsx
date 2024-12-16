import { createContext, useContext, useState } from 'react';

// pradine user steito busena
const initUserState = {
  userId: '',
  unBookmarkId: '',
};

export const UserContext = createContext();

const getInitialUserState = () => {
  const userId = localStorage.getItem('movieUserId');
  if (userId) {
    const user = { userId: userId, unBookmarkId: '' };
    return user;
  } else {
    return initUserState;
  }
};

const UserContextProvider = (props) => {
  const [userData, setUserData] = useState(getInitialUserState);

  const setUserLoggedIn = (userId) => {
    localStorage.removeItem('formLogin');
    localStorage.setItem('movieUserId', userId);
    setUserData({ ...userData, userId: userId });
  };

  const setUserLoggedOut = () => {
    localStorage.removeItem('formLogin');
    localStorage.removeItem('movieUserId');
    setUserData({ ...userData, userId: '' });
  };

  const setUnBookmark = (movieId) => {
    setUserData({ ...userData, unBookmarkId: movieId });
  };

  return (
    <UserContext.Provider
      value={{ ...userData, setUserLoggedIn, setUserLoggedOut, setUnBookmark }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
