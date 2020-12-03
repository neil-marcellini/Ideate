/* Get average potential for all ideas */
DROP VIEW IF EXISTS average_potential_view;
CREATE VIEW average_potential_view AS
SELECT ROUND(AVG(Potential.potential_difficulty)) AS potential_difficulty,
ROUND(AVG(Potential.potential_brightness)) AS potential_brightness
FROM Iteration
INNER JOIN Potential ON Iteration.iteration_id = Potential.iteration_id
GROUP BY Iteration.idea_id;
