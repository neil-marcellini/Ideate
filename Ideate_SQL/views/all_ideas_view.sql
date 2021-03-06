DROP VIEW IF EXISTS all_ideas_view;
CREATE VIEW all_ideas_view AS
SELECT Idea.idea_id, Idea.idea_name, Idea.idea_creation, Profile.profile_name, Profile.profile_photo_file_name, Topic.topic_name
FROM Idea
INNER JOIN Topic ON Idea.topic_id = Topic.topic_id
INNER JOIN Profile ON Idea.profile_name = Profile.profile_name
order by Idea.idea_creation desc;
