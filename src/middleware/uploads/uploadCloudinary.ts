import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: require("../../config/cloudinary").default,
  params: async () => ({
    folder: "portfolio",
    format: "png",
  }),
});

const uploadCloudinary = multer({ storage });

export default uploadCloudinary;