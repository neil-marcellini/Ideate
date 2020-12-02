/* Get the latest comment for the latest iteration of all ideas. */
DROP VIEW IF EXISTS latest_comment_view;
CREATE VIEW latest_comment_view AS
SELECT Comment.comment_id, Comment.profile_name AS comment_profile_name, 
Comment.comment_text, Comment.comment_creation
FROM Comment
INNER JOIN Iteration ON Comment.iteration_id = Iteration.iteration_id
LEFT JOIN Comment AS t2
ON Comment.iteration_id = t2.iteration_id
AND Comment.comment_creation < t2.comment_creation
WHERE Iteration.iteration_num = (SELECT MAX(iteration_num) FROM Iteration) 
AND t2.comment_id IS NULL AND t2.profile_name IS NULL AND
t2.comment_text IS NULL AND t2.comment_creation IS NULL AND t2.iteration_id IS NULL
