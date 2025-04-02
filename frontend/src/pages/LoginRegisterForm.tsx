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
    <div>
      <h2>LoginRegisterForm</h2>
      <div>
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
        >
          {toggleLoginRegister ? 'to register form' : ' to login form'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
