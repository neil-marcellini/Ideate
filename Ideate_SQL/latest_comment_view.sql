/* Get the latest comment for the latest iteration of all ideas. */
DROP VIEW IF EXISTS latest_comment_view;
CREATE VIEW latest_comment_view AS
SELECT Comment.profile_name AS comment_profile_name, Comment.comment_text, Comment.comment_creation
FROM Comment
INNER JOIN Iteration ON Comment.iteration_id = Iteration.iteration_id
WHERE Iteration.iteration_num = (SELECT MAX(iteration_num) FROM Iteration)
GROUP BY Iteration.idea_id
ORDER BY Comment.comment_creation;
