import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  <img
    src='/assets/logo.svg'
    alt='Logo'
    className='w-[1.5625rem] h-[1.25rem] md:w-[2rem] md:h-[1.6rem]'
  />
);

// NavIcon component with text on hover
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
    
    {/* Text that will appear on hover to the right of the icon */}
    <span className='absolute left-full ml-3 text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
      {alt}
    </span>
  </NavLink>
);

// Dropdown Menu Component
const DropdownMenu = ({ isOpen, onLogout, onClose }) => {
  return isOpen ? (
    <div
      className="absolute right-0 mt-2 xl:left-[4rem] xl:bottom-0 bg-darkBlue text-darkBlue border-2 border-lightBlue rounded-2xl shadow-lg p-[0.5rem] flex flex-col space-y-2 w-40"
    >
      <NavLink
        to="/profile"
        className="text-sm bg-lightBlue hover:bg-white border border-dark rounded-lg p-2 text-center"
        onClick={onClose}
      >
        Profile
      </NavLink>
      <button
        className="text-sm bg-lightBlue hover:bg-white border border-dark rounded-lg text-center"
        onClick={onLogout}
      >
        Sign Out
      </button>
    </div>
  ) : null;
};

// Avatar component with logout functionality
const Avatar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const { setUserLoggedOut } = useUserContext();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleLogout = () => {
    setShowLogoutPrompt(true);
    setIsDropdownOpen(false);
  };

  const confirmLogout = () => {
    setUserLoggedOut();
    setShowLogoutPrompt(false);
  };
  const cancelLogout = () => setShowLogoutPrompt(false);

  return (
    <div className="relative group">
      <NavLink to="#" onClick={toggleDropdown}>
        <img
          src="/assets/image-avatar.png"
          alt="Avatar"
          className="rounded-full border border-white w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem] xl:w-[2.5rem] xl:h-[2.5rem]"
        />
      </NavLink>
      
      {/* Text that will appear on hover to the right of the avatar */}
      <span className='absolute left-full ml-[-2rem] xl:ml-1 text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        Avatar
      </span>

      {/* Dropdown Menu */}
      <DropdownMenu
        isOpen={isDropdownOpen}
        onLogout={handleLogout}
        onClose={() => setIsDropdownOpen(false)}
      />
      {showLogoutPrompt && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="bg-darkBlue p-6 rounded-lg"
            style={{ width: '300px', border: '2px solid #5A698F' }}
          >
            <h3 className="text-white text-lg font-medium font-outfit mb-4">Sign Out</h3>
            <p className="text-lightBlue mb-6">This will sign you out from the website. Are you sure you want to Sign Out?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-lightBlue text-white rounded hover:bg-dark"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-white rounded hover:bg-dark"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Navbar component
const Navbar = () => (
  <div className='flex flex-col sticky top-0 xl:ml-[2rem] xl:mr-[1rem] xl:flex-row w-screen xl:w-[6rem] z-50'>
    <nav className='bg-darkBlue sticky top-0 xl:sticky xl:top-8 xl:left-0 xl:h-[calc(100vh-4rem)] xl:mt-[2rem] xl:mb-[2rem] flex items-center justify-between p-4 sm:p-5 md:rounded-2xl md:m-[1.5rem] xl:p-0 xl:pt-[0rem] xl:w-[6rem] xl:flex-col xl:m-0'>
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
