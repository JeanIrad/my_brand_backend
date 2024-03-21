import path from "path";
import mimetype from "mime-types";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    // callBack(null, path.resolve(__dirname, "../uploads/blogs"));
    callBack(null, "../uploads/blogs");
  },
  filename: function (req, file, callBack) {
    callBack(null, `_${Date.now()}_${file.originalname}`);
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
export default upload;
