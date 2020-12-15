-- Neil Marcellini
-- 11/13/2020


CREATE TABLE User(
    -- user_id will be a uuid
    user_id VARCHAR(36) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password_hash VARCHAR(2000) NOT NULL,
    PRIMARY KEY (user_id)
) ENGINE=InnoDB;

CREATE TABLE Profile(
    profile_name VARCHAR(50) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    profile_bio VARCHAR(1000) DEFAULT NULL,
    profile_photo MEDIUMBLOB DEFAULT NULL,
    profile_creation DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    PRIMARY KEY (profile_name)
)ENGINE=InnoDB;

CREATE TABLE Follow(
    follower_profile_name VARCHAR(36) NOT NULL,
    followed_profile_name VARCHAR(36) NOT NULL,
    follow_creation DATETIME NOT NULL,
    FOREIGN KEY (follower_profile_name) REFERENCES Profile(profile_name),
    FOREIGN KEY (followed_profile_name) REFERENCES Profile(profile_name),
    PRIMARY KEY (follower_profile_name, followed_profile_name)
)ENGINE=InnoDB;

CREATE TABLE Topic(
    topic_id INT NOT NULL AUTO_INCREMENT,
    topic_name VARCHAR(50) NOT NULL,
    topic_photo MEDIUMBLOB DEFAULT NULL,
    topic_description VARCHAR(500) NOT NULL,
    PRIMARY KEY (topic_id)
)ENGINE=InnoDB;

CREATE TABLE Idea(
    idea_id INT NOT NULL AUTO_INCREMENT,
    topic_id INT NOT NULL,
    profile_name VARCHAR(50) NOT NULL,
    idea_name VARCHAR(55) NOT NULL,
    idea_creation DATETIME NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES Topic(topic_id),
    FOREIGN KEY (profile_name) REFERENCES Profile(profile_name),
    PRIMARY KEY (idea_id)
)ENGINE=InnoDB;

CREATE TABLE Iteration(
    iteration_id INT NOT NULL AUTO_INCREMENT,
    idea_id INT NOT NULL,
    iteration_num INT NOT NULL,
    iteration_description TEXT(50000) NOT NULL,
    FOREIGN KEY (idea_id) REFERENCES Idea(idea_id),
    PRIMARY KEY (iteration_id)
)ENGINE=InnoDB;

CREATE TABLE Potential(
    potential_id INT NOT NULL AUTO_INCREMENT,
    iteration_id INT NOT NULL,
    potential_brightness DECIMAL(4,2) NOT NULL,
    potential_difficulty DECIMAL(4,2) NOT NULL,
    profile_name VARCHAR(50) NOT NULL,
    potential_creation DATETIME NOT NULL,
    FOREIGN KEY (iteration_id) REFERENCES Iteration(iteration_id),
    FOREIGN KEY (profile_name) REFERENCES Profile(profile_name),
    PRIMARY KEY (potential_id)
)ENGINE=InnoDB;

CREATE TABLE Comment(
    comment_id INT NOT NULL AUTO_INCREMENT,
    iteration_id INT NOT NULL,
    profile_name VARCHAR(50) NOT NULL,
    comment_text VARCHAR(500) NOT NULL,
    comment_creation DATETIME NOT NULL,
    FOREIGN KEY (iteration_id) REFERENCES Iteration(iteration_id),
    FOREIGN KEY (profile_name) REFERENCES Profile(profile_name),
    PRIMARY KEY (comment_id)
)ENGINE=InnoDB;

