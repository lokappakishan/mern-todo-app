// LoginRegisterForm

import { useState } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';

interface LoginRegisterFormProps {
  fetchAuthStatus: () => void;
}

const LoginRegisterForm = ({ fetchAuthStatus }: LoginRegisterFormProps) => {
  const [toggleLoginRegister, setToggleLoginRegister] = useState<boolean>(true);

  return (
    <div
      className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10"
      data-theme="light"
    >
      <div className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-xl overflow-y-auto max-h-[90vh]">
        <div className="space-y-4">
          <div>
            {toggleLoginRegister ? (
              <LoginForm fetchAuthStatus={fetchAuthStatus} />
            ) : (
              <RegisterForm onSwitchToLogin={setToggleLoginRegister} />
            )}
          </div>
          <button
            type="button"
            onClick={() => setToggleLoginRegister(!toggleLoginRegister)}
            className="btn btn-outline btn-primary w-full"
          >
            {toggleLoginRegister ? 'to register form' : ' to login form'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
