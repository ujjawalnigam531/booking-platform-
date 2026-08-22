const ImageKit =require('imageKit')

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

 async function uploadImage(fileBuffer, fileName) {
  try {
  ]  const result = await imagekit.upload({
        file: fileBuffer,        
        fileName: fileName,
        folder: "/turf-images"
    })
    return result
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
}
module.exports=uploadImage