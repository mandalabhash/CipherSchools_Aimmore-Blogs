import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:4000/profile', {
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
        } else {
          // Handle error if fetch fails
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        // Handle other errors
        console.error('An error occurred while fetching user profile', error);
      }
    };

    fetchProfile();
  }, [setUserInfo]);

  const username = userInfo?.username;

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
      });

      setUserInfo(null);
    } catch (error) {
      // Handle error if logout fails
      console.error('Failed to logout', error);
    }
  };

  return (
    <header>
      <Link to="/" className="logo">
        Aimmore Blogs
      </Link>
      <nav>
        {username ? (
          <>
            <span className='welcome-user'>Welcome, {username} !</span>
            <Link to="/create"className='create-post'>+ New Blog</Link>
            
            <button onClick={handleLogout}>Logout </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
