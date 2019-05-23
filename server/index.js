const express = require("express");
const app = express();
const cors = require("cors");
const port = 4030;
const mongodb = require("mongodb");
const mongoURL = "mongodb://127.0.0.1:27017/";
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const config = require('../shopee/src/config');
const validator = require('email-validator');
// const upload = multer({ dest: 'images/' })
const formidable = require('formidable'), http = require('http'), util = require('util');
const MongoClient = require("mongodb").MongoClient;
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(cors());


cloudinary.config({
  cloud_name: config.cloudinaryCLOUDNAME,
  api_key: config.cloudinaryAPIKEY,
  api_secret: config.cloudinaryAPISECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  // folder: 'images',
  allowedFormats: ["jpg", "png"]
});

const parser = multer({ storage: storage });

app.listen(port, () => {
  console.log("Server Started!");
});

const isEmailInMongo = (email) => {
  return new Promise((resolve, reject) => {
    const dataToFind = { "email": email };
    try {
      MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
        const myDB = db.db("shop");
        myDB.collection("admin").findOne(dataToFind, (err, result) => {
          if (err) throw err;
          resolve(result);
        })
      })
    }
    catch (e) {
      reject(e);
      console.log(e);
    }
  })
}

const signAdminUp = (email, password) => {
  try {
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      var myDB = db.db("shop");
      var adminDataObj = { email, password };
      myDB.collection("admin").insertOne(adminDataObj, (err, db) => {
        if (err) throw err;
      });
    })
  }
  catch (e) {
    response.status(400).send({ statusmessage: e });
    console.log(e, 'Sign Up Failed!');
  }
}

app.post("/addProduct", parser.single('file'), async (request, response) => {
  try {
    const { productName, productBrand, productCategory, productPrice, productDescription, tags } = request.body;
    const { url } = request.file;
    const dataObj = {
      'productName': productName,
      'productBrand': productBrand,
      'productPrice': productPrice,
      'productCategory': productCategory,
      'tags': tags,
      'productDescription': productDescription,
      'imageURL': url
    }
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (error, db) => {
      if (error) throw error;
      const myDB = db.db("shop");
      myDB.collection("products").insertOne(dataObj, (err, db) => {
        if (err) throw err;
        console.log("Product Write Successful");
        response.status(200).send({ statusmessage: "Product Added Successfully" });
      });
      db.close();
    })
  }
  catch (e) {
    response.status(228).send({ statusmessage: e.message });
  }
  console.log(request.body);
  console.log(request.file)
})

app.post("/signup", async (request, response) => {
  const { email, password } = request.body;
  const isEmail = validator.validate(email);
  if (isEmail) {
    try {
      const doesEmailExist = await isEmailInMongo(email);
      if (doesEmailExist === null) {
        signAdminUp(email, password);
        response.status(200).send({
          statusmessage: "Admin Registered successfully."
        });
      } else {
        console.log('Present');
        response.status(202).send({ statusmessage: 'Email Already an admin.' });
      }
      console.log(doesEmailExist, 'emailStatus')
    }
    catch (e) {
      response.status(402).send({
        statusmessage: e
      })
      console.log(e);
    }
  } else {
    response.status(228).send({
      statusmessage: 'Invalid Email'
    })
  }
});

app.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const isEmail = validator.validate(email);
  if (isEmail) {
    try {
      const doesEmailExist = await isEmailInMongo(email);
      if (doesEmailExist === null) {
        response.status(228).send({
          statusmessage: "Invalid Admin Credentials."
        })
      } else {
        if (password === doesEmailExist.password) {
          response.status(200).send({
            statusmessage: "Logged In."
          })
        } else {
          response.status(228).send({
            statusmessage: "Incorrect password."
          })
        }
      }
    }
    catch (e) {
      response.status(402).send({
        statusmessage: e
      })
      console.log(e);
    }
  } else {
    response.status(228).send({
      statusmessage: 'Invalid Email.'
    })
  }
})

module.exports = app;