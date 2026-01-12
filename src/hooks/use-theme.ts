import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem('theme');
    const initialDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(initialDark);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (typeof window === 'undefined') return;
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return { isDark, toggleTheme };
}
