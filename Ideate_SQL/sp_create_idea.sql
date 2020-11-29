delimiter //
CREATE PROCEDURE sp_create_idea(ideaTitle VARCHAR(50), ideaDescription MEDIUMTEXT(),
    potentialDifficulty DECIMAL(4,2), potentialBrightness DECIMAL(4,2),
    topicName VARCHAR(50), topicImage MEDIUMBLOB, topicDescription VARCHAR(500), profileName VARCHAR(50))
BEGIN
START TRANSACTION;