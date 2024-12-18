import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

export const UserView = ({ user }) => {
  const [currUser, setCurrUser] = useState(user);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: currUser.username,
      email: currUser.email,
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <div className='px-2 md:px-3 lg:px-4'>
      <div className='flex flex-col md:flex-row items-center justify-between'>
        <h1 className='heading-lg'>Hello, {currUser.username}</h1>
        {currUser.role === 'ADMIN' && (
          <Link to={'/admin'}>
            <h2 className='heading-lg text-red py-2 px-4 rounded-xl bg-darkBlue'>
              Admin Panel
            </h2>
          </Link>
        )}
      </div>
      <div className='heading-md max-w-md mx-auto'>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className='text-center my-5'>
              You can change your username and password
            </h2>
          </div>
          <div className='flex flex-col gap-4 items-center'>
            {/* Username ******************************************/}
            <div className='flex flex-col gap-2'>
              <div className='grid grid-cols-9 items-center gap-2'>
                <div className='col-span-3 justify-self-end'>
                  <label className='text-sm opacity-70' htmlFor='username'>
                    Username
                  </label>
                </div>
                <div className='col-span-6'>
                  <input
                    className='w-full p-2 rounded-lg border border-white border-opacity-50 bg-darkBlue'
                    aria-invalid={errors.username ? 'true' : 'false'}
                    type='text'
                    id='username'
                    autoComplete='off'
                    {...register('username', {
                      required: 'Username field cannot be empty',
                    })}
                  />
                </div>
              </div>
              {errors.username && (
                <span className='text-sm text-right text-rose-500' role='alert'>
                  {errors.username.message}
                </span>
              )}
            </div>
            {/* Email ******************************************/}
            <div className='flex flex-col gap-2'>
              <div className='grid grid-cols-9 items-center gap-2'>
                <div className='col-span-3 justify-self-end'>
                  <label className='text-sm opacity-70' htmlFor='email'>
                    Email
                  </label>
                </div>
                <div className='col-span-6'>
                  <input
                    disabled
                    className='w-full p-2 rounded-lg border border-white border-opacity-50 bg-darkBlue opacity-50'
                    type='text'
                    id='email'
                    autoComplete='on'
                    {...register('email')}
                  />
                </div>
              </div>
            </div>
            {/* Old Password ******************************************/}
            <div className='flex flex-col gap-2'>
              <div className='grid grid-cols-9 items-center gap-2'>
                <div className='col-span-3 justify-self-end'>
                  <label className='text-sm opacity-70' htmlFor='oldPassword'>
                    Old password
                  </label>
                </div>
                <div className='col-span-6'>
                  <input
                    className='w-full p-2 rounded-lg border border-white border-opacity-50 bg-darkBlue'
                    aria-invalid={errors.oldPassword ? 'true' : 'false'}
                    type='password'
                    id='oldPassword'
                    autoComplete='off'
                    placeholder='**********'
                    {...register('oldPassword', {
                      required: 'Username field cannot be empty',
                    })}
                  />
                </div>
              </div>
              {errors.oldPassword && (
                <span className='text-sm text-right text-rose-500' role='alert'>
                  {errors.oldPassword.message}
                </span>
              )}
            </div>
            {/* New Password ******************************************/}
            <div className='flex flex-col gap-2'>
              <div className='grid grid-cols-9 items-center gap-2'>
                <div className='col-span-3 justify-self-end'>
                  <label className='text-sm opacity-70' htmlFor='newPassword'>
                    New password
                  </label>
                </div>
                <div className='col-span-6'>
                  <input
                    className='w-full p-2 rounded-lg border border-white border-opacity-50 bg-darkBlue'
                    aria-invalid={errors.newPassword ? 'true' : 'false'}
                    type='text'
                    id='newPassword'
                    autoComplete='off'
                    placeholder='**********'
                    {...register('newPassword', {
                      required: 'Username field cannot be empty',
                    })}
                  />
                </div>
              </div>
              {errors.newPassword && (
                <span className='text-sm text-right text-rose-500' role='alert'>
                  {errors.newPassword.message}
                </span>
              )}
            </div>
            {/* Repeat password ******************************************/}
            <div className='flex flex-col gap-2'>
              <div className='grid grid-cols-9 items-center gap-2'>
                <div className='col-span-3 justify-self-end'>
                  <label
                    className='text-sm opacity-70'
                    htmlFor='repeatPassword'
                  >
                    Repeat password
                  </label>
                </div>
                <div className='col-span-6'>
                  <input
                    className='w-full p-2 rounded-lg border border-white border-opacity-50 bg-darkBlue'
                    aria-invalid={errors.repeatPassword ? 'true' : 'false'}
                    type='text'
                    id='repeatPassword'
                    autoComplete='off'
                    placeholder='**********'
                    {...register('repeatPassword', {
                      required: 'Username field cannot be empty',
                    })}
                  />
                </div>
              </div>
              {errors.repeatPassword && (
                <span className='text-sm text-right text-rose-500' role='alert'>
                  {errors.repeatPassword.message}
                </span>
              )}
            </div>
            <button className='rounded-xl text-md hover:bg-lightBlue shadow-md'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
