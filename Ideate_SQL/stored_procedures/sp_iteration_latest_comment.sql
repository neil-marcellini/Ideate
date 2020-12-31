drop procedure if exists sp_iteration_latest_comment;
/* Get the latest comment for a given iteration */
delimiter //
CREATE PROCEDURE sp_iteration_latest_comment(iteration_id INT)
BEGIN
select Comment.*, Profile.profile_photo_file_name
from Comment
INNER JOIN Profile ON Comment.profile_name = Profile.profile_name
where Comment.iteration_id = iteration_id
order by Comment.comment_creation desc
limit 1;
END //
delimiter ;
