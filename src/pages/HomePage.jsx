import { useUserContext } from '../service/UserContextProvider';
import { Search } from '../components/Search';
import { apiGetHomeMovies } from '../api/movies';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const userData = useUserContext();
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

  const handleSearch = () => {};

  return (
    <div className='w-full flex flex-col gap-4 body-md p-4'>
      <Search onSearch={(searchString) => handleSearch(searchString)} />
      <h1 className='heading-lg text-white font-outfit mb-8'>
        Recommended for you{' '}
        <span
          onClick={() => handleLogout()}
          className='text-red hover:underline cursor-pointer'
        >
          Logout
        </span>
      </h1>
      {/* <h1 className='heading-lg'>{title}</h1> */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 '></div>
      {/* <MoviesList movies={filteredMovies} /> */}
    </div>
  );
}
