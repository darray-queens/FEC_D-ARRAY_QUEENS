const path = require("path")
const express = require("express"); // npm installed

const app = express();

app.use(express.static(path.join(__dirname, "../dist")));
// other configuration...

app.listen(3000, () => console.log('Listening on port 3000'));