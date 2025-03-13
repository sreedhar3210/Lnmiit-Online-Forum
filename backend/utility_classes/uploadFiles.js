const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env') });
const cloudSecretAPI = process.env.CLOUDINARY_SECRET_API;

// Configure Cloudinary once at the beginning of your application
cloudinary.config({
  cloud_name: 'dxckxdilt',
  api_key: '293167285667292',
  api_secret: cloudSecretAPI
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleFileUpload = upload.single('image');

const uploadFile = async (req, res) => {
	console.log('>>>> 1. secret api is ', cloudSecretAPI);
	console.log('>>>> in uploadFiles.js files is ', req.file);
  	try {
   		const uploadResult = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
    	  	resource_type: 'image',
      		folder: 'Lnm-Profile-Pictures',
    	});
    	console.log('Upload successful:', uploadResult);
    	return uploadResult;
  	} catch (error) {
	    console.error('Upload failed:', error);
	    return null;
  	}
};

// const localFilePath = './tmpImg.png';
// const publicId = 'my-local-image';

module.exports = { handleFileUpload, uploadFile };