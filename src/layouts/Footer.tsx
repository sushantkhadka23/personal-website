import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-300 ${
      isActive
        ? "text-gray-900 dark:text-white font-semibold"
        : "text-gray-600 dark:text-gray-400"
    }`;

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 font-inconsolata shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-semibold font-rock_salt">
              Sushant Khadka
            </h3>
            <p className="text-lg mt-2">
              <strong className="text-2xl font-bold">&copy;</strong>{" "}
              {currentYear} All rights reserved.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <NavigationLinks navLinkClass={navLinkClass} />
            <SocialIcons />
          </div>
        </div>
      </div>
    </footer>
  );
};

const NavigationLinks: React.FC<{ navLinkClass: (props: { isActive: boolean }) => string }> = ({ navLinkClass }) => {
  const navItems = ["Home", "Contact", "Blogs",  "Projects"];

  return (
    <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-4 font-bold">
      {navItems.map((item) => (
        <NavLink
          key={item}
          to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
          className={({ isActive }) =>
            `px-2 py-1 m-1 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 rounded ${navLinkClass(
              { isActive }
            )}`
          }
        >
          {item}
        </NavLink>
      ))}
    </nav>
  );
};

const SocialIcons: React.FC = () => {
  const socialLinks: { icon: IconDefinition; url: string }[] = [
    { icon: faLinkedinIn, url: "https://www.linkedin.com/in/sushant-khadka-b2131b2a2/" },
    { icon: faGithub, url: "https://github.com/sushantkhadka23" },
    { icon: faFacebook, url: "https://www.facebook.com/ksushant23" },
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300 p-1 border border-transparent"
        >
          <FontAwesomeIcon icon={social.icon} size="lg" />
        </a>
      ))}
    </div>
  );
};

export default Footer;
