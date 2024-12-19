export function resizeBase64Image(
  base64Image,
  imgCroppedArea,
  width,
  height,
  callback
) {
  // image objektas
  const img = new Image();

  // canvas uzpildom image
  img.onload = () => {
    // norimas drobes dydis
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // uzpildom pagal naudotojo apkirkima
    ctx.drawImage(
      img,
      imgCroppedArea.x,
      imgCroppedArea.y,
      imgCroppedArea.width,
      imgCroppedArea.height,
      0,
      0,
      width,
      height
    );

    // drobe -> base64
    const resizedBase64 = canvas.toDataURL();

    // va ir callback
    callback(resizedBase64);
  };

  // uz onload ribu
  img.src = base64Image;
}
