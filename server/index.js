const express = require("express");
const app = express();
const cors = require("cors");
const port = 4030;
const mongodb = require("mongodb");
const mongoURL = "mongodb://127.0.0.1:27017/";
const bodyParser = require("body-parser");
const fs = require("fs");
const upload = require('multer');

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server Started!");
});

const MongoClient = require("mongodb").MongoClient;

app.post("/addProduct", (request, response) => {
  console.log(request.body);
  try {
    const dataObj = request.body;
    const imageData = request.body.image;
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var myDB = db.db("shop");
      fs.writeFile(
        `../shopee/public/img/uploads/`,
        imageData,
        "binary",
        err => {
          console.log("File was saved");
        }
      );

      //   myDB.collection("products").insertOne(dataObj, (err, db) => {
      //     if (err) throw err;
      //     console.log("Write to mongo is successful");
      //   });
      //   db.close();
    });
  } catch (e) {
    console.log("Catch Error", e);
  }
});

app.post("/signup", (request, response) => {
  const { email, password } = request.body;
  console.log(request.body);
  try {
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      var myDB = db.db("shop");
      var adminDataObj = { email, password };
      myDB.collection("admin").insertOne(adminDataObj, (err, db) => {
        if (err) throw err;
        console.log("User signed in successfully!");
      });
    });
    response.send({
      status: 200,
      statusmessage: "Admin Registered successfully."
    });
  } catch (e) {
    console.log("Error", e);
    response.send({ status: 400, statusmessage: e });
  }
});
