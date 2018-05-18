DROP DATABASE IF EXISTS forum;
CREATE DATABASE forum;
USE forum;

CREATE TABLE poster
(
    username VARCHAR(20) UNIQUE NOT NULL,
    pass     BINARY(60)         NOT NULL,
    PRIMARY KEY(username)
);

CREATE TABLE topic
(
    topicID     INT                 AUTO_INCREMENT,
    topicName   VARCHAR(20)         NOT NULL,
    topicDesc   VARCHAR(100)        NOT NULL,
    PRIMARY KEY(topicID)
);

CREATE TABLE thread
(
    threadID        INT                 AUTO_INCREMENT,
    threadTitle     VARCHAR(20)         NOT NULL,
    threadContent   TEXT                NOT NULL,
    topicID         INT                 NOT NULL,
    threadPoster      VARCHAR(20)         NOT NULL,
    FOREIGN KEY (topicID) REFERENCES topic (topicID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (threadPoster) REFERENCES poster(username) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(threadID)
);

CREATE TABLE reply
(
    replyID         INT                 AUTO_INCREMENT,
    replyContent    TEXT                NOT NULL,
    threadID        INT                 NOT NULL,
    replyPoster     VARCHAR(20)         NOT NULL,
    FOREIGN KEY (threadID) REFERENCES thread (threadID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (replyPoster) REFERENCES poster(username) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(replyID)
);

INSERT INTO poster
    (username, pass)
    VALUES
    ('gavinski','$2a$10$BhNQWSSyHNYp3kOcblz5ouIr2Lat3XBD/CIivC40.gTCO4IBzEgxi'),
    ('kewlDude','$2a$10$dtyPZG3z773UgufBczxGcO4miHRXEq88BmqjKsrl4zCIB/iLA0o9u');

INSERT INTO topic
    (topicName,topicDesc)
    VALUES
    ('General','A place to talk about anything');

INSERT INTO thread (threadTitle,threadContent,topicID,threadposter) VALUES
    ('What Up','Welcome to the place', (SELECT topicID from topic WHERE topicName='General'), (SELECT username from poster WHERE username='gavinski')),
    ('Im kewl','Im a kewl dude', (SELECT topicID from topic WHERE topicName='General'), (SELECT username from poster WHERE username='kewlDude'));

INSERT INTO reply (replyContent,threadID,replyposter) VALUES
    ('Hello',       (SELECT threadID from thread WHERE threadTitle='What Up'),(SELECT username from poster WHERE username='kewlDude')),
    ('No you arnt', (SELECT threadID from thread WHERE threadTitle='Im kewl'),(SELECT username from poster WHERE username='gavinski'));


