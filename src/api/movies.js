export const apiSetBookmark = async (userId, movieId) => {
  try {
    const res = await apiGetMovieById(movieId);
    if (!res.error) {
      // ar yra zymiu masyvas?
      if (res.bookmarks) {
        const bookmarksArr = [...res.bookmarks, userId];
        await axios.patch(process.env.API_MOVIES_URL + `/${movieId}`, {
          bookmarks: bookmarksArr,
        });
      } else {
        // sukuriam nauja masyva ir pridedam zyma
        const bookmarksArr = [userId];
        await axios.patch(process.env.API_MOVIES_URL + `/${movieId}`, {
          bookmarks: bookmarksArr,
        });
      }
    }
  } catch (e) {}
};
 
export const apiRemoveBookmark = async (userId, movieId) => {
  const res = await apiGetMovieById(movieId);
  try {
    const bookmarksArr = res.bookmarks.filter((id) => id !== userId);
    await axios.patch(process.env.API_MOVIES_URL + `/${movieId}`, {
      bookmarks: bookmarksArr,
    });
  } catch (e) {
    return { error: e };
  }
};
 
export const apiGetBookmarked = async (userId) => {
  try {
    const allMovies = await apiGetAllMovies();
    let bookmarked = [];
    allMovies.forEach((movie) => {
      if (movie.bookmarks && movie.bookmarks.includes(userId))
        bookmarked = [...bookmarked, movie];
    });
    return bookmarked;
  } catch (e) {
    return { error: e };
  }
};