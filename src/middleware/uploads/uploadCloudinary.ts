import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: require("../../config/cloudinary").default,
  params: async (req, file) => ({
    folder: "portfolio",
    resource_type: "image",
    transformation: [{ quality: "auto", fetch_format: "auto" }]
  })

});

const uploadCloudinary = multer({ storage });

export default uploadCloudinary;