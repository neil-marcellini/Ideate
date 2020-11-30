/* Gets all iteration descriptions from all iterations
that are the latest for their idea. */
DROP VIEW IF EXISTS latest_iterations_view;
CREATE VIEW latest_iterations_view AS
SELECT Iteration.iteration_description, AVG(Potential.potential_difficulty), AVG(Potential.potential_brightness)
FROM Iteration
INNER JOIN Potential ON Iteration.iteration_id = Potential.iteration_id
WHERE Iteration.iteration_num = (
    SELECT MAX(iteration_num)
    FROM Iteration
    GROUP BY idea_id);