DROP VIEW IF EXISTS topics_view;
/* Select all topics, most recent first. */
CREATE VIEW topics_view AS
SELECT * FROM Topic
ORDER BY topic_id DESC;