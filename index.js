require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const port = process.env.PORT || 3000;
const ENV = process.env.ENV || "development";

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// set up cookies
const cookieSession = require("cookie-session");
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello It works");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
