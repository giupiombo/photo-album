import React, { useEffect, useState } from 'react';
import { LuSun, LuMoon } from 'react-icons/lu';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  // Load theme from localStorage on initial mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark =
      storedTheme === 'dark' ||
      (!storedTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', prefersDark);
    setIsDark(prefersDark);
  }, []);

  const toggleDark = () => {
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    setIsDark(newTheme === 'dark');
  };

  return (
    <div className="absolute top-4 right-4 sm:right-10 lg:right-20 z-50">
      <button
        onClick={toggleDark}
        className="w-16 h-9 flex items-center px-1 bg-lightBgSecondary dark:bg-darkBgSecondary rounded-full transition-colors duration-300"
        aria-label="Toggle dark mode"
      >
        <div
          className={`w-7 h-7 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300
          ${
            isDark
              ? 'translate-x-7 bg-pinkColor text-black'
              : 'translate-x-0 bg-white text-pinkColor'
          }`}
        >
          {isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
