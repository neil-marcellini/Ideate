
DROP PROCEDURE IF EXISTS sp_latest_topic_comments;
/* Get the latest comments for each iteration of all ideas with a given topic_id */
delimiter //
CREATE PROCEDURE sp_latest_topic_comments(topic_id INT)
BEGIN

SELECT Comment.comment_id, Comment.profile_name AS comment_profile_name, 
Comment.comment_text, Comment.comment_creation, Profile.profile_photo
FROM Comment
INNER JOIN Profile ON Comment.profile_name = Profile.profile_name
INNER JOIN Iteration ON Comment.iteration_id = Iteration.iteration_id
INNER JOIN Idea ON Iteration.idea_id = Idea.idea_id
LEFT JOIN Comment AS t2
ON Comment.iteration_id = t2.iteration_id
AND Comment.comment_creation < t2.comment_creation
WHERE Iteration.iteration_num = (SELECT MAX(iteration_num) FROM Iteration)
AND Idea.topic_id = topic_id
AND t2.comment_id IS NULL AND t2.profile_name IS NULL AND
t2.comment_text IS NULL AND t2.comment_creation IS NULL AND t2.iteration_id IS NULL;

END //
delimiter ;
