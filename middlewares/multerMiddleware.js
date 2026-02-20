const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // This is the folder where images will be saved
        callback(null, './uploads'); 
    },
    filename: (req, file, callback) => {
        // Creates a unique filename: image-1737584000-poster.jpg
        const filename = `image-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(new Error("Only .png, .jpg, .jpeg format allowed!"));
    }
};

const multerConfig = multer({
    storage,
    fileFilter
});

module.exports = multerConfig;