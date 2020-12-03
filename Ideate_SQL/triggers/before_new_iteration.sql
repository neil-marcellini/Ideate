DROP TRIGGER IF EXISTS before_new_iteration;
/* This trigger sets the iteration_num to 
the current max iteration + 1, if it isn't the first iteration. */
delimiter //
CREATE TRIGGER before_new_iteration
BEFORE
INSERT ON Iteration
FOR EACH ROW
BEGIN
IF NEW.iteration_num != 0 THEN
    SET @max_iteration_num = (
        SELECT MAX(Iteration.iteration_num) AS max_iteration_num
        FROM Iteration
        WHERE Iteration.idea_id = NEW.idea_id
    );
    SET NEW.iteration_num = @max_iteration_num + 1;
END IF;
END //
delimiter ;

