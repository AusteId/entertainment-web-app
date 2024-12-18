import { IoMdClose } from 'react-icons/io';

export const ModalYesNo = ({ open, onClose, onYes, movie }) => {
  const handleConfirm = () => {
    onYes();
    onClose();
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
        className={`bg-darkBlue rounded-xl shadow p-3 transition-all text-lg z-50 max-w-sm ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <div className='flex gap-5 items-center'>
          <h1 className='heading-md'>
            Do you really want to delete movie "{movie.title}"?
          </h1>
          <img
            className='w-[200px] rounded-lg'
            src={movie.thumbnail.regular.small}
            alt={movie.title}
          />
        </div>

        <div className='flex gap-3 items-center justify-center mt-3'>
          <button
            onClick={handleConfirm}
            className='rounded-xl bg-red text-white hover:text-red hover:bg-white'
          >
            Sure!
          </button>
          <button
            onClick={onClose}
            className='rounded-xl bg-lightBlue text-white hover:bg-darkBlue'
          >
            Oh no, Jesus Christ!
          </button>
        </div>
      </div>
    </div>
  );
};
