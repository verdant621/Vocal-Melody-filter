const express = require('express')
const router = express.Router()
const result = require("../controllers/result")
router.route("/").post(result)

module.exports = router;