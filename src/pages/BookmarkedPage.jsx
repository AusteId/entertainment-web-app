import { useEffect, useState } from 'react';
import { Search } from '../components/Search';
import { apiGetBookmarked } from '../api/movies';
import { useUserContext } from '../service/UserContextProvider';
import { useNavigate } from 'react-router';
import MoviesList from '../components/MoviesList';

export default function BookmarkedPage() {
  const userData = useUserContext();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (userData.userId) {
      if (userData.unBookmarkId) {
        getBookmarked(userData.userId);
        userData.setUnBookmark('');
      } else {
        getBookmarked(userData.userId);
      }
    } else {
      navigate('/');
    }
  }, [userData.unBookmarkId]);

  const getBookmarked = async (userId) => {
    const movies = await apiGetBookmarked(userId);
    setMovies(movies);
    setFilteredMovies(movies);
  };

  const handleSearch = (searchText) => {};

  return (
    <div className='w-full flex flex-col gap-2 body-md p-4'>
      <Search onSearch={(searchString) => handleSearch(searchString)} />
      <MoviesList movies={filteredMovies} heading={'Tratatam'} />
    </div>
  );
}
