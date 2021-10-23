
const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename(req, file, cb) {
    const date = moment().format("DDMMYYYY-HHmmss");
    cb(null, `${date}-${file.originalname}`);
  },
});

const allowedTypes = ["audio/mpeg", "audio/mp4", "audio/wav","audio/aac","audio/ogg"]

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


module.exports = multer({ storage, fileFilter });
