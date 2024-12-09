import React from "react";
import { NavLink } from "react-router";

const navItems = [
  { to: "/#", icon: "icon-nav-home.svg", alt: "Home" },
  { to: "/movies", icon: "icon-nav-movies.svg", alt: "Movies" },
  { to: "/series", icon: "icon-nav-tv-series.svg", alt: "Series" },
  { to: "/bookmark", icon: "icon-nav-bookmark.svg", alt: "Bookmark" },
];

// Logo component
const Logo = () => (
  <NavLink to="/#">
    <img
      src="/assets/logo.svg"
      alt="Logo"
      className="
      w-[25px] h-[20px]
      md:w-[32px] md:h-[25.6px]
      xl:w-[32px] xl:h-[25.6px]"
    />
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
    }
  >
    <div
      className="
      bg-lightBlue transition duration-500 group-hover:bg-red
      w-[16px] h-[16px]
      md:w-[20px] md:h-[20px]"
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
      className="rounded-full border border-white
      w-[24px] h-[24px]
      md:w-[32px] md:h-[32px]
      xl:w-[40px] xl:h-[40px]"
    />
  </NavLink>
);

// Navbar component
const Navbar = () => (
  <div className="flex flex-col xl:flex-row">
    <nav className="bg-darkBlue flex items-center justify-between p-4
    sm:p-5
    md:rounded-2xl md:m-[24px]
    xl:p-0 xl:pt-[36px] xl:h-screen xl:w-[96px] xl:flex-col xl:m-0 xl:left-[32px] xl:top-[36px] xl:sticky
    2xl:h-[960px]">
      {/* Logo */}
      <div className="
      md:ml-[16px]
      lg:mt-[16px]">
        <Logo />
      </div>

      {/* Icons */}
      <div className="flex
      space-x-[24px]
      md:space-x-[32px]
      xl:space-x-0 xl:flex-col xl:items-center xl:space-y-[32px]">
        {navItems.map(({ to, icon, alt }) => (
          <NavIcon key={to} to={to} icon={icon} alt={alt} />
        ))}
      </div>

      {/* Avatar */}
      <div className="
      md:mr-[16px]
      lg:mb-[16px]
      xl:mr-0 xl:mb-[32px]">
        <Avatar />
      </div>
    </nav>

    {/* Main Content */}
    <div className="flex flex-col flex-1 p-6
    md:mt-6
    lg:ml-24 lg:mt-0">
      <p className="text-white">Main Content</p>
    </div>
  </div>
);

export default Navbar;
