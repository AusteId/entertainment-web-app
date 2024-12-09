import { useLocation } from 'react-router';
import search from '/assets/icon-search.svg';

export const Search = ({ onSearch }) => {
  const location = useLocation();

  const renderPlaceholder = () => {
    switch (location.pathname) {
      case '/':
        return 'Search for movies or TV series';
      case '/movies':
        return 'Search for movies';
      case '/tv-series':
        return 'Search for TV series';
      case '/bookmarked':
        return 'Search for bookmarked shows';
      default:
        return 'Search';
    }
  };

  return (
    <div className='w-full flex items-center gap-3'>
      <img src={search} alt='search icon' />
      <input
        className='py-2 bg-dark w-full outline-none heading-md border-b border-b-dark focus:border-b-lightBlue focus:border-b focus:outline-none caret-red'
        id='search'
        onChange={(e) => onSearch(e.target.value)}
        type='text'
        autoComplete='off'
        placeholder={renderPlaceholder()}
      />
    </div>
  );
};
