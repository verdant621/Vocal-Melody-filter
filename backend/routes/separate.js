const express = require('express')
const router = express.Router()
const separate = require("../controllers/separate")
router.route("/").post(separate)

module.exports = router;