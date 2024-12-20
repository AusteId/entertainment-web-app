import { useState } from 'react';
import Cropper from 'react-easy-crop';

export const AvatarCropper = ({ image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className='z-50'>
      <div>
        <Cropper
          image={image}
          aspect={1 / 1}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: '100%',
              height: '38%',
              backgroundColor: '#fff',
            },
          }}
        />
      </div>
      <div className='absolute left-0 right-0 bottom-96 my-auto mx-auto flex gap-2 justify-center mt-5'>
        <button
          className='rounded-lg hover:bg-white hover:text-dark heading-xs'
          onClick={() => {
            onCropDone(croppedArea);
          }}
          type='button'
        >
          Crop
        </button>
        <button
          className='rounded-lg hover:bg-white hover:text-dark heading-xs'
          type='button'
          onClick={onCropCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
