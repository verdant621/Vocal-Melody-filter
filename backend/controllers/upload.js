const AWS = require('aws-sdk');
const asyncHandler = require("express-async-handler");
const path = require("path");
const File = require("./../model/FIle");

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
});

const s3 = new AWS.S3();

const upload = asyncHandler(async (req, res) => {
    try {
        const { originalname, mimetype, size, buffer } = req.file;
        // Create entry in database with file details
        const file = await File.create({
            originalname,
            mimetype,
            size
        });

        // Set S3 object parameters
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${file._id}${path.extname(originalname)}`,
            Body: buffer
        };

        // Upload file to S3 bucket
        // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
        // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
        s3.upload(params, (err, data) => {
            if (err) {
                console.log('Error:', err);
                res.sendStatus(500);
            } else {
                console.log('File uploaded successfully:', data.Location);
                res.status(200).json({ "Message": "Uploaded Successfully", "data": file });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ "Message": "DB Error" });
    }
});

module.exports = upload;