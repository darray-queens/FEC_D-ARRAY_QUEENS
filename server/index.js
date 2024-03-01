require('dotenv').config();

const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
// other configuration...

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
