/* Get the latest iteration data for a topic. */

DROP PROCEDURE IF EXISTS sp_latest_topic_iterations;
delimiter //
CREATE PROCEDURE sp_latest_topic_iterations(topic_id INT)
BEGIN
SELECT Iteration.iteration_id, Iteration.iteration_description, 
ROUND(AVG(Potential.potential_difficulty)) AS potential_difficulty,
ROUND(AVG(Potential.potential_brightness)) AS potential_brightness
FROM Iteration
INNER JOIN Idea ON Iteration.idea_id = Idea.idea_id
INNER JOIN Potential ON Iteration.iteration_id = Potential.iteration_id
WHERE Iteration.iteration_num = (SELECT MAX(iteration_num) FROM Iteration)
AND Idea.topic_id = topic_id
GROUP BY Iteration.idea_id;
END //
delimiter ;