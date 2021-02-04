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

module.exports = {
  getUserWithEmail,
  register,
  getMoviesByUser,
};
