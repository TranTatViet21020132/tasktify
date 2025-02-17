import { useContext } from 'react';
import { ThemeContext } from '@/hooks/useDarkMode';
import {
  Sun,
  Moon,
} from 'lucide-react';

const ThemeSwitcher = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeSwitcher must be used within a ThemeProvider');
  }

  const { theme, setTheme } = themeContext;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div onClick={toggleTheme} className='flex w-fit items-center justify-center cursor-pointer'>
      {theme === 'light' ? 
        <Sun className='text-yellow-500 w-5 aspect-square'/>
       : 
        <Moon className='text-white w-5 aspect-square'/>}
    </div>

  );
};

export default ThemeSwitcher;