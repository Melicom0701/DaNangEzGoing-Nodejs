
const uploadImage = async (file) => {
  try {
    const result = await blobService.uploadImage(file);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}