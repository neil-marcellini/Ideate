DROP PROCEDURE IF EXISTS sp_average_potential;
/* Get the average difficulty and brightness for all potentials of an iteration */
delimiter //
CREATE PROCEDURE sp_average_potential(iteration_id INT)
BEGIN
SELECT AVG(potential_difficulty) AS potential_difficulty, AVG(potential_brightness) AS potential_brightness
FROM Potential
WHERE Potential.iteration_id = iteration_id;
END //
delimiter ;