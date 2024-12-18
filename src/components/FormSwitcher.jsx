import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

export const FormSwitcher = () => {
  const formLogin = localStorage.getItem('formLogin');

  const [login, setLogin] = useState(formLogin === 'false' ? false : true);

  const selectLogin = () => {
    localStorage.setItem('formLogin', 'false');
    setLogin(false);
  };

  const selectSignIn = () => {
    localStorage.setItem('formLogin', 'true');
    setLogin(true);
  };

  return (
    <div>
      {login ? (
        <div className="flex flex-col items-center mt-10 gap-20">
          <LoginForm onSignUp={selectLogin} />
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10 gap-20">
          <SignUpForm onLogin={selectSignIn} />
        </div>
      )}
    </div>
  );
};
