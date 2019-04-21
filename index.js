const express = require('express');
const app = express();
const cors = require('cors');
const port = 4030;
const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb+srv://daniel:excelly2000!@cluster0-bwf0v.mongodb.net/test?retryWrites=true';
const bodyParser = require('body-parser');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());

app.listen(port, () => { console.log('I am here') });


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://daniel:excelly2000!@cluster0-bwf0v.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err, db) => {
    console.log('Heyy')
    // if (err) { throw err };
    // console.log('Hey');
    // const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.post('/addProduct', (req, res) => {
    console.log(req.body);
    if (req.body) {
        MongoClient.connect(mongoURL, { useNewUrlParser: true }, function (err, db) {
            // if (err) throw err;
            console.log(db, err);
            // var dbo = db.db("shop")  //declare the database to be used 
            // var newObj = { name: 'Ade' }
            // dbo.collection("products").insertOne(newObj, function (err, res) {
            //     if (err) throw err;
            //     console.log("Document inserted successfully.")
            // })
            // db.close()
        })
        // MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
        //     if (err) throw err;
        //     console.log("Connected successfully to server");

        //     // const db = client.db(dbName);
        // })
        // client.connect(err => {
        //     if (err) throw err;
        //     console.log('Hey');
        //     const collection = client.db("shop").collection("products");
        //     console.log(collection)
        //     // perform actions on the collection object
        //     client.close();
        // });
    }
})