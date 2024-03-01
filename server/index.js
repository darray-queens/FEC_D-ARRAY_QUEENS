require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
// other configuration...

app.use('/*', (req, res, next) => {
  axios({
    method: req.method, url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.baseUrl}${req.url}`, headers: { Authorization: `${process.env.TOKEN}` }, data: req.body,
  })
    .then((response) => {
      res.status(200).json(response.data);
      next();
    })
    .catch((err) => {
      res.status(500).json(err);
      next();
    });
});

app.listen(process.env.PORT, () => {
  console.log('Listening on port 3000');
});
