import React, { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../contexts/ThemeContext';

interface NavLinkClassProps {
  isActive: boolean;
  isPending: boolean;
}

const NAV_ITEMS = ['Home', 'Contact', 'Blogs', 'Projects'];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getNavLinkClass = ({ isActive, isPending }: NavLinkClassProps) =>
    `transition-colors duration-300 px-2 py-1 ${
      isPending
        ? 'text-gray-500 dark:text-gray-400 cursor-wait'
        : isActive
        ? 'text-gray-900 dark:text-white font-semibold'
        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
    }`;

  const Logo: React.FC<{ theme: string }> = () => (
    <div className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold font-rock_salt">
      <NavLink to="/" className="hover:opacity-80 transition-opacity duration-300">
        SK
      </NavLink>
    </div>
  );

  const DesktopNavLinks: React.FC<{ getNavLinkClass: (props: NavLinkClassProps) => string }> = ({ getNavLinkClass }) => (
    <div className="hidden md:flex space-x-6 font-bold">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item}
          to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
          className={({ isActive, isPending }) => getNavLinkClass({ isActive, isPending })}
        >
          {item}
        </NavLink>
      ))}
      <NavLink to="/login" className={({ isActive, isPending }) => getNavLinkClass({ isActive, isPending })}>
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Admin
      </NavLink>
    </div>
  );

  const HeaderButtons: React.FC<{ theme: string; toggleTheme: () => void; toggleMenu: () => void }> = ({ theme, toggleTheme, toggleMenu }) => (
    <div className="flex items-center space-x-4">
      <button
        type="button"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <FontAwesomeIcon
          icon={theme === 'light' ? faMoon : faSun}
          className="h-5 w-5 sm:h-6 sm:w-6"
        />
      </button>
      <button
        type="button"
        className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon
          icon={faBars}
          className="h-5 w-5 sm:h-6 sm:w-6"
        />
      </button>
    </div>
  );

  const MobileMenu: React.FC<{ isOpen: boolean; toggleMenu: () => void; getNavLinkClass: (props: NavLinkClassProps) => string; theme: string }> = ({ isOpen, toggleMenu, getNavLinkClass, theme }) => (
    isOpen && (
      <>
        <div
          className="fixed inset-0 bg-black dark:bg-gray-900 bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
        <div className={`fixed inset-0 bg-${theme === 'light' ? 'white' : 'gray-900'} z-50 flex flex-col transform transition-transform duration-300 ease-in-out`}>
          <div className="p-4 flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center flex-1 overflow-y-auto p-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={({ isActive, isPending }) => `${getNavLinkClass({ isActive, isPending })} block py-2 px-4 text-sm`}
                onClick={toggleMenu}
              >
                {item}
              </NavLink>
            ))}
            <NavLink
              to="/login"
              className={({ isActive, isPending }) => `${getNavLinkClass({ isActive, isPending })} block py-2 px-4 text-sm`}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Admin
            </NavLink>
          </div>
        </div>
      </>
    )
  );

  return (
    <header
      className={`
        bg-white dark:bg-gray-900 font-inconsolata shadow-md dark:shadow-md sticky top-0 z-50 
        transition-all duration-300 
        ${isScrolled ? 'py-2' : 'py-4'}
      `}
    >
      <nav className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <Logo theme={theme} />
        <DesktopNavLinks getNavLinkClass={getNavLinkClass} />
        <HeaderButtons theme={theme} toggleTheme={toggleTheme} toggleMenu={toggleMenu} />
        <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} getNavLinkClass={getNavLinkClass} theme={theme} />
      </nav>
    </header>
  );
};

export default Header;
