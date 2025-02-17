const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());
const db = require('./db');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const createuser = require('./Route/createuser');
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(createuser)
