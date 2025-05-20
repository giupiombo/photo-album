import React, { useState } from 'react';
import { LuSun, LuMoon } from 'react-icons/lu';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark((prev) => !prev);
  };

  return (
    <div className="absolute top-4 right-20 z-50">
      <button
        onClick={toggleDark}
        className="w-16 h-9 flex items-center px-1 bg-lightBgSecondary dark:bg-darkBgSecondary rounded-full transition-colors duration-300"
        aria-label="Toggle dark mode"
      >
        <div
          className={`w-7 h-7 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300
          ${
            isDark
              ? 'translate-x-7 bg-yellow-400 text-black'
              : 'translate-x-0 bg-white text-yellow-500'
          }`}
        >
          {isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
