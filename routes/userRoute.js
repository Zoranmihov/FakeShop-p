const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", (req, res) => {
  User.find({ email: req.body.email }, (err, docs) => {
    if (docs.length > 0) {
      res.status(400).json({ message: "Something went wrong" });
    } else {
      const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      newuser.save((error) => {
        if (!error) {
          res.send("Success");
        } else {
          res.send("Something went wrong, please try again");
        }
      });
    }
    if (err) {
      res
        .status(400)
        .json({ message: "Something went wrong, please try again" });
    }
  });
});

router.post("/login", (req, res) => {
  User.find(
    {
      email: req.body.email,
      password: req.body.password,
    },
    (err, docs) => {
      if (docs.length > 0) {
        const user = {
          name: docs[0].name,
          _id: docs[0]._id,
          email: docs[0].email,
        };
        res.send(user);
      } else {
        res.status(400).json({ message: "Invalid login credentials" });
      }
    }
  );
});

router.post("/update", (req, res) => {
  const { userid, updateduser } = req.body;
  User.findByIdAndUpdate(
    userid,
    {
      name: updateduser.name,
      email: updateduser.email,
      password: updateduser.password,
    },
    (err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
        res.send("User updated successfully");
      }
    }
  );
});

router.get("/getallusers", (req, res) => {
  User.find({}, (err, docs) => {
    if (err) {
      res.status(400).json({ message: "Something went wrong" });
    } else {
      res.send(docs);
    }
  });
});

router.post("/deleteuser", (req, res) => {
  const { userid } = req.body;
  User.findByIdAndDelete(userid, (err) => {
    if (err) {
      res.status(400).json({ message: "Something went wrong" });
    } else {
      res.send("User deleted successfuly");
    }
  });
});

module.exports = router;
