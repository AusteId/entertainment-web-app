import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiGetMovieCategoriesAndRatings } from '../../api/movies';
import { ImageInput } from './ImageInput';
import { ImageCropper } from './ImageCropper';

export const Modal = ({ open, onClose, onYes, movie }) => {
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [isTrending, setIsTrending] = useState(false);
  const [image, setImage] = useState('');
  const [currentPage, setCurrentPage] = useState('choose-img');
  const [imgAfterCrop, setImgAfterCrop] = useState('');

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
    console.log(formData);
  }

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setCurrentPage('crop-img');
  };

  const onCropDone = (imgCroppedArea) => {};

  const onCropCancel = () => {};

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
        className={`bg-darkBlue rounded-xl shadow p-3 transition-all text-lg z-50 min-w-md ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
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
            <label htmlFor='title' className='heading-xs'>
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
            <label htmlFor='category' className='heading-xs'>
              Category
            </label>
            <select
              className='bg-darkBlue body-sm'
              {...register('category', { required: 'Please select category' })}
            >
              <option value={''}>--select category--</option>
              {categories.map((category) => (
                <option value={category}>{category}</option>
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
            <label htmlFor='title' className='heading-xs'>
              Release year
            </label>
            <input
              className='bg-darkBlue body-sm'
              id='year'
              type='number'
              placeholder='Movie title'
              {...register('year', {
                required: 'Please select movie year',
                min: 1935,
                max: 2024,
                value: new Date().getFullYear(),
              })}
            />
          </div>
          {/* Trending */}
          <div className='flex gap-4 items-center'>
            <label htmlFor='title' className='heading-xs'>
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
            <label htmlFor='rating' className='heading-xs'>
              Rating
            </label>
            <select
              className='bg-darkBlue body-sm'
              {...register('rating', { required: 'Please select rating' })}
            >
              <option value={''}>--select rating--</option>
              {ratings.map((rating) => (
                <option value={rating}>{rating}</option>
              ))}
            </select>
            {errors.rating && (
              <span role='alert' className='text-red body-sm'>
                {errors.rating.message}
              </span>
            )}
          </div>
          {isTrending && (
            <>
              <div>
                <input type='file' accept='image/*' aria-label='Upload image' />
              </div>
            </>
          )}
          {/* Image cropper */}
          <div>
            <p>Recommended poster size 940x460</p>{' '}
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
                <div>opa</div>
              )}
            </div>
          </div>

          {/* End image cropper */}
          <div className='flex gap-3 items-center justify-center mt-3'>
            <button
              type='submit'
              className='text-white bg-lightBlue rounded-lg hover:bg-white hover:text-lightBlue'
            >
              Save
            </button>
            <button
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
