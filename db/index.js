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

module.exports = {
  getUserWithEmail,
  register,
};
