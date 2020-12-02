DROP PROCEDURE IF EXISTS sp_iteration_comments;
/* Get all comments for a given iteration ordered by creation date ascending */
delimiter //
CREATE PROCEDURE sp_iteration_comments(iteration_id INT)
BEGIN
SELECT comment_id, profile_name AS comment_profile_name, comment_text, comment_creation
FROM Comment
WHERE Comment.iteration_id = iteration_id
ORDER BY comment_creation ASC;
END //
delimiter ;