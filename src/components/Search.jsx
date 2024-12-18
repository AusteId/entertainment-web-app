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
    <div className='w-full flex items-center gap-[0.5rem]'>
      <img src={search} alt='search icon' className='w-[1.5rem] md:w-[2rem] '/>
      <input
        className='py-2 bg-dark w-full xl:w-[68rem] 2xl:w-[84rem] cursor-pointer outline-none heading-md border-b border-b-dark focus:border-b-lightBlue focus:border-b focus:outline-none caret-red placeholder:text-[1rem] placeholder:font-light placeholder:opacity-50 pb-[0.5rem] text-[1rem] font-outfit md:text-hm font-thin md:placeholder:text-hm'
        id='search'
        aria-label='Search for movies or TV series'
        value={value}
        onChange={handleOnSearch}
        type='text'
        autoComplete='off'
        maxLength={50}
        placeholder={renderPlaceholder()}
      />
    </div>
  );
};
