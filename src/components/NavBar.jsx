import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { useUserContext } from '../service/UserContextProvider';  // Import the UserContext

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
const NavIcon = ({ to, icon, alt, className = '' }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group relative flex items-center justify-center ${
        isActive ? 'filter brightness-[4]' : ''
      } ${className}`
    }
  >
    <div
      className='bg-lightBlue transition duration-500 group-hover:bg-red w-[1rem] h-[1rem] md:w-[1.25rem] md:h-[1.25rem]'
      style={{
        mask: `url('/assets/${icon}') center/contain no-repeat`,
        WebkitMask: `url('/assets/${icon}') center/contain no-repeat`,
      }}
      aria-label={alt}
    ></div>
  </NavLink>
);

// Avatar component with logout functionality
const Avatar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setUserLoggedOut } = useUserContext();  // Access logout function from context
  const dropdownRef = useRef(null);  // Ref to track the dropdown menu

  // Toggle the dropdown menu open/close
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown if click is outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle user logout
  const handleLogout = () => {
    setUserLoggedOut(); // Call the logout function from context
    setIsDropdownOpen(false); // Close the dropdown
  };

  return (
    <div className="relative">
      <NavLink to="" onClick={toggleDropdown}>
        <img
          src="/assets/image-avatar.png"
          alt="Avatar"
          className="rounded-full border border-white
            w-[1.5rem] h-[1.5rem]
            md:w-[2rem] md:h-[2rem]
            xl:w-[2.5rem] xl:h-[2.5rem]"
        />
      </NavLink>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef} // Attach the ref to the dropdown
          className="absolute right-0 mt-2 xl:mt-0 xl:left-[4rem] xl:bottom-[0rem] bg-darkBlue text-darkBlue border-2 border-lightBlue rounded-2xl shadow-lg p-[0.5rem]
          flex flex-col space-y-2 w-40"
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
  <div className='flex flex-col xl:flex-row z-10 top-0 sticky'>
    <nav
      className='bg-darkBlue flex items-center justify-between p-4 z-10 top-0 sticky
    sm:p-5
    md:rounded-2xl md:m-[1.5rem]
    xl:p-0 xl:pt-[2.25rem] xl:h-screen xl:w-[6rem] xl:flex-col xl:m-0 xl:left-[0rem] xl:top-[0px] xl:sticky'
    >
      {/* Logo */}
      <div className='flex justify-center items-center xl:mt-[2rem]'>
        <Logo />
      </div>

      {/* Icons */}
      <div
        className='flex items-center space-x-[1.25rem] space-y-[0px] 
      md:space-x-[2rem]
      xl:space-x-[0px] xl:flex-col xl:pt-[5rem] xl:space-y-[3rem]'
      >
        {navItems.map(({ to, icon, alt }) => (
          <NavIcon key={to} to={to} icon={icon} alt={alt} />
        ))}
      </div>

      {/* Avatar and Dropdown */}
      <div
        className='flex justify-center items-center
      xl:mt-auto xl:mb-[4rem]'
      >
        <Avatar /> {/* Avatar triggers the dropdown and logout */}
      </div>
    </nav>
  </div>
);

export default Navbar;
