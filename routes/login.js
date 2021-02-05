const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { getUserWithEmail } = require("../db/index.js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const { userId } = req.session;
    if (userId) {
      res.send("There is user logged in");
    } else {
      res.send("no user logged in");
    }
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */

  // TODO - implement JWT + session cookie for user auth and security

  const login = function (email, password) {
    return getUserWithEmail(db, email).then((user) => {
      console.log("here", user);
      if (!user) {
        return null;
      } else if (bcrypt.compareSync(password, user.password)) {
        return user;
      } else {
        return null;
      }
    });
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
      response.send("no email or password");
    }
    login(email, password)
      .then((user) => {
        if (!user) {
          errorMsgs.push("User not found!");
          response.send(errorMsgs);
          return;
        }

        req.session.userId = user.id;
        const { userId } = req.session;
        if (userId) {
          response.send("It Works");
        }
      })
      .catch((e) => {
        response.send(e);
        return;
      });
  });

  return router;
};
