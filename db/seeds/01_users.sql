
DELETE FROM users;

ALTER SEQUENCE users_id_seq RESTART;

INSERT INTO users (username, email, password) VALUES
('movieBuff', 'kevin@example.com', '$2b$10$4OD/IQ2rGz6aWtiIKjsBcupQHAag/UmQ4HOqcmF5y1FJbYJzAJ3XO'),
('JimmyC', 'jim@example.com', '$2b$10$4OD/IQ2rGz6aWtiIKjsBcupQHAag/UmQ4HOqcmF5y1FJbYJzAJ3XO'),
('Greg Turkington', 'greg@example.com', '$2b$10$4OD/IQ2rGz6aWtiIKjsBcupQHAag/UmQ4HOqcmF5y1FJbYJzAJ3XO'),
('onCinemaAtTheCinema', 'kyle@example.com', '$2b$10$4OD/IQ2rGz6aWtiIKjsBcupQHAag/UmQ4HOqcmF5y1FJbYJzAJ3XO'),
('Sarah23', 'sarah@example.com', '$2b$10$4OD/IQ2rGz6aWtiIKjsBcupQHAag/UmQ4HOqcmF5y1FJbYJzAJ3XO'),
('MovieBrit73', 'brit@example.com', '$2b$10$4OD/IQ2rGz6aWtiIKjsBcupQHAag/UmQ4HOqcmF5y1FJbYJzAJ3XO');

