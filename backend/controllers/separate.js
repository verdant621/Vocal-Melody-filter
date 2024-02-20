const AWS = require('aws-sdk');
const asyncHandler = require("express-async-handler");
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION
});
const s3 = new AWS.S3();

const separate = asyncHandler(async (req, res) => {
  try {
    const { file_name, originalname, output } = req.body;

    // Define the file_path to save the S3 object
    const file_path = `./${file_name}${path.extname(originalname)}`;

    // Create a writable stream to save the S3 object
    const writeStream = fs.createWriteStream(file_path);

    // Download the file from S3 and save it locally
    const downloadFile = s3.getObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${file_name}${path.extname(originalname)}`
    }).createReadStream().pipe(writeStream);

    downloadFile.on('error', (err) => {
      console.error(err);
      return res.status(200).json({ "Message": "Error!" });
    });

    downloadFile.on('close', () => {
      console.log('File downloaded successfully');

      // Execute the separation command using child process
      exec(`curl -X POST -H "Content-Type: multipart/form-data" -F "audiofile=@${file_path}" -F "api_token=${process.env.API_TOKEN}" -F "sep_type=${process.env.MODEL_TYPE}" -F "add_opt1=${process.env.add_opt1}" -F "output_format=${output}" -F "is_demo=1" ${process.env.SEPARATE_URL}`, (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ "Message": err });
        }

        const result = JSON.parse(stdout);

        if (result.data.link) {
          fs.unlink(file_path, (error) => {
            if (error) {
              console.error('Error deleting file:', error);
            }
            console.log('File deleted successfully');
            return res.status(200).json({ "Message": "Separation Successful!", "data": result.data });
          });
        } else {
          return res.status(500).json({ "Message": result.data });
        }
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "Message": error.message });
  }
});

module.exports = separate;