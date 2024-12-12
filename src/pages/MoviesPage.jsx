import { useEffect, useState } from 'react';
import { Search } from '../components/Search';
import { apiGetMoviesByCategory } from '../api/movies';
import MoviesList from '../components/MoviesList';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
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

  const handleSearch = (textString) => {
    const cleanText = textString.replace(/[^a-zA-Z0-9À-ž\s]/gi, '');

    if (cleanText === '') {
      setFilteredMovies([...movies]);
    } else {
      setFilteredMovies([
        ...movies.filter((movie) =>
          movie.title.toLowerCase().includes(cleanText.toLowerCase())
        ),
      ]);
    }

    setSearchText(cleanText);
  };

  return (
    <div className="w-full flex flex-col gap-2 body-md p-4">
      <Search onSearch={(searchString) => handleSearch(searchString)} />
      <MoviesList movies={filteredMovies} searchText={searchText} />
    </div>
  );
}
