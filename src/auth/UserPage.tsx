import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import appwriteService from '../services/AppwriteService';
import { useUser } from '../contexts/UserContext';

const UserPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { dispatch } = useUser();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        navigate('/login');
        return;
      }
      try {
        const userData = await appwriteService.account.get();
        setUser(userData);
        dispatch({ type: 'LOGIN' });
      } catch (err) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await appwriteService.logout();
    localStorage.removeItem('isLoggedIn');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
    setLogoutLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-inconsolata">
        <CircularProgress style={{ color: 'gray' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-inconsolata">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-8 sm:p-10 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome back,{user?.name}</h1>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-800 dark:bg-gray-50 text-white dark:text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-gray-700 dark:hover:bg-gray-200"
                disabled={logoutLoading}
              >
                {logoutLoading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
          <div className="px-6 py-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">User Information</h2>
                <p className="text-gray-600 dark:text-gray-300">Email: {user?.email}</p>
                <p className="text-gray-600 dark:text-gray-300">ID: {user?.id}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Activity</h2>
                <p className="text-gray-600 dark:text-gray-300">No recent activity to display.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;