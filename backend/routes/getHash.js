const express = require('express')
const router = express.Router()
const getHash = require("../controllers/getHash")
router.route("/").post(getHash)

module.exports = router;