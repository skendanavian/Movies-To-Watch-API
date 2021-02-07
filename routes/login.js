const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { getUserWithEmail } = require("../db/index.js");
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers("x-access-token");
  if (!token) {
    res.send("Need authenticated token");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "authentication failed" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = (db) => {
  //move to authenticate file/route or this route won't work
  router.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send("User is authenticated");
  });

  router.get("/", (req, res) => {
    const { userId } = req.session;
    if (userId) {
      res.send({ loggedIn: true, user: userId });
    } else {
      res.send({ loggedIn: false });
    }
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */

  // TODO - implement JWT + session cookie for user auth and security

  const login = function (email, password) {
    return getUserWithEmail(db, email)
      .then((user) => {
        console.log("here", user);
        if (!user) {
          return null;
        } else if (bcrypt.compareSync(password, user.password)) {
          return user;
        } else {
          return null;
        }
      })
      .catch((e) => console.error(e));
  };

  router.post("/", (req, response) => {
    console.log(req.body);
    const { email, password } = req.body;

    const { userId } = req.session;
    const errorMsgs = [];

    console.log({ email });
    console.log({ password });

    if (!email || !password) {
      errorMsgs.push("Fill in the whole form!");
      response.json({ auth: false, message: errorMsgs });
    }
    login(email, password)
      .then((user) => {
        if (!user) {
          errorMsgs.push("User not found!");
          response.send(errorMsgs);
          response.json({ auth: false, message: errorMsgs });
        }

        req.session.userId = user.id;
        const { userId } = req.session;
        // add .env variable for the secret here.
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
          expiresIn: 300,
        });
        if (userId) {
          response.json({ auth: true, token: token, userId });
        }
      })
      .catch((e) => {
        response.send(e);
        return;
      });
  });

  return router;
};
