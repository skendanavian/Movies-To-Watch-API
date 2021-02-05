const express = require("express");
const router = express.Router();
const {
  getMoviesByUser,
  removeUserMovie,
  updateWatchStatus,
  addMovieToDb,
  checkIfMovieExists,
  addMovieToWatchList,
} = require("../db");

module.exports = (db) => {
  // get users movie list
  router.get("/", (req, response) => {
    const { userId } = req.session;

    if (!userId) {
      response.send("gotta log in or make an account yo");
    } else {
      getMoviesByUser(db, userId).then((res) => {
        console.log(res.rows);
        response.send(res.rows);
      });
    }
  });

  // add new movie to watch
  // TODO - add error handling so can't add movie twice - check user_movieId
  //TODO - secure these routes so that there must be a logged in user - either cookie or JWT present
  router.post("/:movieId", (req, response) => {
    const { userId } = req.session;
    const { movieId } = req.params;
    const { year, rating, title, runtime, genre } = req.body;
    console.log(req.body);
    checkIfMovieExists(db, movieId)
      .then((res) => {
        if (res.rows.length !== 1) {
          addMovieToDb(db, req.body).then((res) => {
            addMovieToWatchList(db, movieId, userId).then((res) =>
              response.send("movie and user watchList added to db")
            );
          });
        } else {
          addMovieToWatchList(db, movieId, userId).then((res) =>
            response.send("movie exists so added user watchlist only")
          );
        }
      })
      .catch((e) => console.log(e));
  });

  // delete movie from list
  router.delete("/:user_movieId", (req, response) => {
    removeUserMovie(db, req.params.user_movieId).then((res) => {
      response.send("deleted the movie from user list");
    });
  });

  // update watch status
  router.put("/:user_movieId", (req, response) => {
    const { userId } = req.session;
    // if (userId !== req.body.userId) {
    //   response.send("404 - not valid user request");
    //   return;
    // }
    console.log(req.body);
    updateWatchStatus(db, req.body)
      .then((res) => {
        response.send("updated");
      })
      .catch((e) => console.log(e));
  });

  return router;
};
