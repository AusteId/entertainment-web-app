import { useUserContext } from '../service/UserContextProvider';
import { Search } from '../components/Search';
import { apiGetHomeMovies } from '../api/movies';
import { useEffect, useState } from 'react';
import MoviesList from '../components/MoviesList';

export default function HomePage() {
  const userData = useUserContext();
  const [heading, setHeading] = useState('Recommended for you');
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [filteredRecommended, setFilteredRecommended] = useState([]);

  useEffect(() => {
    if (userData.userId) getHomeMovies();
  }, []);

  const getHomeMovies = async (userId) => {
    const homeMovies = await apiGetHomeMovies(userData.userId);
    if (!homeMovies.error) {
      setTrending(homeMovies.trendingMovies);
      setRecommended(homeMovies.recommendedMovies);
      setFilteredRecommended(homeMovies.recommendedMovies);
    }
  };

  const handleLogout = () => {
    userData.setUserLoggedOut();
  };

  const handleSearch = (textString) => {};

  return (
    <div className='w-full flex flex-col gap-4 body-md p-4'>
      <span
        onClick={() => handleLogout()}
        className='text-red hover:underline cursor-pointer'
      >
        Logout
      </span>
      <Search onSearch={(searchString) => handleSearch(searchString)} />
      <MoviesList movies={filteredRecommended} heading={heading} />
    </div>
  );
}
