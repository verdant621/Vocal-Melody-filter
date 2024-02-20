const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const colors = require("colors");
const connectDB = require("./config/db");
const uploadRoute = require('./routes/upload');
const separateRoute = require('./routes/separate');
const getHashRoute = require('./routes/getHash');
const resultRoute = require('./routes/result');
const analyzeRoute = require('./routes/anaylze');

connectDB();
const app = express();
app.use(morgan('common'))
app.use(express.json());
//---------- route ----------

app.use("/api/upload", uploadRoute);
app.use("/api/separate", separateRoute);
app.use("/api/getHash", getHashRoute);
app.use("/api/result", resultRoute);
app.use('/api/analyze', analyzeRoute);

//------- deployment --------
const PORT = process.env.PORT;
const server = app.listen(
    PORT, '0.0.0.0', console.log(`Server running on PORT : ${PORT}...`.yellow.bold)
);
