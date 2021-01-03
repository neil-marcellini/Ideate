DROP PROCEDURE IF EXISTS sp_next_iteration;
/* Create a new potential linked to the given iteration */
delimiter //
CREATE PROCEDURE sp_next_iteration(idea_id INT, iteration_num int)
BEGIN
-- get the id of the iteration with the given idea and iteration_num
set @iteration_id = (
    select Iteration.iteration_id
    from Iteration
    where Iteration.idea_id = idea_id and Iteration.iteration_num=iteration_num
);
select *, @iteration_id as iteration_id
from Iteration,
(
    select count(*) as total_comments
    from Comment
    where Comment.iteration_id = @iteration_id
) as total_comments,
(
    SELECT ROUND(AVG(potential_difficulty)) AS potential_difficulty, ROUND(AVG(potential_brightness)) AS potential_brightness
    FROM Potential
    WHERE Potential.iteration_id = @iteration_id
) as avg_potential
where Iteration.iteration_id = @iteration_id
limit 1;
END //
delimiter ;
