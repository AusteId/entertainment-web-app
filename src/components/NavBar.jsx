import React from "react";
import { NavLink } from "react-router";

const navItems = [
  { to: "/#", icon: "icon-nav-home.svg", alt: "Home" },
  { to: "/movies", icon: "icon-nav-movies.svg", alt: "Movies" },
  { to: "/tv-series", icon: "icon-nav-tv-series.svg", alt: "Series" },
  { to: "/bookmarked", icon: "icon-nav-bookmark.svg", alt: "Bookmark" },
];

// Logo component
const Logo = () => (
  <NavLink to="/#">
    <img
      src="/assets/logo.svg"
      alt="Logo"
      className="
      w-[1.5625rem] h-[1.25rem]
      md:w-[2rem] md:h-[1.6rem]" />
      
  </NavLink>
);

// NavIcon component
const NavIcon = ({ to, icon, alt, className = "" }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group relative flex items-center justify-center ${
        isActive ? "filter brightness-[4]" : ""
      } ${className}`
    }>
    <div
      className="
        bg-lightBlue transition duration-500 group-hover:bg-red
        w-[1rem] h-[1rem]
        md:w-[1.25rem] md:h-[1.25rem]"
      style={{
        mask: `url('/assets/${icon}') center/contain no-repeat`,
        WebkitMask: `url('/assets/${icon}') center/contain no-repeat`,
      }}
      aria-label={alt}>
    </div>
  </NavLink>
);

// Avatar component
const Avatar = () => (
  <NavLink to="/profile">
    <img
      src="/assets/image-avatar.png"
      alt="Avatar"
      className="rounded-full border border-white
      w-[1.5rem] h-[1.5rem]
      md:w-[2rem] md:h-[2rem]
      xl:w-[2.5rem] xl:h-[2.5rem]" />
  </NavLink>
);

// Navbar component
const Navbar = () => (
  <div className="flex flex-col xl:flex-row">
    <nav className="bg-darkBlue flex items-center justify-between p-4
    sm:p-5
    md:rounded-2xl md:m-[1.5rem]
    xl:p-0 xl:pt-[2.25rem] xl:h-screen xl:w-[6rem] xl:flex-col xl:m-0 xl:left-[2rem] xl:top-[0px] xl:sticky
    2xl:h-[60rem] 2xl:mt-[2.25rem]">
      
      {/* Logo */}
      <div className="flex justify-center items-center xl:mt-[2rem]">
        <Logo />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-[1.25rem] space-y-[0px] 
      md:space-x-[2rem]
      xl:space-x-[0px] xl:flex-col xl:pt-[5rem] xl:space-y-[2.5rem]">
        {navItems.map(({ to, icon, alt }) => (
          <NavIcon key={to} to={to} icon={icon} alt={alt} />
        ))}
      </div>

      {/* Avatar */}
      <div className="flex justify-center items-center
      xl:mt-auto xl:mb-[2rem]">
        <Avatar />
      </div>
    </nav>

    {/* Main Content */}
    <div className="flex flex-col flex-1 p-6
    md:mt-[1.5rem]
    lg:ml-[6rem] lg:mt-0">
      <p className="text-white">Main Content</p>
    </div>
  </div>
);

export default Navbar;
