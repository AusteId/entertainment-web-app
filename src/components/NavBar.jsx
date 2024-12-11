import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { useUserContext } from '../service/UserContextProvider';

const navItems = [
  { to: '/#', icon: 'icon-nav-home.svg', alt: 'Home' },
  { to: '/movies', icon: 'icon-nav-movies.svg', alt: 'Movies' },
  { to: '/tv-series', icon: 'icon-nav-tv-series.svg', alt: 'Series' },
  { to: '/bookmarked', icon: 'icon-nav-bookmark.svg', alt: 'Bookmark' },
];

// Logo component
const Logo = () => (
  <NavLink to='/#'>
    <img
      src='/assets/logo.svg'
      alt='Logo'
      className='w-[1.5625rem] h-[1.25rem] md:w-[2rem] md:h-[1.6rem]'
    />
  </NavLink>
);

// NavIcon component
const NavIcon = ({ to, icon, alt }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group relative flex items-center justify-center ${isActive ? 'filter brightness-[4]' : ''}`
    }
  >
    <div
      className='bg-lightBlue transition duration-500 group-hover:bg-red w-[1rem] h-[1rem] md:w-[1.25rem] md:h-[1.25rem]'
      style={{
        mask: `url('/assets/${icon}') center/contain no-repeat`,
        WebkitMask: `url('/assets/${icon}') center/contain no-repeat`,
      }}
      aria-label={alt}
    />
  </NavLink>
);

// Avatar component with logout functionality
const Avatar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setUserLoggedOut } = useUserContext();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUserLoggedOut();
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <NavLink to="#" onClick={toggleDropdown}>
        <img
          src="/assets/image-avatar.png"
          alt="Avatar"
          className="rounded-full border border-white w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem] xl:w-[2.5rem] xl:h-[2.5rem]"
        />
      </NavLink>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 xl:left-[4rem] xl:bottom-0 bg-darkBlue text-darkBlue border-2 border-lightBlue rounded-2xl shadow-lg p-[0.5rem] flex flex-col space-y-2 w-40"
        >
          <NavLink
            to="/profile"
            className="text-sm bg-lightBlue hover:bg-white border border-dark rounded-lg p-2 text-center"
            onClick={() => setIsDropdownOpen(false)}
          >
            Profile
          </NavLink>
          <button
            className="text-sm bg-lightBlue hover:bg-white border border-dark rounded-lg text-center"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

// Navbar component
const Navbar = () => (
  <div className='flex flex-col xl:flex-row z-10 top-0 sticky '>
    <nav className='bg-darkBlue flex items-center justify-between p-4 sm:p-5 md:rounded-2xl md:m-[1.5rem] xl:p-0 xl:pt-[2.25rem] xl:h-[60rem] xl:w-[6rem] xl:flex-col xl:m-0 xl:left-0 xl:top-0 xl:sticky'>
      {/* Logo */}
      <div className='flex justify-center items-center xl:mt-[2rem]'>
        <Logo />
      </div>

      {/* Nav Icons */}
      <div className='flex items-center space-x-[1.25rem] md:space-x-[2rem] xl:space-x-0 xl:flex-col xl:pt-[5rem] xl:space-y-[3rem]'>
        {navItems.map(({ to, icon, alt }) => (
          <NavIcon key={to} to={to} icon={icon} alt={alt} />
        ))}
      </div>

      {/* Avatar with Dropdown */}
      <div className='flex justify-center items-center xl:mt-auto xl:mb-[4rem]'>
        <Avatar />
      </div>
    </nav>
  </div>
);

export default Navbar;
