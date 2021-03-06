const express = require("express");
const app = express();
const cors = require("cors");
const port = 4030;
const mongodb = require("mongodb");
const mongoURL = "mongodb://127.0.0.1:27017/";
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const config = require("../shopee/src/config");
const validator = require("email-validator");
// const upload = multer({ dest: 'images/' })
const formidable = require("formidable"),
  http = require("http"),
  util = require("util");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
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
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 1440, height: 1560, crop: "crop" }]
});

const parser = multer({ storage: storage });

app.listen(port, () => {
  console.log("Server Started!");
});

const calculateDiscount = (discount, price) => {
  const getDiscount = (discount / 100) * price;
  const discountedPrice = price - getDiscount + 10;
  return discountedPrice;
};
const determineDiscount = price => {
  let discount = 0;
  let discountPrice = 0;
  if (price >= 0) {
    discount = 5;
    discountPrice = calculateDiscount(discount, price);
    return discountPrice;
  } else if (price >= 5000) {
    discount = 10;
    discountPrice = calculateDiscount(discount, price);
    return discountPrice;
  } else if (price >= 15000) {
    discount = 12;
    discountPrice = calculateDiscount(discount, price);
    return discountPrice;
  } else if (price >= 20000 && price <= 25000) {
    discount = 15;
    discountPrice = calculateDiscount(discount, price);
    return discountPrice;
  } else {
    return 0;
  }
};

const isEmailInMongo = email => {
  return new Promise((resolve, reject) => {
    const dataToFind = { email: email };
    try {
      MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
        const myDB = db.db("shop");
        myDB.collection("admin").findOne(dataToFind, (err, result) => {
          if (err) throw err;
          resolve(result);
        });
      });
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
};

const signAdminUp = (email, password) => {
  try {
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      var myDB = db.db("shop");
      var adminDataObj = { email, password };
      myDB.collection("admin").insertOne(adminDataObj, (err, db) => {
        if (err) throw err;
      });
    });
  } catch (e) {
    response.status(400).send({ statusmessage: e });
    console.log(e, "Sign Up Failed!");
  }
};

const getProduct = id => {
  return new Promise((resolve, reject) => {
    const productToFind = { _id: new ObjectId(id) };
    try {
      MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        const myDB = db.db("shop");
        myDB
          .collection("products")
          .find(productToFind)
          .toArray(function(err, result) {
            if (err) throw err;
            console.log(result, "results");
            resolve(result);
          });
      });
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
};

const getCartItems = id => {
  return new Promise((resolve, reject) => {
    const cartId = { _id: new ObjectId(id) };
    try {
      MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        const myDB = db.db("shop");
        myDB
          .collection("cart")
          .find(cartId)
          .toArray(function(err, result) {
            if (err) throw err;
            console.log(result, "results");
            resolve(result);
          });
      });
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
};

const updateCartItems = items => {
  return new Promise((resolve, reject) => {
    const cartId = { _id: new ObjectId(id) };
    try {
      MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        const myDB = db.db("shop");
        myDB
          .collection("cart")
          .find(cartId)
          .toArray(function(err, result) {
            if (err) throw err;
            console.log(result, "results");
            resolve(result);
          });
      });
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
};

app.post("/addProduct", parser.single("file"), async (request, response) => {
  try {
    const {
      productName,
      productBrand,
      productCategory,
      productPrice,
      productDescription,
      tags
    } = request.body;
    const { url } = request.file;
    const dataObj = {
      productName: productName,
      productBrand: productBrand,
      productPrice: productPrice,
      slashedPrice: determineDiscount(productPrice),
      productCategory: productCategory,
      tags: tags,
      productDescription: productDescription,
      imageURL: url
    };
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (error, db) => {
      if (error) throw error;
      const myDB = db.db("shop");
      myDB.collection("products").insertOne(dataObj, (err, db) => {
        if (err) throw err;
        console.log("Product Write Successful");
        response
          .status(200)
          .send({ statusmessage: "Product Added Successfully" });
      });
      db.close();
    });
  } catch (e) {
    response.status(228).send({ statusmessage: e.message });
  }
});

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
        console.log("Present");
        response.status(202).send({ statusmessage: "Email Already an admin." });
      }
      console.log(doesEmailExist, "emailStatus");
    } catch (e) {
      response.status(402).send({
        statusmessage: e
      });
      console.log(e);
    }
  } else {
    response.status(228).send({
      statusmessage: "Invalid Email"
    });
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
        });
      } else {
        if (password === doesEmailExist.password) {
          response.status(200).send({
            statusmessage: "Logged In."
          });
        } else {
          response.status(228).send({
            statusmessage: "Incorrect password."
          });
        }
      }
    } catch (e) {
      response.status(402).send({
        statusmessage: e
      });
      console.log(e);
    }
  } else {
    response.status(228).send({
      statusmessage: "Invalid Email."
    });
  }
});

app.post("/mensProducts", async (request, response) => {
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    const myDB = db.db("shop");
    myDB
      .collection("products")
      .find({ productCategory: { $in: ["Men", "Unisex"] } })
      .toArray((err, result) => {
        if (err) throw err;
        response.status(200).send({ products: result });
      });
  });
});

app.post("/womensProducts", async (request, response) => {
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    const myDB = db.db("shop");
    myDB
      .collection("products")
      .find({ productCategory: { $in: ["Women", "Unisex"] } })
      .toArray((err, result) => {
        if (err) throw err;
        response.status(200).send({ products: result });
      });
  });
});

app.post("/footWearProducts", async (request, response) => {
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    const myDB = db.db("shop");
    myDB
      .collection("products")
      .find({ productCategory: { $in: ["FootWear"] } })
      .toArray((err, result) => {
        if (err) throw err;
        response.status(200).send({ products: result });
      });
  });
});

app.post("/getAProduct", async (request, response) => {
  const { id } = request.body;
  console.log("productId", id);
  const products = await getProduct(id);
  response.status(200).send({ product: products });
});

app.post("addToCart", async (request, response) => {
  const { id, product } = request.body;
  const cart = await getCartItems(id);
  if (cart) {
    const Items = cart.cartItems;
    Items.push(product);
    // updateCartItems();
  } else {
  }
});
module.exports = app;
