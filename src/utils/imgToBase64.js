export const imgToBase64 = async (localImagePath) => {
  try {
    const res = await fetch(localImagePath);
    const blob = await res.blob();

    return blob;
  } catch (e) {
    return { error: e };
  }
};
