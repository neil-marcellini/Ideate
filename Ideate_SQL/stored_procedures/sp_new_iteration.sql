DROP PROCEDURE IF EXISTS sp_new_iteration;
/* Insert a new iteration into the database */
delimiter //
CREATE PROCEDURE sp_new_iteration(potential_difficulty DECIMAL(4,2), 
potential_brightness DECIMAL(4,2), iteration_description MEDIUMTEXT, 
idea_id INT, profile_name VARCHAR(50))
BEGIN

/* Iteration.iteration_num set to 1
and the trigger will take care of getting the actual value */
INSERT INTO Iteration
VALUES (NULL, idea_id, 1, iteration_description);

SET @last_iteration_id = (
	SELECT iteration_id
    FROM Iteration
    ORDER BY iteration_id DESC
    LIMIT 1
);

INSERT INTO Potential
VALUES (NULL, @last_iteration_id, potential_brightness, potential_difficulty, profile_name, NOW());

/* return iteration data that was just inserted */
SELECT idea_id, @last_iteration_id AS iteration_id, iteration_description, potential_difficulty, potential_brightness;

END //
delimiter ;