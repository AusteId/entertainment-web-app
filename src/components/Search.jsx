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
    <div className="w-full flex items-center gap-[0.5rem]">
      <img src={search} alt="search icon" />
      <input
        className="py-2 bg-dark w-full xl:w-[68rem] 2xl:w-[84rem] outline-none heading-md border-b border-b-dark focus:border-b-lightBlue focus:border-b focus:outline-none caret-red"
        id="search"
        onKeyDown={(e) => e.key === 'Enter' && onSearch(e.target.value)}
        onChange={(e) => e.target.value === '' && onSearch('')}
        type="text"
        autoComplete="off"
        maxLength={50}
        // pattern="[A-z0-9À-ž\s]"
        // pattern="([^\s][A-z0-9À-ž\s]+)"
        placeholder={renderPlaceholder()}
      />
    </div>
  );
};
