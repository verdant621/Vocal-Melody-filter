const { exec } = require('child_process');
const path = require('path');

const getHash = (req, res) => {
  exec(`curl -X GET "https://www.mvsep.com/api/separation/get?hash=${req.body.hash}"`, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ "Message": err })
    }
    temp = JSON.parse(stdout);
    console.log(temp);
    if (temp.status == "done") {
      return res.status(200).json({ "Message": "Separation Successfully!", "input_file": temp.data.input_file, "files": temp.data.files });
    }
    else if (temp.status) {
      return res.status(200).json({ "Message": temp.status });
    }
    else {
      return res.status(200).json({ "Message": "Separating!!!" });
    }
  });
};

module.exports = getHash;