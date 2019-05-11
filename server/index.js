const express = require('express');
const app = express();
const cors = require('cors');
const port = 4030;
const mongodb = require('mongodb');
const mongoURL = 'mongodb://127.0.0.1:27017/';
const bodyParser = require('body-parser');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());

app.listen(port, () => { console.log('Server Started!') });


const MongoClient = require('mongodb').MongoClient;

app.post('/addProduct', (request, response) => {
    console.log(request.body);
    try {
        MongoClient.connect(mongoURL, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var myDB = db.db('shop');
            var dataObj = request.body;
            myDB.collection('products').insertOne(dataObj, (err, db) => {
                if (err) throw err;
                console.log("Write to mongo is successful")
            })
            db.close();
        })
    }
    catch (e) {
        console.log('Catch Error', e);
    }
})

app.post('/signup', (request, response) => {
    console.log(request.body);
})