import path from "path";
import mimetype from "mime-types";
import multer from "multer";
import fs from "fs";

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    const dir = "../uploads/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callBack(null, dir);
  },
  filename: function (req, file, callBack) {
    callBack(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
    // callBack(null, `_${Date.now()}_${file.originalname}`);
  },
});
const filterFile = (req: any, file: any, callBack: Function) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    callBack(null, true);
  } else {
    callBack({ message: "unsupported file format" }, false);
  }
};
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: filterFile,
});
// console.log(__dirname);
export default upload;
