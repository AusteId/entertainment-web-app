export const MovieInfo = ({ movie }) => {
  return (
    <>
      <div className='flex flex-col gap-1'>
        <div className='relative'>
          <img
            className='rounded-lg'
            src={movie.thumbnail.regular.medium}
            alt={movie.title}
          />
          <div className='w-10 h-10 rounded-full bg-white bg-opacity-50 absolute cursor-pointer p-2 top-2 right-2'>
            ❌
          </div>
          <div className='w-10 h-10 rounded-full bg-red bg-opacity-50 absolute cursor-pointer p-2 top-2 left-2'>
            ✏️
          </div>
        </div>

        <h2 className='heading-md'>{movie.title}</h2>
        <p className='body-sm'>
          <span>{movie.rating}</span> <span>{movie.year}</span>
        </p>
      </div>
    </>
  );
};
