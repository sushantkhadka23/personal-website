import React from 'react';
import { NavLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <main className="flex flex-col justify-center items-center w-full bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-8 md:px-16 font-inconsolata">
      <section className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
          Well Hello There!
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
          Looks like you’ve stumbled upon my little corner of the web—welcome! I’m Sushant, and  I’m absolutely hooked on all things tech. <br />It’s like a never-ending adventure where each new discovery opens up more possibilities. Right now, I’m diving headfirst into mobile app development, with Flutter as my trusty sidekick. Technology is a vast ocean, and I’m joyfully paddling through it, discovering new wonders and liberating my inner geek at every turn.
        </p>
      </section>

      <section className="flex flex-col md:flex-row justify-center items-center mb-12 space-y-4 md:space-y-0 md:space-x-6">
            <NavLink to={'/contact'} 
                className="bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-colors duration-300"
             >
              Say Hello?
            </NavLink>
          
      </section>

      <section className="w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">A Bit About Me</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          When I’m not busy geeking out over the latest tech trends, you’ll find me crafting mobile apps with Flutter. I thrive on learning new things and finding creative solutions to problems. My journey through the tech world is like exploring a massive, exciting universe, and I’m here for every thrilling twist and turn.
        </p>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Contact Info</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Phone: +977 9862036112</p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Email: iamsushantkhadka754@gmail.com</p>
        <p className="text-gray-600 dark:text-gray-300">Location: Jhapa, Nepal</p>
      </section>
    </main>
  );
};

export default Home;
