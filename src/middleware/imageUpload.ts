// import multer from "multer";
const multer  = require('multer')
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req:any, file:any, cb:any) => {
        //http://localhost:3500/image-1690201269894-402971147.jpg
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);        
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const fileFilter = (req: any, file: any, cb: any) => {
    // Check if the file is an image
    //http://localhost:3500/image-1690201269894-402971147.jpg
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const imageUpload = multer({ storage, fileFilter });
export { imageUpload }