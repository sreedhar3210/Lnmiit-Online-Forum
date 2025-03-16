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
        const uploadResult = await cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'Lnm-Profile-Pictures' },
            (error, result) => {
                if (error) {
                    console.error('Upload failed:', error);
                    return res.status(500).json({ success: false, error: 'Upload failed' });
                }
                console.log('Upload successful:', result);
                return res.status(200).json({ success: true, imageUrl: result.secure_url });
            }
        ).end(req.file.buffer); // Correctly handle the buffer

    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ success: false, error: 'Unexpected error occurred' });
    }
};


// const localFilePath = './tmpImg.png';
// const publicId = 'my-local-image';

module.exports = { handleFileUpload, uploadFile };