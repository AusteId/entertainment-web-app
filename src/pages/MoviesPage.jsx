import { useEffect, useState } from 'react';
import { Search } from '../components/Search';
import { apiGetMoviesByCategory } from '../api/movies';
import MoviesList from '../components/MoviesList';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const category = 'TV Series';

  useEffect(() => {
    getMovies(category);
  }, []);

  const getMovies = async (category) => {
    const series = await apiGetMoviesByCategory(category);
    setMovies(series);
    setFilteredMovies(series);
  };

  const handleSearch = (searchText) => {
    console.log(searchText);
    setFilteredMovies([
      ...movies.filter((movie) => (movie.title = searchText)),
    ]);
  };

  return (
    <div className='w-full flex flex-col gap-2 body-md p-4'>
      <Search onSearch={(searchString) => handleSearch(searchString)} />
      <MoviesList movies={filteredMovies} heading={'Heading'} />
    </div>
  );
}
