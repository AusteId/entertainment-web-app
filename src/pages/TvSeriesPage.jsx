import { useEffect, useState } from 'react';
import { Search } from '../components/Search';
import { apiGetMoviesByCategory } from '../api/movies';
import MoviesList from '../components/MoviesList';

export default function TvSeriesPage() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const category = 'TV Series';

  useEffect(() => {
    getSeries(category);
  }, []);

  const getSeries = async (category) => {
    const series = await apiGetMoviesByCategory(category);
    setMovies(series.toReversed());
    setFilteredMovies(series.toReversed());
  };

  const handleSearch = (textString) => {
    if (textString) {
      setFilteredMovies([
        ...movies.filter((movie) =>
          movie.title.toLowerCase().includes(textString.toLowerCase())
        ),
      ]);
    } else {
      setFilteredMovies([...movies]);
    }

    setSearchText(textString);
  };

  return (
    <div className="w-full flex flex-col gap-2 body-md p-4">
      <Search onSearch={(searchString) => handleSearch(searchString)} />
      <MoviesList movies={filteredMovies} searchText={searchText} />
    </div>
  );
}
