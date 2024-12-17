import { useState } from 'react';
import Cropper from 'react-easy-crop';

export const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div>
      <div>
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: '100%',
              height: '70%',
              backgroundColor: '#fff',
            },
          }}
        />
      </div>
      <button
        className='rounded-lg'
        onClick={() => {
          onCropDone(croppedArea);
        }}
        type='button'
      >
        Crop
      </button>{' '}
      <button className='rounded-lg' type='button' onClick={onCropCancel}>
        Cancel
      </button>
    </div>
  );
};
