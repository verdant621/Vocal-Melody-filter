const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalname: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;