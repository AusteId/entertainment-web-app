import React from 'react';
import { NavLink } from 'react-router';

// Navigation items configuration
const navItems = [
  { to: '/#', icon: 'icon-nav-home.svg', alt: 'Home' },
  { to: '/movies', icon: 'icon-nav-movies.svg', alt: 'Movies' },
  { to: '/tv-series', icon: 'icon-nav-tv-series.svg', alt: 'Series' },
  { to: '/bookmarked', icon: 'icon-nav-bookmark.svg', alt: 'Bookmark' },
];

// Logo component
const Logo = () => (
  <NavLink to="/#">
    <img
      src="/assets/logo.svg"
      alt="Logo"
      className="w-[1.5625rem] h-[1.25rem] md:w-[2rem] md:h-[1.6rem]"
    />
  </NavLink>
);

// Navigation Icon component
const NavIcon = ({ to, icon, alt }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group relative flex items-center justify-center ${
        isActive ? 'filter brightness-[4]' : ''
      }`
    }
  >
    <div
      className="bg-lightBlue transition duration-500 group-hover:bg-red w-[1rem] h-[1rem] md:w-[1.25rem] md:h-[1.25rem]"
      style={{
        mask: `url('/assets/${icon}') center/contain no-repeat`,
        WebkitMask: `url('/assets/${icon}') center/contain no-repeat`,
      }}
      aria-label={alt}
    ></div>
  </NavLink>
);

// Avatar component
const Avatar = () => (
  <NavLink to="/profile">
    <img
      src="/assets/image-avatar.png"
      alt="Avatar"
      className="rounded-full border border-white w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem] xl:w-[2.5rem] xl:h-[2.5rem]"
    />
  </NavLink>
);

// Navbar component
const Navbar = () => (
  <nav
    className="bg-darkBlue md:rounded-2xl sticky z-10 top-0 flex flex-row h-full p-[1rem] md:p-[1.25rem] md:m-[1.5rem] lg:flex-col lg:w-[6rem] 2xl:h-[60rem]"
  >
    {/* Logo */}
    <div className="flex justify-start items-center w-full lg:justify-center lg:items-center lg:mt-[2.25rem]">
      <Logo />
    </div>

    {/* Navigation Icons */}
    <div
      className="flex flex-row w-full justify-center space-x-[1.25rem] md:space-x-[2rem] lg:flex-col lg:space-x-0 lg:space-y-[2.5rem] lg:pt-[4.5rem]"
    >
      {navItems.map(({ to, icon, alt }) => (
        <NavIcon key={to} to={to} icon={icon} alt={alt} />
      ))}
    </div>

    {/* Avatar */}
    <div
      className="flex w-full justify-end lg:justify-center items-center mt-auto lg:mb-[2rem]"
    >
      <Avatar />
    </div>
  </nav>
);

export default Navbar;
