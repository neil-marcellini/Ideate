DROP PROCEDURE IF EXISTS sp_rating;
/* Create a new potential linked to the given iteration */
delimiter //
CREATE PROCEDURE sp_rating(iteration_id INT, potential_brightness DECIMAL(4,2), 
    potential_difficulty DECIMAL(4,2), profile_name VARCHAR(50))
BEGIN
INSERT INTO Potential
VALUES (NULL, iteration_id, potential_brightness, potential_difficulty, profile_name, NOW());

END //
delimiter ;