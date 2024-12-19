import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  apiAddNewMovie,
  apiGetMovieCategoriesAndRatings,
} from '../../api/movies';
import { ImageInput } from './ImageInput';
import { ImageCropper } from './ImageCropper';
import { resizeBase64Image } from '../../utils/base64Resize';

export const Modal = ({ open, onClose, onSave }) => {
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [image, setImage] = useState('');
  const [currentPage, setCurrentPage] = useState('choose-img');
  const [imgAfterCrop, setImgAfterCrop] = useState('');
  const [noImageError, setNoImageError] = useState('');

  //********* thumbnails */
  const [trendingLarge, setTrendingLarge] = useState('');
  const [trendingSmall, setTrendingSmall] = useState('');
  const [regularLarge, setRegularLarge] = useState('');
  const [regularMedium, setRegularMedium] = useState('');
  const [regularSmall, setRegularSmall] = useState('');
  //****************** */

  useEffect(() => {
    getCategoriesAndRatings();
  }, []);

  async function getCategoriesAndRatings() {
    const res = await apiGetMovieCategoriesAndRatings();
    setCategories(res.categories);
    setRatings(res.ratings);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      year: new Date().getFullYear(),
      category: '',
      isTrending: '',
      rating: '',
    },
  });

  async function handleSave(formData) {
    if (!imgAfterCrop) {
      setNoImageError('Please select a poster image');
      return null;
    }
    const movie = {
      title: formData.title,
      thumbnail: {
        trending: {
          small: trendingSmall,
          large: trendingLarge,
        },
        regular: {
          small: regularSmall,
          medium: regularMedium,
          large: regularLarge,
        },
      },
      year: formData.year,
      category: formData.category,
      rating: formData.rating,
      isBookmarked: false,
      isTrending: formData.isTrending,
      bookmarks: [],
    };

    const res = await apiAddNewMovie(movie);
    onSave(res.id);
    onClose();
  }

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);

    setCurrentPage('crop-img');
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasEl = document.createElement('canvas');

    canvasEl.width = 550;
    canvasEl.height = 350;

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

      setImgAfterCrop(dataURL);
      setNoImageError('');
      setCurrentPage('img-cropped');
    };
  };

  const onCropCancel = () => {
    setCurrentPage('choose-img');
    setImage('');
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
            <h2 className='heading-md'>Add New Movie</h2>
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
              {...register('title', {
                required: 'Please enter movie title',
                maxLength: {
                  value: 50,
                  message: 'Movie title should not exceed 50 characters length',
                },
                pattern: {
                  value: /^[0-9a-zA-ZÀ-ž:'\s]+$/,
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
              className='bg-darkBlue heading-xs w-20'
              id='year'
              type='number'
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
                      onClick={() => {
                        setCurrentPage('choose-img');
                        setImage('');
                      }}
                      className='p-2 cursor-pointer hover:text-red heading-xs'
                    >
                      Change Image
                    </p>
                    <p
                      onClick={() => setCurrentPage('crop-img')}
                      className='p-2 cursor-pointer hover:text-red heading-xs'
                    >
                      Crop again
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* End image cropper */}
          <div className='flex gap-3 items-center justify-center mt-3'>
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
