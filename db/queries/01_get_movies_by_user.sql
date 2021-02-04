SELECT  user_movies.id as watch_list_id, movie_id, user_movies.watch_list as watch_list, user_movies.watched as watched, user_movies.date_added as date, movies.title as title, movies.year as year, movies.rating as rating, movies.runtime as runtime, movies.genre as genre FROM user_movies 
JOIN movies ON movies.id = movie_id 
WHERE user_id = 1;