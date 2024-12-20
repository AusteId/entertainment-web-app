import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  apiGetMovieCategoriesAndRatings,
  apiUpdateMovie,
} from '../../api/movies';
import { ImageInput } from './ImageInput';
import { ImageCropper } from './ImageCropper';
import { resizeBase64Image } from '../../utils/base64Resize';
import { imgToBase64 } from '../../utils/imgToBase64';
import { editBase64 } from '../../utils/editBase64';

export const EditModal = ({ open, onClose, onSave, movie }) => {
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [image, setImage] = useState('');
  const [currentPage, setCurrentPage] = useState('img-cropped');
  const [imgAfterCrop, setImgAfterCrop] = useState('');
  const [noImageError, setNoImageError] = useState('');

  //********* thumbnails */
  const [trendingLarge, setTrendingLarge] = useState('');
  const [trendingSmall, setTrendingSmall] = useState('');
  const [regularLarge, setRegularLarge] = useState('');
  const [regularMedium, setRegularMedium] = useState('');
  const [regularSmall, setRegularSmall] = useState('');
  //****************** */

  const setImageValue = () => {
    if (!movie.thumbnail.regular.medium.includes('medium.jpg')) {
      setImgAfterCrop(movie.thumbnail.regular.medium);
      setImage(movie.thumbnail.regular.medium);
      setTrendingLarge(movie.thumbnail.trending.large);
      setTrendingSmall(movie.thumbnail.trending.small);
      setRegularLarge(movie.thumbnail.regular.large);
      setRegularMedium(movie.thumbnail.regular.medium);
      setRegularSmall(movie.thumbnail.regular.small);
    }
  };

  useEffect(() => {
    if (movie.thumbnail.regular.large.includes('large.jpg')) {
      getLocalImage(movie.thumbnail.regular.large);
    }
    getCategoriesAndRatings();
    setImageValue();
  }, []);

  async function getLocalImage(localImage) {
    const res = await imgToBase64(localImage);
    if (!res.error) {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = function (e) {
        // trending large
        editBase64(reader.result, 940, 460).then((resized) =>
          setTrendingLarge(resized)
        );
        // trending small
        editBase64(reader.result, 480, 280).then((resized) =>
          setTrendingSmall(resized)
        );
        // regular large
        editBase64(reader.result, 560, 348).then((resized) =>
          setRegularLarge(resized)
        );
        // regular medium
        editBase64(reader.result, 440, 280).then((resized) =>
          setRegularMedium(resized)
        );
        // regular small
        editBase64(reader.result, 328, 220).then((resized) =>
          setRegularSmall(resized)
        );
        setImage(reader.result);
        setImgAfterCrop(reader.result);
      };
    }
  }

  async function getCategoriesAndRatings() {
    const res = await apiGetMovieCategoriesAndRatings();
    setCategories(res.categories);
    setRatings(res.ratings);
    setValue('title', movie.title);
    setValue('rating', movie.rating);
    setValue('category', movie.category);
    setValue('isTrending', movie.isTrending);
    setValue('year', movie.year);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  async function handleSave(formData) {
    if (!imgAfterCrop) {
      setNoImageError('Please select a poster image');
      return null;
    }

    const movieToPatch = {
      title: formData.title,
      thumbnail: {
        trending: {
          small: trendingSmall,
          large: trendingLarge,
        },
        regular: {
          small: regularLarge,
          medium: regularMedium,
          large: regularSmall,
        },
      },
      year: formData.year,
      category: formData.category,
      rating: formData.rating,
      isTrending: formData.isTrending,
    };

    const res = await apiUpdateMovie(movieToPatch, movie.id);

    if (res.error) {
      console.log(res.error);
    } else {
      onSave(res.id);
      onClose();
    }
  }

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setCurrentPage('crop-img');
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasEl = document.createElement('canvas');

    canvasEl.width = 720;
    canvasEl.height = 440;

    const context = canvasEl.getContext('2d');

    let imageObj1 = new Image();
    imageObj1.src = image;
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
      setImgAfterCrop(dataURL);

      //trending large
      resizeBase64Image(image, imgCroppedArea, 940, 460, (resizedBase64) => {
        setTrendingLarge(resizedBase64);
      });
      // trending small 480x280
      resizeBase64Image(image, imgCroppedArea, 480, 280, (resizedBase64) => {
        setTrendingSmall(resizedBase64);
      });
      // regular large 560x348
      resizeBase64Image(image, imgCroppedArea, 560, 348, (resizedBase64) => {
        setRegularLarge(resizedBase64);
      });
      // regular medium
      resizeBase64Image(image, imgCroppedArea, 440, 280, (resizedBase64) => {
        setRegularMedium(resizedBase64);
      });

      // regular small 328x220
      resizeBase64Image(image, imgCroppedArea, 328, 220, (resizedBase64) => {
        setRegularSmall(resizedBase64);
      });

      setNoImageError('');
      setCurrentPage('img-cropped');
    };
  };

  const onCropCancel = () => {
    setCurrentPage('choose-img');
    setImage('');
  };

  const handleChangeImage = () => {
    setCurrentPage('choose-img');
    setImage('');
    setImgAfterCrop('');
  };

  return (
    /** overlejus */
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-40 ${
        open ? 'visible bg-dark/50' : 'invisible'
      }`}
      onClick={onClose}
    >
      {/* langas */}
      <div
        // reikia sustabdyti is tevo
        // paveldeta onclik funkcija
        onClick={(e) => e.stopPropagation()}
        className={`bg-darkBlue rounded-xl shadow p-3 transition-all text-lg z-50 min-w-md`}
      >
        <form
          noValidate
          onSubmit={handleSubmit(handleSave)}
          className='body-sm flex flex-col gap-3 max-w-md w-full'
        >
          <div>
            <h2 className='heading-md'>Edit Movie</h2>
          </div>
          {/* Movie title */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='title' className='body-md text-opacity-50'>
              Title
            </label>
            <input
              className='w-full rounded-lg p-1 bg-darkBlue heading-xs'
              id='title'
              type='text'
              placeholder='Movie title'
              autoComplete='off'
              {...register('title', {
                required: 'Please enter movie title',
                maxLength: {
                  value: 50,
                  message: 'Movie title should not exceed 50 characters length',
                },
                pattern: {
                  value: /^[0-9a-zA-ZÀ-ž'-:\s]+$/,
                  message: 'Movie title can contain alphanumeric characters',
                },
              })}
            />
            {errors.title && (
              <span role='alert' className='text-red body-sm'>
                {errors.title.message}
              </span>
            )}
          </div>
          {/* Movie category */}
          <div className='flex gap-2'>
            <label htmlFor='category' className='body-md text-opacity-50'>
              Category
            </label>
            <select
              id='category'
              className='bg-darkBlue heading-xs'
              {...register('category', { required: 'Please select category' })}
            >
              <option value={''}>--select category--</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <span role='alert' className='text-red body-sm'>
                {errors.category.message}
              </span>
            )}
          </div>
          {/* Movie year */}
          <div className='flex gap-4'>
            <label htmlFor='year' className='body-md text-opacity-50'>
              Release year
            </label>
            <input
              className='bg-darkBlue heading-xs'
              id='year'
              type='number'
              placeholder='Movie title'
              {...register('year', {
                required: 'Please select movie year',
                min: {
                  value: 1935,
                  message: "Don't upload movies from silent film era",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: "Don't upload movies from future",
                },
                value: new Date().getFullYear(),
              })}
            />
            {errors.year && (
              <span role='alert' className='text-red body-sm'>
                {errors.year.message}
              </span>
            )}
          </div>
          {/* Trending */}
          <div className='flex gap-4 items-center'>
            <label htmlFor='isTrending' className='body-md text-opacity-50'>
              Is trending?
            </label>
            <input
              type='checkbox'
              id='isTrending'
              {...register('isTrending')}
            />
          </div>
          {/* Movie rating */}
          <div className='flex gap-3'>
            <label htmlFor='rating' className='body-md text-opacity-50'>
              Rating
            </label>
            <select
              id='rating'
              className='bg-darkBlue heading-xs'
              {...register('rating', { required: 'Please select rating' })}
            >
              <option value={''}>--select rating--</option>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
            {errors.rating && (
              <span role='alert' className='text-red body-sm'>
                {errors.rating.message}
              </span>
            )}
          </div>

          {/* Image cropper */}
          <div>
            <p className='body-sm text-red py-2 text-center'>
              Recommended poster size 940x460
            </p>
            {noImageError && <p className='body-md text-red'>{noImageError}</p>}
            <div className='w-full h-[80%] flex items-center justify-center'>
              {currentPage === 'choose-img' ? (
                <ImageInput onImageSelected={onImageSelected} />
              ) : currentPage === 'crop-img' ? (
                <ImageCropper
                  image={image}
                  onCropDone={onCropDone}
                  onCropCancel={onCropCancel}
                />
              ) : (
                <div className='flex flex-col gap-2'>
                  <img src={imgAfterCrop} alt='cropped' />
                  <div className='flex gap-2 justify-center'>
                    <p
                      onClick={handleChangeImage}
                      className='p-2 cursor-pointer hover:text-red heading-xs'
                    >
                      Change Image
                    </p>
                    <p
                      onClick={() => setCurrentPage('crop-img')}
                      className='p-2 cursor-pointer hover:text-red heading-xs'
                    >
                      Crop
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* End image cropper */}
          <div
            className={`${
              currentPage === 'crop-img' ? 'invisible' : 'visible'
            } flex gap-3 items-center justify-center mt-3`}
          >
            <button
              disabled={currentPage === 'crop-img'}
              type='submit'
              className='text-white heading-xs bg-lightBlue rounded-lg hover:bg-white hover:text-dark'
            >
              Save
            </button>
            <button
              disabled={currentPage === 'crop-img'}
              type='button'
              onClick={onClose}
              className='bg-red heading-xs text-white rounded-lg hover:bg-white hover:text-red'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
