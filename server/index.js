require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer();

const db = require('../database/index');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();
app.use(express.json());

app.get('/reviewGetTest', (req, res) => {
  db.getAll()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/reviewPostTest', (req, res) => {
  // console.log(req.body, 'req body');
  // write reviews into reviews
  const params = [
    req.body.product_id,
    req.body.rating,
    Number(req.body.date),
    req.body.summary,
    req.body.body,
    req.body.recommend,
    req.body.name,
    req.body.email,
  ];
  // write photos into photos
  // const params = [req.body]
  db.post(params)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// Endpoint for uploading images
app.post('/upload', upload.array('images', 5), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) => new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(file.buffer);
    }));

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.url);
    res.json({ urls: imageUrls });
  } catch (error) {
    res.status(500).send('Error uploading images');
  }
});

app.use(express.static(path.join(__dirname, '../dist')));
// other configuration...

app.post('/uploadrev', upload.array('images', 5), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) => new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(file.buffer);
    }));

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.url);
    res.json({ urls: imageUrls });
  } catch (error) {
    res.status(500).send('Error uploading images');
  }
});

app.use('/*', (req, res, next) => {
  axios({
    method: req.method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.baseUrl}${req.url}`,
    headers: {
      Authorization: process.env.TOKEN,
      'Content-Type': 'application/json',
    },
    data: req.body,
  })
    .then((response) => {
      res.status(200).send(response.data);
      next();
    })
    .catch((err) => {
      res.status(500).send(err);
      next();
    });
});

app.listen(process.env.PORT, () => { });
