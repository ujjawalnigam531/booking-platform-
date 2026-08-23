const ImageKit = require('imagekit')   

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

 async function uploadImage(fileBuffer, fileName) {
  try {
    const result1 = await imagekit.upload({
        file: fileBuffer,        
        fileName: fileName,
        folder: "/turf-images"
    })
    return result1
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
}
module.exports=uploadImage