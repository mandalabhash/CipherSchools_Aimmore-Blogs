import React, { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function register(ev) {
    ev.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Registration successful');
      } else {
        const errorMessage = await response.json(); // Assuming the server sends a JSON error message
        throw new Error(errorMessage || 'Registration failed');
      }
    } catch (error) {
      setError(error.message);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
