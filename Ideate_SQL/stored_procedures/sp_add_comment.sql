DROP PROCEDURE IF EXISTS sp_add_comment;
/* Add someone's comment on an iteration */
delimiter //
CREATE PROCEDURE sp_add_comment(iteration_id INT, profile_name VARCHAR(50), comment_text VARCHAR(500))
BEGIN
INSERT INTO Comment
VALUES (NULL, iteration_id, profile_name, comment_text, NOW());
/* RETURN comment id that was just added */
SELECT *
FROM Comment
ORDER BY comment_id DESC
LIMIT 1;
END //
delimiter ;