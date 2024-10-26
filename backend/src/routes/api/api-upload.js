import express from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs";

// Get an instance of multer. Files will be uploaded to the "temp" folder.
const upload = multer({ dest: "temp" });

const router = express.Router();

/**
 * On a POST to "/api/uploads", as multipart/form-data, multer will read the uploaded file
 */
router.post("/", upload.single("image-file"), async (req, res) => {
  try {
  console.log(req.file.originalname);

  console.log(req.file.path);

  // create a custom file name for our newly uploaded file, and move it into the public/images folder.
  const originalname = req.file.originalname;

  const fileExtension = originalname.substring(originalname.lastIndexOf("."));
  const newFileName = uuid() + fileExtension;


  // Move the file using fs package. We can do this using rename operations
  fs.renameSync(req.file.path, `public/images/articles/${newFileName}`);

  // Now let's send req.body.message and the path of the image back to the browser, as JSON.
  const response = {
    message: req.body.message,
    imageUrl: `/articles/${newFileName}` // Remember not to include "public" since that part will be ignored in the URL.
  };

  return res.json(response);
  } catch (error) {
    console.error("error", error);

    return res.status(400).json({ error: "file uploade error" });
  }
});

export default router;
