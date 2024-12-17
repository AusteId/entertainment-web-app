import { useState } from 'react';
import Cropper from 'react-easy-crop';

export const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div>
      <div>
        <Cropper
          image={image}
          aspect={11 / 7}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: '100%',
              height: '58%',
              backgroundColor: '#fff',
            },
          }}
        />
      </div>
      <div className='flex gap-2 justify-center'>
        <button
          className='rounded-lg hover:bg-white hover:text-dark'
          onClick={() => {
            onCropDone(croppedArea);
          }}
          type='button'
        >
          Crop
        </button>
        <button
          className='rounded-lg hover:bg-white hover:text-dark'
          type='button'
          onClick={onCropCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
