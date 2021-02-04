const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { getUserWithEmail, register } = require("../db");

const validateRegisterData = (data) => {
  const { username, email, password } = data;
  const errorMsgs = [];

  const dataMissing = Object.values(data).some((val) => !val);
  if (dataMissing) {
    errorMsgs.push("Please fill out the whole form.");
  }

  if (username && username.length > 50) {
    errorMsgs.push("First name entry has too many characters.");
  }

  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidEmail = emailPattern.test(email);
  if (email && !isValidEmail) {
    errorMsgs.push("Please enter a valid email address.");
  }
  if (password && password.length < 6) {
    errorMsgs.push(
      "Your password is too short! Please enter one at least 6 characters long."
    );
  }

  return errorMsgs;
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    const { userId } = req.session;

    if (userId) {
      res.send("you are already registerd and logged in");
    } else {
      res.send("we will show you registration page");
    }
  });

  router.post("/", (req, response) => {
    const { username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const errorMsgs = validateRegisterData(req.body);
    if (errorMsgs.length) {
      response.statusCode = 400;
      response.send("something went wrong, try registering again");
    }

    getUserWithEmail(db, email).then((res) => {
      if (res !== null) {
        response.statusCode = 400;
        errorMsgs.push(
          "User with this email already exists. Please try another."
        );
        response.send("showing the registration page");
      } else {
        const data = {
          username,
          email,
          hashedPassword,
        };
        register(db, data).then((res) => {
          const { user_id } = res.rows[0];
          req.session.userId = user_id;

          if (user_id) {
            response.send("you are now logged in and registration went well");
          }
        });
      }
    });
  });

  return router;
};
