import { BasicCard } from './shared/BasicCard';
import { useLocation } from 'react-router';
import './MoviesList.css'

const MoviesList = ({ movies = [], searchText }) => {
  const location = useLocation();
  let listHeading = '';

  const defaultHeading = () => {
    switch (location.pathname) {
      case '/':
        return (listHeading = 'Recommended for you');
      case '/movies':
        return (listHeading = 'Movies');
      case '/tv-series':
        return (listHeading = 'TV series');
      case '/bookmarked':
        return (listHeading = 'Bookmarked shows');
      default:
        return (listHeading = 'Recommended for you');
    }
  };

  const countMovies = movies.filter(
    (movie) => movie.category === 'Movie'
  ).length;

  const countSeries = movies.filter(
    (movie) => movie.category === 'TV Series'
  ).length;

  if (movies.length > 0 && searchText !== '')
    listHeading = `Found ${movies.length} ${
      movies.length > 1 ? 'results' : 'result'
    } for '${searchText}'`;

  if (movies.length === 0 && searchText !== '')
    listHeading = `Nothing found for '${searchText}'`;

  if (movies.length > 0 && searchText === '') listHeading = defaultHeading();

  return (
    <section className='flex flex-col'>
      {location.pathname === '/bookmarked' && searchText === '' ? (
        <>
          <h2 className='h2-heading'>
            Bookmarked Movies
          </h2>
          {countMovies < 1 && (
            <p className='body-md text-red'>
              You have not bookmarked any Movies yet
            </p>
          )}
          <div className='movie-grid'>
            {movies
              .filter((movie) => movie.category === 'Movie')
              .map((movie) => (
                <BasicCard key={movie.id} Card={movie} />
              ))}
          </div>
          <h2 className='h2-heading'>
            Bookmarked TV Series
          </h2>
          {countSeries < 1 && (
            <p className='body-md text-red'>
              You have not bookmarked any TV Series yet
            </p>
          )}
          <div className='movie-grid'>
            {movies
              .filter((movie) => movie.category === 'TV Series')
              .map((movie) => (
                <BasicCard key={movie.id} Card={movie} />
              ))}
          </div>
        </>
      ) : (
        <>
          <h1 className='list-heading'>
            {listHeading}
          </h1>
          <div className='movie-grid'>
            {movies.map((movie) => (
              <BasicCard key={movie.id} Card={movie} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MoviesList;
