const express = require("express");
const router = express.Router();
//upload image 
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const blobService = require("../services/blob.service");

//just save to disk upload/
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
}).single("image");


router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      console.log(req.file);
      res.status(200).json({ path: req.file.filename });
    }
  });
});

module.exports = router;