export function editBase64(base64, width, height) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const resizedBase64 = canvas.toDataURL('image/jpeg');
      resolve(resizedBase64);
    };

    img.onerror = (error) => reject(error);
    img.src = base64;
  });
}
