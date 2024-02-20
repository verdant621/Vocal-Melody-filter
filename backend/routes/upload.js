const express = require('express')
const router = express.Router()
const multer = require('multer');
const upload = require("./../controllers/upload")
// define the multer object

const uploadfile = multer({ })

router.route("/").post(uploadfile.single('file'), upload)

module.exports = router;