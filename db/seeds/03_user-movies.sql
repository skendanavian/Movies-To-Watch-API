
DELETE FROM user_movies;

ALTER SEQUENCE users_id_seq RESTART;



INSERT INTO user_movies (user_id, movie_id, date_added ) VALUES
(1,2, NOW()),
(1,3, NOW()),
(1,4, NOW()),
(2,4, NOW()),
(3,1, NOW()),
(4,4, NOW()), 
(4,3, NOW()),
(5,2, NOW()),
(2,3, NOW());

