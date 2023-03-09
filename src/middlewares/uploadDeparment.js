import multer, { diskStorage } from 'multer';

// Configura el almacenamiento de archivos de Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './src/uploads/department');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

/* // Define el tipo de archivo que se acepta
const fileFilter = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Solo se permiten archivos de imagen'));
    }
    cb(null, true);
  }
}); */

const upload = multer({ storage: storage/* , fileFilter: fileFilter  */}).array('fotos', 5)

export default {upload};