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
    return { trendingMovies: trending, recommendedMovies: recommended };
  } catch (e) {
    return { error: 'Unexpected error' };
  }
};

/**
 * Funkcija grąžina filtruotą masyvą pagal kategoriją
 * @param {*} category
 * @returns filmų masyvas
 */
export const aptGetMoviesByCategory = async (category) => {
  try {
    const res = await axios.get(API_MOVIES_URL);
    const filtered = res.data.filter((movie) => movie.category === category);
    return filtered;
  } catch (e) {
    return { error: 'Unexpected error' };
  }
};
