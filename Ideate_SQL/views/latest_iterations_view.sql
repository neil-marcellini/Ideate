/* Get all latest iterations along with their data*/
DROP VIEW IF EXISTS latest_iterations_view;
CREATE VIEW latest_iterations_view AS
SELECT i.iteration_id, i.iteration_num, i.iteration_description, 
Idea.idea_id, Idea.idea_name, Idea.idea_creation, 
Profile.profile_name, Profile.profile_photo_file_name, Topic.topic_name
FROM Iteration i
inner join Idea on i.idea_id = Idea.idea_id
INNER JOIN Topic ON Idea.topic_id = Topic.topic_id
INNER JOIN Profile ON Idea.profile_name = Profile.profile_name
WHERE (
SELECT COUNT(*)
FROM Iteration other
WHERE i.idea_id = other.idea_id and i.iteration_num < other.iteration_num
) < 1
order by i.iteration_id desc;
