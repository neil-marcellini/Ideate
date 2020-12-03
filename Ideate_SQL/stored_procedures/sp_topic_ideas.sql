DROP PROCEDURE IF EXISTS sp_topic_ideas;
/* Get all ideas from a given topic */
delimiter //
CREATE PROCEDURE sp_topic_ideas(topic_id INT)
BEGIN
SELECT Idea.idea_id, Idea.idea_name, Idea.idea_creation, Profile.profile_name, Profile.profile_photo, Topic.topic_name
FROM Idea
INNER JOIN Topic ON Idea.topic_id = Topic.topic_id
INNER JOIN Profile ON Idea.profile_name = Profile.profile_name
WHERE Idea.topic_id = topic_id;
END //
delimiter ;