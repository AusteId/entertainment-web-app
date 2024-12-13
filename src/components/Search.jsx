import { useLocation } from 'react-router';
import search from '/assets/icon-search.svg';
import { useState } from 'react';

export const Search = ({ onSearch }) => {
  const location = useLocation();
  const [value, setValue] = useState('');

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

  const handleOnSearch = (e) => {
    const cleanText = e.target.value.replace(/[^a-zA-Z0-9À-ž\s]/gi, '');
    setValue(cleanText);
    onSearch(cleanText);
  };

  return (
    <div className="w-full flex items-center gap-[0.5rem]">
      <img src={search} alt="search icon" />
      <input
        className="py-2 bg-dark w-full xl:w-[68rem] 2xl:w-[84rem] outline-none heading-md border-b border-b-dark focus:border-b-lightBlue focus:border-b focus:outline-none caret-red"
        id="search"
        value={value}
        // onChange={(e) => e.target.value === '' && onSearch('')}
        onChange={handleOnSearch}
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
