import { useUserContext } from '../service/UserContextProvider';
import { Search } from '../components/Search';
import { apiGetHomeMovies } from '../api/movies';
import { useEffect, useState } from 'react';
import MoviesList from '../components/MoviesList';

export default function HomePage() {
  const userData = useUserContext();
  const [searchText, setSearchText] = useState('');
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [filteredRecommended, setFilteredRecommended] = useState([]);

  useEffect(() => {
    if (userData.userId) getHomeMovies(userData.userId);
  }, []);

  const getHomeMovies = async (userId) => {
    const homeMovies = await apiGetHomeMovies(userId);
    if (!homeMovies.error) {
      setTrending(homeMovies.trendingMovies);
      setRecommended(homeMovies.recommendedMovies);
      setFilteredRecommended(homeMovies.recommendedMovies);
    }
  };



  const handleSearch = (textString) => {
    const cleanText = textString.replace(/[^a-zA-Z0-9À-ž\s]/gi, '');

    if (cleanText === '') {
      setFilteredRecommended([...recommended]);
    } else {
      setFilteredRecommended([
        ...recommended.filter((movie) =>
          movie.title.toLowerCase().includes(cleanText.toLowerCase())
        ),
      ]);
    }

    setSearchText(cleanText);
  };

  return (
    <div className="w-full flex flex-col gap-4 body-md p-4">
      {/*       Vieta trending slideriui - kur jis???        */}
      <Search onSearch={(searchString) => handleSearch(searchString)} />

      <MoviesList movies={filteredRecommended} searchText={searchText} />
    </div>
  );
}
