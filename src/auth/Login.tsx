import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import appwriteService from '../services/AppwriteService';
import { useUser } from '../contexts/UserContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { dispatch } = useUser();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      dispatch({ type: 'LOGIN' });
      navigate('/user');
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await appwriteService.login(email, password);
      localStorage.setItem('isLoggedIn', 'true'); 
      dispatch({ type: 'LOGIN' });
      navigate('/user');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-inconsolata px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 bg-opacity-50 z-50">
            <CircularProgress />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Login</h1>
        {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 font-semibold dark:font-semibold dark:bg-gray-700 text-white p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
            disabled={loading}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
