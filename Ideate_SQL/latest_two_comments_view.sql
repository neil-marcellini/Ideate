/* Get the latest two comments, for the latest iteration, of all ideas. */
DROP VIEW IF EXISTS sp_latest_two_comments;
CREATE VIEW sp_latest_two_comments AS
SELECT *
FROM Comment
WHERE Comment.iteration_num = (SELECT MAX(iteration_num) FROM Iteration)
GROUP BY Comment.iteration_id;
LIMIT 2

