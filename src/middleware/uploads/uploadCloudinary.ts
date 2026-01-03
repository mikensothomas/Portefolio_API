// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../../config/cloudinary";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async () => ({
//     folder: "portfolio",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   }),
// });

// const uploadCloudinary = multer({ storage });

// export default uploadCloudinary;
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "portfolio",
    format: "png",
  }),
});

const uploadCloudinary = multer({ storage });

export default uploadCloudinary;