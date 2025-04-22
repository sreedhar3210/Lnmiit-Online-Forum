const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env') });
const cloudSecretAPI = process.env.CLOUDINARY_SECRET_API;
const { mongoUpsertProfilePicture } = require('../mongoDB_services/mongoUserActions');

// Configure Cloudinary once at the beginning of your application
cloudinary.config({
  cloud_name: 'dxckxdilt',
  api_key: '293167285667292',
  api_secret: cloudSecretAPI
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleFileUpload = upload.single('image');

const uploadFile = async (req, res, callbackFunc) => {
		//const userId = req.body.userId;

    try {
        const uploadResult = await cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'Lnm-Profile-Pictures' },
            async(error, result) => {
                if (error) {
                    console.error('Upload failed:', error);
                    callbackFunc({ success: false, error: 'Upload failed', status: 500});
                }

                callbackFunc({ success: true, imageUrl: result.secure_url, status: 200 });
            }
        ).end(req.file.buffer); // Correctly handle the buffer

    } catch (error) {
        console.error('Unexpected error:', error);
        callbackFunc({ success: false, error: 'Unexpected error occurred', status: 500 });
    }
};


// const localFilePath = './tmpImg.png';
// const publicId = 'my-local-image';

module.exports = { handleFileUpload, uploadFile };