const multer = require('multer');
const path = require('path');

const uploadFile = (fileField) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      const name=req.params.nameFile
      cb(null, name+ path.extname(file.originalname));
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: '10000000' },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|pdf/;
      const mimeType = fileTypes.test(file.mimetype);
      const ext = fileTypes.test(path.extname(file.originalname));
      if (mimeType && ext) {
        return cb(null, true);
      }
      cb('Invalid File Format');
    },
  });

  return upload.single(fileField);
};

module.exports = uploadFile;
