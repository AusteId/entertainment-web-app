import axios from 'axios';
import { API_MOVIES_URL } from '../helpers/constants';

/**
 * Funkcija atrenka trending ir recommended masyvus
 * @param {*} userId
 * @returns objektas su dviem masyvais
 */
export const apiGetHomeMovies = async (userId) => {
  try {
    const res = await axios.get(API_MOVIES_URL);
    // trending tiesiog filtruojam
    const trending = res.data.filter((movie) => movie.isTrending);

    // recommnded - visi filmai, išskyrus trending
    // ir duoto naudotojo bookmarkus
    const recommended = res.data.filter(
      (movie) => !movie.isTrending && !movie.bookmarks.includes(userId)
    );

    return {
      trendingMovies: trending,
      recommendedMovies: recommended.sort(
        (a, b) => b.bookmarks.length - a.bookmarks.length
      ),
    };
  } catch (e) {
    return { error: 'Unexpected error' };
  }
};

/**
 * Funkcija grąžina filtruotą masyvą pagal kategoriją
 * @param {*} category
 * @returns filmų masyvas
 */
export const apiGetMoviesByCategory = async (category) => {
  try {
    const res = await axios.get(API_MOVIES_URL);
    const filtered = res.data.filter((movie) => movie.category === category);
    return filtered;
  } catch (e) {
    return { error: 'Unexpected error' };
  }
};
export const apiGetMovieById = async (movieId) => {
  try {
    const res = await axios.get(API_MOVIES_URL + `/${movieId}`);
    return res.data;
  } catch (e) {
    return { error: e };
  }
};
/**
 * Funkcija atrenka tuos filmus, kurios
 * bookmarkino userId
 * @param {*} userId
 * @returns filmu masyvas
 */
export const apiGetBookmarked = async (userId) => {
  try {
    const res = await axios.get(API_MOVIES_URL);
    return res.data.filter((movie) => movie.bookmarks.includes(userId));
  } catch (e) {
    return { error: 'Unexpected error' };
  }
};

export const apiSetBookmark = async (userId, movieId) => {
  try {
    const res = await apiGetMovieById(movieId);
    if (!res.error) {
      // ar yra zymiu masyvas?
      if (res.bookmarks) {
        const bookmarksArr = [...res.bookmarks, userId];
        await axios.patch(API_MOVIES_URL + `/${movieId}`, {
          bookmarks: bookmarksArr,
          isBookmarked: true,
        });
      } else {
        // sukuriam nauja masyva ir pridedam zyma
        const bookmarksArr = [userId];
        await axios.patch(API_MOVIES_URL + `/${movieId}`, {
          bookmarks: bookmarksArr,
          isBookmarked: true,
        });
      }
    }
  } catch (e) {}
};

export const apiRemoveBookmark = async (userId, movieId) => {
  const res = await apiGetMovieById(movieId);
  try {
    const bookmarksArr = res.bookmarks.filter((id) => id !== userId);
    const isBookmarked = bookmarksArr.length > 0 ? true : false;
    await axios.patch(API_MOVIES_URL + `/${movieId}`, {
      bookmarks: bookmarksArr,
      isBookmarked: isBookmarked,
    });
  } catch (e) {
    return { error: e };
  }
};

/**
 *
 * @param {*} userId
 * @returns objektų masyvas
 */
export const apiGetBookmarkedMovies = async (userId) => {
  try {
    const allMovies = await axios.get(API_MOVIES_URL);
    let bookmarked = [];
    allMovies.data.forEach((movie) => {
      if (movie.bookmarks && movie.bookmarks.includes(userId))
        bookmarked = [...bookmarked, movie];
    });
    return bookmarked;
  } catch (e) {
    return { error: e };
  }
};

/**
 *
 * @returns objektų masyvas
 */
export const apiGetAllMovies = async () => {
  try {
    const res = await axios.get(API_MOVIES_URL);
    return res.data;
  } catch (e) {
    return { error: e };
  }
};

/**
 *
 * @returns objektas - kategorijų ir reitingų masyvai
 */
export const apiGetMovieCategoriesAndRatings = async () => {
  try {
    const res = await axios.get(API_MOVIES_URL);
    let catArray = [];
    let ratArray = [];
    res.data.forEach((item) => {
      if (!catArray.includes(item.category)) catArray.push(item.category);
      if (!ratArray.includes(item.rating)) ratArray.push(item.rating);
    });
    return { categories: catArray, ratings: ratArray };
  } catch (e) {
    return { error: e };
  }
};

/**
 * Prideda naują filmą
 * @param {*} movie - objektas
 * @returns 201 ir filmo duomenis arba klaidą
 */
export const apiAddNewMovie = async (movie) => {
  try {
    const res = await axios.post(API_MOVIES_URL, movie);
    return res.data;
  } catch (e) {
    return { error: e };
  }
};

/**
 * Ištrina filmą pagal id
 * @param {*} movieId
 * @returns objektas - deleted movie
 */
export const apiDeleteMovie = async (movieId) => {
  try {
    const res = await axios.delete(`${API_MOVIES_URL}/${movieId}`);
    return res.data;
  } catch (e) {
    return { error: e };
  }
};

export const apiUpdateMovie = async (movieData, movieId) => {
  try {
    const res = await axios.patch(`${API_MOVIES_URL}/${movieId}`, movieData);

    return res.data;
  } catch (e) {
    return { error: e };
  }
};
