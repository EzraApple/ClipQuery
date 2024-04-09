const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const { indexUploadedImages } = require('./scripts/indexUploads');
const { textQuery } = require('./scripts/textQuery')
const { imageQuery } = require('./scripts/imageQuery')

async function clearDirectory(directory) {
  try {
    const files = await fs.readdir(directory);
    const unlinkPromises = files.map(file => fs.unlink(path.join(directory, file)));
    await Promise.all(unlinkPromises);
  } catch (err) {
    console.error(`Error clearing directory ${directory}:`, err);
    throw err; // Or handle it more gracefully depending on your application's needs
  }
}

// Use async IIFE (Immediately Invoked Function Expression) for top-level await
(async () => {
  await clearDirectory("uploads");
  await clearDirectory("index");
  await clearDirectory("temp")

})();

// Strorage for uploaded directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // cb(null, uniqueSuffix + '-' + file.originalname);
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });
const tempImagePath = path.join(__dirname, 'temp');
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());


app.post('/upload/text', (req, res) => {
  const query = req.body.query;
  textQuery(query, async (error, filenames) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Failed to process query.');
    }
    const filenamesArray = Object.values(filenames);

    try {
      const imagesData = await Promise.all(filenamesArray.map(async (filename) => {
        const imagePath = path.join('uploads', filename);
        const data = await fs.readFile(imagePath);

        const base64Image = Buffer.from(data).toString('base64');
        const imageData = `data:image/png;base64,${base64Image}`;

        return {
          fileName: filename,
          imageData: imageData,
        };
      }));
      res.json(imagesData);
    } catch (err) {
      console.error('Error processing images:', err);
      res.status(500).send('Error processing images');
    }
  });
});

app.post('/upload/image', async (req, res) => {
    const { image } = req.body;
    if (!image) {
        return res.status(400).send('No image data provided.');
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    try {
        const fileName = `query-${Date.now()}.png`;
        const filePath = path.join(tempImagePath, fileName);

        await fs.writeFile(filePath, buffer);
        console.log(`Saved image to ${filePath}`);

        // Perform the image query
        imageQuery(filePath, async (error, filenames) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Failed to process image query.');
            }
            const filenamesArray = Object.values(filenames);
            try {
              const imagesData = await Promise.all(filenamesArray.map(async (filename) => {
                const imagePath = path.join('uploads', filename);
                const data = await fs.readFile(imagePath);
                const base64Image = Buffer.from(data).toString('base64');
                const imageData = `data:image/png;base64,${base64Image}`;
                return {
                  fileName: filename,
                  imageData: imageData,
                };
              }));
              res.json(imagesData);
            } catch (err) {
              console.error('Error processing images:', err);
              res.status(500).send('Error processing images');
            }
            // Optionally delete the temporary image file
            try {
                await fs.unlink(filePath);
                console.log(`Deleted temporary file: ${filePath}`);
            } catch (deleteError) {
                console.error(`Error deleting temporary file: ${deleteError}`);
            }
        });
    } catch (err) {
        console.error('Failed to process image data:', err);
        res.status(500).send('Failed to process image data');
    }
});

app.post('/upload/directory', upload.array('files[]'), (req, res) => {
  const files = req.files;
  console.log(`${files.length} files received.`);
  indexUploadedImages();
  console.log(`${files.length} files indexed.`);
  // Respond to the client
  res.send({ message: `${files.length} files uploaded successfully.` });
});


const port = process.env.PORT || 3000; // Use the environment's port or 3000 if not specified
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});