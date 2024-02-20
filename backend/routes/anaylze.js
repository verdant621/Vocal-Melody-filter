const express = require('express')
const router = express.Router()
const multer = require('multer');
const analyze = require("../controllers/analyze")
// define the multer object

const analyzefile = multer({
})

router.route("/").post(analyzefile.single('file'), analyze)

module.exports = router;