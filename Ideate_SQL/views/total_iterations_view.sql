drop view if exists total_iterations_view;
create view total_iterations_view as
select count(*) as total_iterations
from Iteration
left join latest_iterations_view as latest_iters on Iteration.idea_id = latest_iters.idea_id
group by latest_iters.idea_id;
