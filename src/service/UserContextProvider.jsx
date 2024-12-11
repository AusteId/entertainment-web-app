import { createContext, useContext, useState } from "react";

// pradine user steito busena
const initUserState = {
  userId: "",
  // unBookmarkId: '',
  BookmarkedMovies: [],
};

export const UserContext = createContext();

const getInitialUserState = () => {
  const userId = localStorage.getItem("movieUserId");
  if (userId) {
    return { userId, bookmarkedMovies: [] };
  } else {
    return initUserState;
  }
};

const UserContextProvider = (props) => {
  const [userData, setUserData] = useState(getInitialUserState);

  const setUserLoggedIn = (userId) => {
    localStorage.setItem("movieUserId", userId);
    setUserData((prevData) => ({...prevData, userId}))
  };

  const setUserLoggedOut = () => {
    localStorage.removeItem("movieUserId");
    setUserData((prevData) => ({...prevData, userId:'', bookmarkedMovies: [] }))
  };

  const toggleBookmark = (movieId) => {
  setUserData((prevData) => {
    const isBookmarked = prevData.bookmarkedMovies.includes(movieId);
    const updatedBookmarkedMovies = isBookmarked
      ? prevData.bookmarkedMovies.filter((id) => id !== movieId)
      : [...prevData.bookmarkedMovies, movieId];
    
    return { ...prevData, bookmarkedMovies: updatedBookmarkedMovies };
  });
};
  return (
    <UserContext.Provider
      value={{ ...userData, setUserLoggedIn, setUserLoggedOut, toggleBookmark }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
