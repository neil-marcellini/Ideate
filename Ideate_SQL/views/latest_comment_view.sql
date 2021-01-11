/* Get the latest comment for the latest iteration of all ideas. */
DROP VIEW IF EXISTS latest_comment_view;
CREATE VIEW latest_comment_view AS
SELECT c.*, Profile.profile_photo_file_name
FROM latest_iterations_view as latest_iters
inner join Comment c on latest_iters.iteration_id = c.iteration_id
inner join Profile on c.profile_name = Profile.profile_name
WHERE (
SELECT COUNT(*)
FROM Comment other
WHERE c.iteration_id = other.iteration_id and c.comment_creation < other.comment_creation
) < 1;
