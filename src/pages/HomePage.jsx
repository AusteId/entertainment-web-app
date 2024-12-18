import { useUserContext } from '../service/UserContextProvider';
import { Search } from '../components/Search';
import { apiGetHomeMovies } from '../api/movies';
import { useEffect, useState } from 'react';
import MoviesList from '../components/MoviesList';
import { TrendingCarousel } from '../components/shared/TrendingCarousel';

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
    if (textString) {
      setFilteredRecommended([
        ...recommended.filter((movie) =>
          movie.title.toLowerCase().includes(textString.toLowerCase())
        ),
      ]);
    } else {
      setFilteredRecommended([...recommended]);
    }

    setSearchText(textString);
  };

  return (
    <div className='w-full flex flex-col gap-4 body-md p-4 xl:mt-[2rem]'>
      <Search onSearch={(searchString) => handleSearch(searchString)} className=""/>
      <h2 className='text-[1.25rem] md:text-hl p-0 text-white font-outfit font-thin tracking-[-0.0195rem] self-start'>
        Trending
      </h2>
      <TrendingCarousel trendingMovies={trending} />
      <MoviesList movies={filteredRecommended} searchText={searchText} />
    </div>
  );
}
