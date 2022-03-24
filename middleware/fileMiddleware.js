
const multer = require("multer");
const moment = require("moment");
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log('FILE EXISTs:' , fs.existsSync(__dirname,'..','..','public','uploads/'));
    if(!fs.existsSync(path.resolve(__dirname,'..','public/uploads'))){
      fs.mkdirSync(path.resolve(__dirname,'..','public','uploads'));
    }
    cb(null, "public/uploads");
  },
  filename(req, file, cb) {
    const date = moment().format("DDMMYYYY-HHmmss");
    cb(null, `${date}-${file.originalname}`);
  },
});

const allowedTypes = ["image/png", "image/jpeg", "image/jpg","audio/mpeg", "audio/mp4", "audio/wav","audio/aac","audio/ogg"];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


module.exports = multer({ storage, fileFilter });
