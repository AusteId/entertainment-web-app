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
    <div>
      <input
        className='invisible'
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleOnChange}
      />
      <button type='button' onClick={onChooseImage} className='rounded-lg'>
        Choose Image
      </button>
    </div>
  );
};
