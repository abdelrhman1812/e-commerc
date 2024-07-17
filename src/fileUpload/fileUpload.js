import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

// General file upload configuration
const fileUpload = (folderName) => {
    // Storage configuration
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            // Define the uploads directory
            cb(null, `uploads/${folderName}`);
        },
        filename: (req, file, cb) => {
            // Generate a unique filename
            const filename = uuidv4() + "_" + file.originalname;
            cb(null, filename);
        }
    });

    // File filter to accept only images
    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    };

    // Upload middleware configuration
    const upload = multer({
        storage,
        fileFilter,
        limits: { fileSize: 1024 * 1024 * 5 }
    });

    return upload;
};

// Single file upload middleware
const uploadSingleFile = (fieldName, folderName) => {
    return fileUpload(folderName).single(fieldName);
};

// Multiple files upload middleware
const uploadMixOfFile = (arrayOfFilds, folderName) => {
    return fileUpload(folderName).fields(arrayOfFilds);
};

export { uploadMixOfFile, uploadSingleFile };
