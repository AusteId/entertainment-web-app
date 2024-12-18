import { BasicCard } from './shared/BasicCard';
import { useLocation } from 'react-router';

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
          <h2 className='text-[1.25rem] md:text-hl p-0 text-white font-outfit font-thin tracking-[-0.0195rem] pb-[1.5rem] xl:pb-[2.37rem] self-start'>
            Bookmarked Movies
          </h2>
          {countMovies < 1 && (
            <p className='body-md text-red'>
              You have not bookmarked any Movies yet
            </p>
          )}
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-[0.94rem] md:gap-x-[1.81rem] xl:gap-x-[2.5rem] gap-y-[1rem] md:gap-y-[1.5rem] xl:gap-y-[2rem] self-center'>
            {movies
              .filter((movie) => movie.category === 'Movie')
              .map((movie) => (
                <BasicCard key={movie.id} Card={movie} />
              ))}
          </div>
          <h2 className='text-[1.25rem] md:text-hl p-0 text-white font-outfit  font-thin tracking-[-0.0195rem] pb-[1.5rem] self-start'>
            Bookmarked TV Series
          </h2>
          {countSeries < 1 && (
            <p className='body-md text-red'>
              You have not bookmarked any TV Series yet
            </p>
          )}
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-[0.94rem] md:gap-x-[1.81rem] xl:gap-x-[2.5rem] gap-y-[1rem] md:gap-y-[1.5rem] xl:gap-y-[2rem] self-center'>
            {movies
              .filter((movie) => movie.category === 'TV Series')
              .map((movie) => (
                <BasicCard key={movie.id} Card={movie} />
              ))}
          </div>
        </>
      ) : (
        <>
          <h1 className='text-[1.25rem] md:text-hl p-0 text-white font-outfit font-extralight tracking-[-0.0195rem] md:tracking-[-0.03125rem] pb-[1.5rem] xl:pb-[2.37rem] self-start'>
            {listHeading}
          </h1>
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-[0.94rem] md:gap-x-[1.81rem] xl:gap-x-[2.5rem] gap-y-[1rem] md:gap-y-[1.5rem] xl:gap-y-[2rem] self-center'>
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
