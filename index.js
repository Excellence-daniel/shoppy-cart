const express = require('express');
const app = express();
const cors = require('cors');
const port = 4030;
const bodyParser = require('body-parser');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());

app.listen(port, () => { console.log('I am here') })