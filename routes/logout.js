const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    req.session = null;
    const userId = req.session;
    res.send("logged you out");
  });

  router.post("/", (req, res) => {});

  return router;
};
