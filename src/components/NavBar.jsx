import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router';
import { useUserContext } from '../service/UserContextProvider';

const navItems = [
  { to: '/#', icon: 'icon-nav-home.svg', label: 'Home' },
  { to: '/movies', icon: 'icon-nav-movies.svg', label: 'Movies' },
  { to: '/tv-series', icon: 'icon-nav-tv-series.svg', label: 'Series' },
  { to: '/bookmarked', icon: 'icon-nav-bookmark.svg', label: 'Bookmark' },
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
const NavIcon = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group relative flex items-center justify-center ${isActive ? 'filter brightness-[4]' : ''}`
    }
    aria-label={label}
  >
    {/* Icon */}
    <div
      className='transition duration-500 bg-lightBlue w-[1rem] h-[1rem] md:w-[1.25rem] md:h-[1.25rem] hover:bg-red'
      style={{
        mask: `url('/assets/${icon}') center/contain no-repeat`,
        WebkitMask: `url('/assets/${icon}') center/contain no-repeat`,
      }}
      role='img'
      aria-hidden='true'
     
    />
    
    {/* Hover text */}
    <span className='sr-only'>
      {label}
    </span>
  </NavLink>
);

// Dropdown Menu Component
const DropdownMenu = ({ isOpen, onLogout, onClose }) => {
  return isOpen ? (
    <div
      className="absolute right-0 mt-2 xl:left-[4rem] xl:bottom-0 bg-darkBlue text-white border-2 border-lightBlue rounded-xl shadow-lg p-[0.5rem] flex flex-col space-y-2 w-40"
    >
      <NavLink
        to="/profile"
        className="hover:bg-red h-9 text-sm bg-lightBlue border border-dark rounded-xl p-2 text-center"
        onClick={onClose}
      >
        Profile
      </NavLink>
      <button
        className="hover:bg-red h-9 text-sm bg-lightBlue border border-dark rounded-xl text-center"
        onClick={onLogout}
      >
        Sign Out
      </button>
    </div>
  ) : null;
};

// Confirmation Modal for Sign Out
const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-darkBlue bg-opacity-70 z-50 transition-opacity duration-300 opacity-100">
      <div className="bg-darkBlue p-8 rounded-xl border-4 border-lightBlue shadow-xl max-w-sm w-full">
        <h3 className="text-2xl text-white font-semibold mb-6 text-center">
          Are you sure you want to log out?
        </h3>
        <div className="flex justify-between gap-4">
          <button
            className="w-full py-1 px-4 bg-lightBlue hover:bg-red text-white rounded-lg text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="w-full py-1 px-4 bg-lightBlue hover:bg-red text-white rounded-lg text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};



// Avatar component with logout functionality
const Avatar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const confirmLogout = () => {
    setUserLoggedOut();
    setIsModalOpen(false);
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative group">
      <NavLink to="#" onClick={toggleDropdown}>
        <img
          src="/assets/image-avatar.png"
          alt="Avatar"
          className="rounded-full border border-white w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem] xl:w-[2.5rem] xl:h-[2.5rem]"
        />
      </NavLink>
      
      {/* Dropdown Menu */}
      <DropdownMenu
        isOpen={isDropdownOpen}
        onLogout={handleLogout}
        onClose={() => setIsDropdownOpen(false)}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
};

// Navbar component
const Navbar = () => (
  <div className='flex flex-col sticky top-0 xl:ml-[2rem] xl:mr-[1rem] xl:flex-row w-full xl:w-[6rem] z-50'>
    <nav className='bg-darkBlue sticky top-0 xl:sticky xl:top-8 xl:left-0 xl:h-[calc(100vh-4rem)] xl:mt-[2rem] xl:mb-[2rem] flex items-center justify-between p-4 sm:p-5 md:rounded-2xl md:m-[1.5rem] xl:p-0 xl:pt-[0rem] xl:w-[6rem] xl:flex-col xl:m-0'>
      {/* Logo */}
      <div className='flex justify-center items-center xl:mt-[2rem]'>
        <Logo />
      </div>

      {/* Nav Icons */}
      <div className='flex items-center space-x-[1.25rem] md:space-x-[2rem] xl:space-x-0 xl:flex-col xl:pt-[5rem] xl:space-y-[3rem]'>
        {navItems.map(({ to, icon, label }) => (
          <NavIcon key={to} to={to} icon={icon} label={label} />
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
