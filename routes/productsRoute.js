const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

router.get("/getallproducts", (req, res) => {
  Product.find({}, (err, docs) => {
    if (!err) {
      return res.status(200).send(docs);
    } else {
      return res.status(400).json({ message: err });
    }
  });
});

router.post("/getproductbyid", (req, res) => {
  Product.find({ _id: req.body.productid }, (err, docs) => {
    if (!err) {
      res.status(200).send(docs[0]);
    } else {
      return res
        .status(400)
        .json({ message: `Something went wrong. Error: ${err.message}` });
    }
  });
});

router.post("/addreview", async (req, res) => {
  const { review, productid, currentUser } = req.body;
  const product = await Product.findById(productid);
  const reviewmodel = {
    name: currentUser.name,
    userid: currentUser._id,
    rating: review.rating,
    comment: review.comment,
  };
  product.reviews.push(reviewmodel);
  let rating =
    product.reviews.reduce((acc, i) => acc + i.rating, 0) /
    product.reviews.length;
  product.rating = Math.round(rating);
  product.save((err) => {
    if (err) {
      res.status(400).json({ message: "Something went wrong", err });
    } else {
      res.send("Review submitted successfully");
    }
  });
});

router.post("/deleteproduct", (req, res) => {
  const { productid } = req.body;
  Product.findByIdAndDelete(productid, (err) => {
    if (err) {
      res.status(400).json({ message: "Something went wrong" });
    } else {
      res.send("Product deleted successfuly");
    }
  });
});

router.post("/addproduct", (req, res) => {
  const { product } = req.body;

  new Product(product).save((err) => {
    if (err) {
      return res.status(400).json("Something went wrong");
    } else {
      return res.send("Product added");
    }
  });
});

router.post("/updateproduct", (req, res) => {
  const { productid, updatedproduct } = req.body;
  Product.findByIdAndUpdate(
    productid,
    {
      name: updatedproduct.name,
      price: updatedproduct.price,
      description: updatedproduct.description,
      countInStock: updatedproduct.countInStock,
      image: updatedproduct.image,
      category: updatedproduct.category,
    },
    (err) => {
      if (err) {
        res.status(400).json("Something went wrong");
      } else {
        res.send("Product updated");
      }
    }
  );
});

module.exports = router;
