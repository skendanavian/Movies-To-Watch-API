const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { getUserWithEmail, register } = require("../db");

// function hashPassword(password) {
//   const hash = bcrypt.hashSync(password, 10);

//   console.log(hash);
// }

// hashPassword("password");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const { userId, isOwner } = req.session;

    /* if logged in as an owner, go to kitchen */
    /* if logged in as a user, go to order page */
    /* if not logged in, go to register page */
    if (userId && isOwner) {
      res.redirect("kitchen");
    } else if (userId) {
      res.redirect("order");
    } else {
      res.render("register", { userId, isOwner, errorMsgs: [] });
    }
  });

  router.post("/", (req, response) => {
    const { firstName, lastName, email, phone, password } = req.body;
    const { userId, isOwner } = req.session;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const errorMsgs = validateRegisterData(req.body);
    if (errorMsgs.length) {
      response.statusCode = 400;
      response.render("register", { userId, isOwner, errorMsgs });
    }

    getUserWithEmail(db, email).then((res) => {
      if (res !== null) {
        response.statusCode = 400;
        errorMsgs.push(
          "User with this email already exists. Please try another."
        );
        response.render("register", { userId, isOwner, errorMsgs });
      } else {
        const formattedPhone = parsePhoneNumber(phone, "CA").number;
        const data = {
          firstName,
          lastName,
          email,
          phone: formattedPhone,
          hashedPassword,
        };
        register(db, data).then((res) => {
          const { user_id, is_owner } = res.rows[0];
          req.session.userId = user_id;
          req.session.isOwner = is_owner;

          if (user_id && is_owner) {
            res.redirect("kitchen");
          } else if (user_id) {
            response.redirect("order");
          }
        });
      }
    });
  });

  return router;
};
