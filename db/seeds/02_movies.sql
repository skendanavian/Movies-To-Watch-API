
DELETE FROM movies;

-- ALTER SEQUENCE movies_id_seq RESTART;


INSERT INTO movies (id, title, year, rating, runtime, genre) VALUES
(1,'testMovie1', 2012, 5, 160, 'drama'),
(2,'testMovie2', 2013, 4, 100, 'comedy'),
(3,'testMovie3', 1970, 2.4, 90, 'action'),
(4,'testMovie4', 1995, 9, 140, 'fantasy');


