/* LOGIN/REGISTER */
const getUserWithEmail = function (db, email) {
  const values = [email];
  return db
    .query(
      `
  SELECT users.*
  FROM users
  WHERE users.email = $1;
  `,
      values
    )
    .then((res) => {
      return res.rows.length ? res.rows[0] : null;
    });
};

const register = function (db, data) {
  const { username, email, hashedPassword } = data;
  return db.query(
    `
  INSERT INTO users (
    username,
    email,
    password
  ) VALUES (
    $1, $2, $3
  ) RETURNING users.id AS user_id;
  `,
    [username, email, hashedPassword]
  );
};

// Add, Remove and Update User Movies

const getMoviesByUser = function (db, userId) {
  return db.query(
    `SELECT  user_movies.id as watch_list_id, movie_id, user_movies.watch_list as watch_list, user_movies.watched as watched, user_movies.date_added as date, movies.title as title, movies.year as year, movies.rating as rating, movies.runtime as runtime, movies.genre as genre FROM user_movies 
JOIN movies ON movies.id = movie_id 
WHERE user_id = $1;`,
    [userId]
  );
};

const checkIfMovieExists = function (db, movieId) {
  return db.query(`SELECT movies.* FROM movies WHERE movies.id = $1;`, [
    movieId,
  ]);
};

const addMovieToDb = function (db, movieObj) {
  const { movieId, title, year, rating, runtime, genre } = movieObj;
  return db.query(
    `INSERT INTO movies (id, title, year, rating, runtime, genre) VALUES
($1,$2, $3, $4, $5, $6);`,
    [movieId, title, year, rating, runtime, genre]
  );
};

const addMovieToWatchList = function (db, movieId, userId) {
  // if not already in db --> insert into movie and user_movie
  return db.query(
    `INSERT INTO user_movies (user_id, movie_id, date_added ) VALUES
  ($1,$2, NOW());`,
    [userId, movieId]
  );
};

const removeUserMovie = function (db, userMovieId) {
  return db.query(
    `DELETE FROM user_movies
    WHERE user_movies.id = $1;`,
    [userMovieId]
  );
};

const updateWatchStatus = function (db, userMovieObj) {
  const { userMovieId, watchList, watched } = userMovieObj;
  return db.query(
    `
  UPDATE user_movies
  SET watch_list = $1,
  watched = $2
  WHERE user_movies.id = $3;
  `,
    [watchList, watched, userMovieId]
  );
};

module.exports = {
  getUserWithEmail,
  register,
  getMoviesByUser,
  removeUserMovie,
  updateWatchStatus,
  addMovieToDb,
  checkIfMovieExists,
  addMovieToWatchList,
};
