import { useRef } from 'react';

export const ImageInput = ({ onImageSelected }) => {
  const inputRef = useRef();

  const handleOnChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function (e) {
        onImageSelected(reader.result);
      };
    }
  };

  const onChooseImage = () => {
    inputRef.current.click();
  };

  return (
    <div className='w-full flex justify-between'>
      <input
        id='hiddenInput'
        className='invisible w-1/3'
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleOnChange}
      />
      <button
        type='button'
        onClick={onChooseImage}
        className='rounded-lg heading-xs hover:bg-white hover:text-dark'
      >
        Choose Image
      </button>
      <input id='empty' className='invisible w-1/3' disabled />
    </div>
  );
};
