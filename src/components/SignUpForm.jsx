import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { getByEmail } from '../api/get';
import { addUser } from '../api/post';
import { generateHash } from '../utils/passwordHash';
import Button from './shared/Button';
import logo from '/assets/logo.svg';

const SignUpForm = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();
  const [users, setUsers] = useState([]);
  const [error, setErrorMessage] = useState('');

  const checkIfEmailExists = async (data) => {
    const email = data.email;
    const isUserExist = await getByEmail(email);
    if (isUserExist && isUserExist.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkIfPasswordsMatch = (data) => {
    return data.password === data.repeatPassword;
  };

  const formSubmitHandler = async (data) => {
    try {
      const isEmailExist = await checkIfEmailExists(data);
      if (isEmailExist) {
        setError('email', {
          type: 'manual',
          message: 'This email already exists',
        });
        setErrorMessage('This email already exists');
      } else if (!checkIfPasswordsMatch(data)) {
        setError('repeatPassword', {
          type: 'manual',
          message: 'Passwords do not match',
        });
        setErrorMessage('Passwords do not match');
      } else {
        const { repeatPassword, ...userData } = data;
        const hashedPassword = await generateHash(data.password);
        const newUser = { ...userData, password: hashedPassword };
        await addUser(newUser);
        setUsers((prev) => [...prev, newUser]);
        reset();
        setErrorMessage('');
        onLogin();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className='flex justify-center'>
        <img
          src={logo}
          alt='logo'
          className='pt-[3rem] pb-[3.65rem] md:pt-[5.5rem] md:pb-[4.53rem] lg:pt-[4.9rem]lg:pb-[5.19rem] xl:pt[4.9rem]'
        />
      </div>
      <div className=' flex justify-center /*min-h-screen items-center*/'>
        <section className='grid border rounded-[1.25rem] bg-darkBlue w-[20.4375rem] min-h-[26.25rem] md:w-[25rem] md:min-h-[26.125rem]'>
          <h1 className='text-white font-medium text-hl font-outfit pt-[2rem] pl-[2rem] pb-[2.5rem]'>
            Sign Up
          </h1>
          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            className='flex flex-col'
            noValidate
          >
            <div className='px-[1.5rem] pb-[1.5rem] md:px-[2rem] relative'>
              <input
                type='email'
                placeholder='Email address'
                className={`text-bm bg-darkBlue border-b ${
                  errors.email ? 'border-red' : 'border-lightBlue'
                } placeholder:font-outfit placeholder:font-light placeholder:text-bm w-full md:w-[21rem]
                        h-[2.3125rem] pl-[1rem] placeholder:leading-[1.5] py-[0.25rem] pb-[1.12rem] caret-red text-white focus:outline-none focus:border-white hover:cursor-pointer`}
                {...register('email', {
                  required: "Can't be empty",
                  pattern: {
                    value:
                      /^(?=.{1,254}$)(?=.{1,64}@)(?!\.)(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]{1,253}\.[A-Za-z]{2,}$/,
                    message: 'Invalid email address',
                  }
                })}
              />
              <p
                className={`font-outfit text-bs text-red ${
                  errors.email?.message.includes('empty')
                    ? 'absolute top-0 right-[3.06rem]'
                    : 'pt-1'
                } font-medium whitespace-nowrap`}
              >
                {errors.email?.message}
              </p>
            </div>
            <div className='px-[1.5rem] pb-[1.5rem] md:px-[2rem] relative'>
              <input
                type='password'
                placeholder='Password'
                className={`text-bm bg-darkBlue border-b ${
                  errors.password ? 'border-red' : 'border-lightBlue'
                } w-full placeholder:font-outfit placeholder:font-light placeholder:text-bm h-[2.3125rem] pl-[1rem] pb-[1.12rem] caret-red text-white focus:outline-none focus:border-white hover:cursor-pointer`}
                {...register('password', {
                  required: "Can't be empty",
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?!.*\u200B)(?!.*\u200C)(?!.*\u200D)(?!.*\uFEFF).{8,}$/,
                    message:
                      'Password must contain both uppercase and lowercase letters',
                  },
                })}
              />
              <p
                className={`font-outfit text-bs text-red ${
                  errors.password?.message.includes('empty')
                    ? 'absolute top-0 right-[3.06rem]'
                    : 'pt-1 text-[0.9rem] text-wrap'
                } font-medium whitespace-nowrap`}
              >
                {errors.password?.message}
              </p>
            </div>
            <div className='px-[1.5rem] pb-[1.5rem] md:px-[2rem] relative'>
              <input
                type='password'
                placeholder='Repeat password'
                className={`text-bm bg-darkBlue border-b ${
                  errors.repeatPassword ? 'border-red' : 'border-lightBlue'
                } w-full placeholder:font-outfit placeholder:font-light placeholder:text-bm h-[2.3125rem] pl-[1rem] pb-[1.12rem] caret-red text-white focus:outline-none focus:border-white hover:cursor-pointer`}
                {...register('repeatPassword', {
                  required: "Can't be empty",
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?!.*\u200B)(?!.*\u200C)(?!.*\u200D)(?!.*\uFEFF).{8,}$/,
                    message:
                      'Password must contain both uppercase and lowercase letters',
                  },
                })}
              />
              <p
                className={`font-outfit text-bs text-red ${
                  errors.repeatPassword?.message.includes('empty')
                    ? 'absolute top-0 right-[3.06rem]'
                    : 'pt-1 text-[0.9rem] text-wrap'
                } font-medium whitespace-nowrap`}
              >
                {errors.repeatPassword?.message}
              </p>
            </div>
            <div className='pb-[1.5rem] px-[1.5rem] text-center'>
              <Button type={'submit'}>Create an account</Button>
            </div>
          </form>
          <div
            onClick={onLogin}
            className='inline-block text-center pb-[2rem] cursor-pointer'
          >
            <p className='text-white text-bm font-outfit font-medium'>
              Already have an account?
              <span className='text-red pl-[0.5rem] font-outfit font-medium'>
                <a href='#'>Login</a>
              </span>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignUpForm;
