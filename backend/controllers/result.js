const asyncHandler = require("express-async-handler");
const { exec } = require("child_process");
const path = require("path");
const fs = require('fs');
const directory = './downloads';

const result = asyncHandler(async (req, res) => {
  try {
    // Check if the directory exists
    if (fs.existsSync(directory)) {
      // Delete the directory and its contents
      fs.readdirSync(directory).forEach(file => {
        const filePath = path.join(directory, file);
        fs.unlinkSync(filePath);
      });
      fs.rmdirSync(directory);
      console.log('Download Directory deleted');
    }

    // Create the directory
    fs.mkdirSync(directory);
    console.log('Download Directory created');

    const targetname = req.body.targetname.replace(" ", "");
    const filePath = path.join(directory, targetname);

    exec(`curl -o ${filePath} ${req.body.url}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ "Message": err });
      } else {
        console.log("Download success");
        res.sendFile(filePath);
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "Message": error });
  }
});

module.exports = result;