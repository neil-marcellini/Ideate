-- Get the total number of comments for each latest iteration
drop view if exists latest_iteration_comment_total;
create view latest_iteration_comment_total as
select Comment.iteration_id, count(comment_id) as total
from Comment
inner join latest_iterations_view as latest_iters on Comment.iteration_id = latest_iters.iteration_id
group by iteration_id;
