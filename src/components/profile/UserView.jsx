import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

import { apiUpdateUser } from '../../api/users';

import avatar from '/avatar.png';
import { AvatarCropper } from './AvatarCropper';

export const UserView = ({ user }) => {
  const [currUser, setCurrUser] = useState(user);
  const [userImage, setUserImage] = useState('');
  const [currentPage, setCurrentPage] = useState('choose-img');
  const [cropped, setCropped] = useState('');
  const [userDataChanged, setUserDataChanged] = useState(false);
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
    const userData = { username: formData.username, avatar: cropped };
    const res = await apiUpdateUser(currUser.id, userData);
    if (!res.error) {
      setCurrUser({ ...currUser, username: res.username, avatar: cropped });
      setUserDataChanged(false);
      toast.success('User data updated successfully!');
    }
  };

  const onImageSelected = (selectedImg) => {
    setUserImage(selectedImg);
    setCurrentPage('crop-img');
  };

  const handleOnChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function (e) {
        onImageSelected(reader.result);
      };
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasEl = document.createElement('canvas');

    canvasEl.width = 250;
    canvasEl.height = 250;

    const context = canvasEl.getContext('2d');

    let imageObj1 = new Image();
    imageObj1.src = userImage;

    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        canvasEl.width,
        canvasEl.height
      );
      const dataURL = canvasEl.toDataURL('image/jpeg', 1);
      //trending large

      setCropped(dataURL);
      setUserDataChanged(true);
      setCurrentPage('choose-img');
    };
  };

  const onCropCancel = () => {
    setCurrentPage('choose-img');
    setUserImage('');
  };

  const handleUsernameChange = (e) => {
    if (currUser.username === e.target.value) {
      setUserDataChanged(false);
    } else {
      setUserDataChanged(true);
    }
  };

  return (
    <div className="px-2 md:px-3 lg:px-4">
      <div className="flex flex-col md:flex-row items-center justify-between lg:mt-5">
        <h1 className="heading-lg">Hello, {currUser.username}</h1>
        {currUser.role === 'ADMIN' && (
          <Link to={'/admin'}>
            <h2 className="heading-xs border border-lightBlue hover:bg-dark text-red py-2 px-4 rounded-xl bg-darkBlue">
              Admin Panel
            </h2>
          </Link>
        )}
      </div>
      <div className="heading-md max-w-md mx-auto p-4 border border-lightBlue rounded-xl mt-5">
        <div className="flex flex-col items-center justify-center">
          <input
            id="hiddenInputAvatar"
            className="invisible w-0"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleOnChange}
          />
          <img
            className="rounded-full w-60 cursor-pointer"
            src={`${
              cropped ? cropped : currUser.avatar ? currUser.avatar : avatar
            }`}
            alt={currUser.email}
            onClick={handleImageClick}
          />
          {currentPage === 'crop-img' && (
            <AvatarCropper
              image={userImage}
              onCropDone={onCropDone}
              onCropCancel={onCropCancel}
            />
          )}
        </div>
        <form 
        className="mr-20 text-bm"
        noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5 flex items-center justify-center"></div>
          <div className="flex flex-col gap-4 items-center">
            {/* Username ******************************************/}
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-9 items-center gap-2">
                <div className="col-span-3 justify-self-end">
                  <label className="text-sm opacity-70" htmlFor="username">
                    Username
                  </label>
                </div>
                <div className="col-span-6">
                  <input
                    className="w-full p-2 rounded-lg border border-white border-opacity-50 bg-darkBlue"
                    // aria-invalid={errors.username ? 'true' : 'false'}
                    type="text"
                    id="username"
                    onKeyUp={handleUsernameChange}
                    autoComplete="off"
                    {...register('username', {
                      required: 'Username field cannot be empty',
                    })}
                  />
                </div>
              </div>
              {errors.username && (
                <span className="text-sm text-right text-red" role="alert">
                  {errors.username.message}
                </span>
              )}
            </div>
            {/* Email ******************************************/}
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-9 items-center gap-2">
                <div className="col-span-3 justify-self-end">
                  <label className="text-sm opacity-70" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="col-span-6">
                  <input
                    disabled
                    className="w-full p-2 rounded-lg border border-white border-opacity-50 bg-darkBlue opacity-50"
                    type="text"
                    id="email"
                    autoComplete="on"
                    {...register('email')}
                  />
                </div>
              </div>
            </div>

            <button
              className={`${
                userDataChanged ? 'visible' : 'invisible'
              } rounded-xl text-md hover:bg-lightBlue shadow-md`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
