// pages/AuthPage

import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoHome from './TodoHome';
import LoginRegisterForm from './LoginRegisterForm';

const AuthPage = () => {
  const [checkAuthStatus, setCheckAuthStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAuthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        'http://localhost:5001/api/auth/check-auth',
        { withCredentials: true }
      );
      setCheckAuthStatus(response.data.authenticated);
    } catch (err) {
      console.error('fetchAuthStatus failed:', err);
      setCheckAuthStatus(false); // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <div>
        {' '}
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {checkAuthStatus ? (
          <TodoHome />
        ) : (
          <LoginRegisterForm fetchAuthStatus={fetchAuthStatus} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
