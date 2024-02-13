import React, { useEffect, useState } from 'react';
import Post from '../Post';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/post');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const fetchedPosts = await response.json();
        setPosts(fetchedPosts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Display an error message
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} {...post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </>
  );
}
