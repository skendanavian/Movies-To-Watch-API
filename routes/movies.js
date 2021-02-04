const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const {
  getMoviesByUser,
  removeUserMovie,
  updateWatchStatus,
  addUserMovie,
  checkIfMovieExists,
} = require("../db");

module.exports = (db) => {
  // get users movie list
  router.get("/", (req, response) => {
    const { userId } = req.session;

    if (!userId) {
      res.send("gotta log in or make an account yo");
    } else {
      getMoviesByUser(db, userId).then((res) => {
        console.log(res.rows);
        response.send(res.rows);
      });
    }
  });

  // add new movie to watch
  router.post("/:movieId", (req, response) => {});

  // delete movie from list
  router.delete("/:user_movieID", (req, response) => {});

  // update watch status
  router.put("/:user_movieID", (req, response) => {});

  return router;
};
