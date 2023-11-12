// src/features/auth/Login.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext} from '../../contexts/UserContext.jsx';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any existing errors

    if (!username || !password) {
      setErrorMessage('Username and password are required.');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Response is not 2xx
        const errorData = await response.json();
        setErrorMessage(errorData.message || `Error: ${response.status}`);
        console.error('Login failed:', errorData.message || response.status);
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log('Login successful:', data);
      setUser({username: data.username});
      navigate('/game'); // Redirect to the game page
    } catch (error) {
      setErrorMessage('Failed to login. Please check your username and password.');
      console.error('There was an error:', error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
    <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default Login;
