import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

export const FormSwitcher = () => {
  const [login, setLogin] = useState(true);

  return (
    <div>
      {login ? (
        <div className='flex flex-col items-center mt-10 gap-20'>
          <LoginForm onSignUp={() => setLogin(false)} />
        </div>
      ) : (
        <div className='flex flex-col items-center mt-10 gap-20'>
          <SignUpForm onLogin={() => setLogin(true)} />
        </div>
      )}
    </div>
  );
};
