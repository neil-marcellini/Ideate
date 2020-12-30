/* Gets all iteration ids and descriptions from all iterations
that are the latest for their idea. */
DROP VIEW IF EXISTS latest_iterations_view;
CREATE VIEW latest_iterations_view AS
SELECT i.iteration_id, i.iteration_num, i.iteration_description
FROM Iteration i
WHERE (
SELECT COUNT(*)
FROM Iteration other
WHERE i.idea_id = other.idea_id and i.iteration_num > other.iteration_num
) < 1;
