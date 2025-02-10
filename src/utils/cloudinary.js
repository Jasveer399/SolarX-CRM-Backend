import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded on cloudinary: ", response.url);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const uploadLocal = async (file, directory = "uploads") => {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", directory);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(directory, fileName);
    const fullPath = path.join(process.cwd(), "public", filePath);

    // Move file from temp to uploads directory
    fs.copyFileSync(file.path, fullPath);
    fs.unlinkSync(file.path); // Remove temp file

    // Return the URL path that can be used to access the file
    return `${process.env.BACKEND_URL}/${filePath.replace(/\\/g, "/")}`;
  } catch (error) {
    console.error("Error in uploadLocal:", error);
    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    return null;
  }
};

export { uploadOnCloudinary, uploadLocal };
