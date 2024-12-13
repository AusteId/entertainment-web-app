import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/shared/Button';
import { useUserContext } from '../service/UserContextProvider';

import '../styles/LoginForm.css';
import { apiLoginUser } from '../api/users';

import logo from '/assets/logo.svg';

export const LoginForm = ({ onSignUp }) => {
  const userData = useUserContext();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (formData) => {
    try {
      const userId = await apiLoginUser(formData);
      if (userId.error) {
        setError(userId.error);
      } else {
        userData.setUserLoggedIn(userId.id);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <div className='flex justify-center'>
        <img
          src={logo}
          alt='logo'
          className='pt-[3rem] md:pt-[5.5rem] lg:pt-[4.9rem] xl:pt[4.9rem]'
        />
      </div>
      <div className='box'>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className='text'>
            {error && !errors.email && !errors.password && (
              <p className='text_center'>{error}</p>
            )}
          </div>
          <h1>Login</h1>
          <div className={`input_box ${errors.password ? 'error' : ''}`}>
            <input
              id='email'
              type='email'
              autoComplete='on'
              placeholder='Email address'
              className='form_text focus:outline-none focus:!border-white'
              {...register('email', {
                required: "Can't be empty",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className='error_message'>{errors.email.message}</p>
            )}
          </div>
          <div className={`input_box ${errors.password ? 'error' : ''}`}>
            <input
              id='password'
              type='password'
              autoComplete='off'
              placeholder='Password'
              className='form_text focus:outline-none focus:!border-white'
              {...register('password', {
                required: "Can't be empty",
              })}
            />
            {errors.password && (
              <p className='error_message'>{errors.password.message}</p>
            )}
          </div>
          <div className='w-full flex justify-center mb-5'>
            <Button type={'submit'}>Login to your account</Button>
          </div>

          <div
            onClick={onSignUp}
            className='inline-block text-center pb-[2rem] cursor-pointer w-full'
          >
            <p className='text-white text-bm font-outfit font-medium'>
              Don't have an account?
              <span className='text-red pl-[0.5rem] font-outfit font-medium'>
                <a href='#'>Sign Up</a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

{
  /* <button type='button' onClick={onSignUp} className='singup w-full'>
            Don't have an account? <span className='signup_link'>Sign Up</span>
          </button> */
}
