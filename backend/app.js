const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

function clearUploadsDirectory() {
  const directory = 'uploads';

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}

clearUploadsDirectory();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Use the uploadsDir variable
  },
  filename: function (req, file, cb) {
    // Use the original file name, but prepend a unique identifier (like a timestamp)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
const app = express();
app.use(express.json());
app.use(cors());


app.post('/upload/text', (req, res) => {
  const sampleImagePath = '/Users/ezraapple/Projects/clip_search/backend/assets/robot.png';
  const filename = path.basename(sampleImagePath);


  fs.readFile(sampleImagePath, (err, data) => {
    if (err) {
      console.error('Error reading image file:', err);
      return res.status(500).send('Error reading image file');
    }

    const base64Image = new Buffer.from(data).toString('base64');
    const imageData = `data:image/png;base64,${base64Image}`;

    res.json({
      fileName: filename,
      imageData: imageData,
    });
  });
});

app.post('/upload/image', (req, res) => {
  const sampleImagePath = '/Users/ezraapple/Projects/clip_search/backend/assets/react.png';
  const filename = path.basename(sampleImagePath);

  fs.readFile(sampleImagePath, (err, data) => {
    if (err) {
      console.error('Error reading image file:', err);
      return res.status(500).send('Error reading image file');
    }

    const base64Image = Buffer.from(data).toString('base64');
    const imageData = `data:image/png;base64,${base64Image}`;

    res.json({
      fileName: filename,
      imageData: imageData,
    });
  });
});


app.post('/upload/directory', upload.array('files[]'), (req, res) => {
  const files = req.files;
  console.log(`${files.length} files received.`);
  // Respond to the client
  res.send({ message: `${files.length} files uploaded successfully.` });
});


const port = process.env.PORT || 3000; // Use the environment's port or 3000 if not specified
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});