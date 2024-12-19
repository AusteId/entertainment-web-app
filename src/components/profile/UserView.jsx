import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

import avatar from '/assets/avatar.png';
import { ImageInput } from './ImageInput';
import { apiUpdateUser } from '../../api/users';

export const UserView = ({ user }) => {
  const [currUser, setCurrUser] = useState(user);
  const [userImage, setUserImage] = useState('');
  const [currentPage, setCurrentPage] = useState('choose-img');
  const inputRef = useRef();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: currUser.username,
      email: currUser.email,
    },
  });

  const onSubmit = async (formData) => {
    const userData = { username: formData.username };
    const res = await apiUpdateUser(currUser.id, userData);
    if (!res.error) {
      setCurrUser({ ...currUser, username: res.username });
      toast.success('User data updated successfully!');
    }
  };

  const onImageSelected = (selectedImg) => {
    setUserImage(selectedImg);

    setCurrentPage('crop-img');
  };

  const handleImageClick = (imgSelected) => {
    inputRef.current.click();
  };

  return (
    <div className='px-2 md:px-3 lg:px-4'>
      <div className='flex flex-col md:flex-row items-center justify-between lg:mt-5'>
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
          <div className='my-5 flex items-center justify-center'></div>
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
                <span className='text-sm text-right text-red' role='alert'>
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

            <button className='rounded-xl text-md hover:bg-lightBlue shadow-md'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
