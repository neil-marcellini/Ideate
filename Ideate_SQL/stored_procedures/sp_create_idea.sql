DROP PROCEDURE IF EXISTS sp_create_idea;

delimiter //
CREATE PROCEDURE sp_create_idea(ideaTitle VARCHAR(50), ideaDescription MEDIUMTEXT,
    potentialDifficulty DECIMAL(4,2), potentialBrightness DECIMAL(4,2),
    topicName VARCHAR(50), topicImageName varchar(100), topicDescription VARCHAR(500), profileName VARCHAR(50))
BEGIN
if topicDescription is not null then
    INSERT INTO Topic (topic_name, topic_photo_file_name, topic_description)
    VALUES (topicName, topicImageName, topicDescription);
end if;

/* get Topic id */
SET @last_topic_id = (
	SELECT topic_id
    FROM Topic
    ORDER BY topic_id DESC
    LIMIT 1
);

INSERT INTO Idea (topic_id, profile_name, idea_name, idea_creation)
VALUES (@last_topic_id, profileName, ideaTitle, NOW());

/* get Idea id */
SET @last_idea_id = (
	SELECT idea_id
    FROM Idea
    ORDER BY idea_id DESC
    LIMIT 1
);

INSERT INTO Iteration (idea_id, iteration_num, iteration_description)
VALUES (@last_idea_id, 0, ideaDescription);

/* get iteration id */
SET @last_iteration_id = (
	SELECT iteration_id
    FROM Iteration
    ORDER BY iteration_id DESC
    LIMIT 1
);

INSERT INTO Potential (iteration_id, potential_brightness, potential_difficulty, profile_name, potential_creation)
VALUES (@last_iteration_id, potentialBrightness, potentialDifficulty, profileName, NOW());


END //
delimiter ;
