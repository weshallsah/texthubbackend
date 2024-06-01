import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/media');
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + Math.round(Math.random * 1E9);
        cb(null, file.fieldname + '-' + name + '-' + file.originalname);
    }
});

export const upload = multer({ storage: storage });