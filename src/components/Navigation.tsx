import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>
          HOME
        </Link> 
      </div>
      <div style={styles.toggleContainer}>
        <ThemeToggle />  
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem', 
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none', 
    fontSize: '1rem',
  },
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default Navigation;
