import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => { 
  const [theme, setTheme] = useState<string>('light');
 
  useEffect(()=> {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button onClick={toggleTheme} style={styles.button}>
      {theme==="dark" ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default ThemeToggle;
