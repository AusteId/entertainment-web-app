import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  apiAddNewMovie,
  apiGetMovieCategoriesAndRatings,
} from '../../api/movies';
import { ImageInput } from './ImageInput';
import { ImageCropper } from './ImageCropper';

export const Modal = ({ open, onClose, onSave, movie }) => {
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [image, setImage] = useState('');
  const [currentPage, setCurrentPage] = useState('choose-img');
  const [imgAfterCrop, setImgAfterCrop] = useState('');
  const [noImageError, setNoImageError] = useState('');

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
      title: movie?.title,
      year: movie?.year,
      category: movie?.category,
      isTrending: movie?.isTrending,
      rating: movie?.rating,
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
          small: imgAfterCrop,
          large: imgAfterCrop,
        },
        regular: {
          small: imgAfterCrop,
          medium: imgAfterCrop,
          large: imgAfterCrop,
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

    canvasEl.width = 720; //imgCroppedArea.width;
    canvasEl.height = 440; //imgCroppedArea.height;

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
      //context.scale(22, 14);
      const dataURL = canvasEl.toDataURL('image/jpeg', 1);
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
            <label htmlFor='title' className='heading-xs text-opacity-50'>
              Title
            </label>
            <input
              className='w-full rounded-lg p-1 bg-darkBlue body-sm'
              id='title'
              type='text'
              placeholder='Movie title'
              {...register('title', {
                required: 'Please enter movie title',
                maxLength: 50,
                pattern: {
                  value: /[a-zA-Z0-9À-ž\s]/i,
                  message:
                    'Movie title can only contain alphanumeric characters',
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
          <div className='flex flex-col gap-1'>
            <label htmlFor='category' className='heading-xs text-opacity-50'>
              Category
            </label>
            <select
              id='category'
              className='bg-darkBlue body-sm'
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
            <label htmlFor='year' className='heading-xs text-opacity-50'>
              Release year
            </label>
            <input
              className='bg-darkBlue body-sm'
              id='year'
              type='number'
              {...register('year', {
                required: 'Please select movie year',
                min: 1935,
                max: new Date().getFullYear(),
                value: new Date().getFullYear(),
              })}
            />
          </div>
          {/* Trending */}
          <div className='flex gap-4 items-center'>
            <label htmlFor='isTrending' className='heading-xs text-opacity-50'>
              Is trending?
            </label>
            <input
              type='checkbox'
              id='isTrending'
              {...register('isTrending')}
            />
          </div>
          {/* Movie rating */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='rating' className='heading-xs text-opacity-50'>
              Rating
            </label>
            <select
              id='rating'
              className='bg-darkBlue body-sm'
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
                      className='p-2 cursor-pointer hover:text-red'
                    >
                      Change Image
                    </p>
                    <p
                      onClick={() => setCurrentPage('crop-img')}
                      className='p-2 cursor-pointer hover:text-red'
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
              className='text-white bg-lightBlue rounded-lg hover:bg-white hover:text-lightBlue'
            >
              Save
            </button>
            <button
              disabled={currentPage === 'crop-img'}
              type='button'
              onClick={onClose}
              className='bg-red text-white rounded-lg hover:bg-white hover:text-red'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
