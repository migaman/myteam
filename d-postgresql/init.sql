DROP TABLE IF EXISTS mt_playerappointment;
DROP TABLE IF EXISTS mt_player;
DROP TABLE IF EXISTS mt_session;
DROP TABLE IF EXISTS mt_account;
DROP TABLE IF EXISTS mt_appointment;
DROP TABLE IF EXISTS mt_participationstatus;


CREATE TABLE mt_session (
	sid 	VARCHAR 		NOT NULL COLLATE "default",
	sess 	JSON 			NOT NULL,
	expire 	TIMESTAMP(6) 	NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE mt_session ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE TABLE mt_account
(
	  idaccount	SERIAL
	, email		VARCHAR(100)	NULL 
	, password	VARCHAR(100)	NULL
	, username	VARCHAR(100)	NULL
    , gender	VARCHAR(100)	NULL
    , location  VARCHAR(100)	NULL
    , website   VARCHAR(100)	NULL
	, picture   VARCHAR(100)	NULL
	, github   VARCHAR(100)	NULL
	, githubaccesstoken   VARCHAR(100)	NULL
	, passwordresettoken	VARCHAR(100)	NULL
	, passwordresetexpires	TIMESTAMPTZ		NULL
	, createdat TIMESTAMPTZ NOT NULL DEFAULT NOW()
	, updatedat TIMESTAMPTZ NOT NULL DEFAULT NOW()
	, CONSTRAINT mt_account_pk PRIMARY KEY(idaccount)
);

CREATE UNIQUE INDEX account_email_uni_idx ON mt_account (email) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX account_github_uni_idx ON mt_account (github) WHERE github IS NOT NULL;


CREATE TABLE mt_player
(
	  idplayer	SERIAL
	, firstname	VARCHAR(100)	NOT NULL 
	, lastname	VARCHAR(100)	NOT NULL 
	, idaccount	INT				NULL	REFERENCES mt_account(idaccount)
	, CONSTRAINT mt_player_pk PRIMARY KEY(idplayer)
);


CREATE TABLE mt_appointment
(
	  idappointment	SERIAL
	, startdate		TIMESTAMPTZ	NOT NULL
	, enddate		TIMESTAMPTZ	NOT NULL
	, description	VARCHAR(100) NOT NULL
	, CONSTRAINT mt_appointment_pk PRIMARY KEY(idappointment)
);



CREATE TABLE mt_participationstatus
(
	  idparticipationstatus		INT	
	, participationstatus		VARCHAR(100)
	, CONSTRAINT mt_participationstatus_pk PRIMARY KEY(idparticipationstatus)
);


CREATE TABLE mt_playerappointment
(
	  idappointment	INT NOT NULL	REFERENCES mt_appointment(idappointment)
	, idplayer		INT NOT NULL 	REFERENCES mt_player (idplayer)
	, idparticipationstatus	INT NULL	REFERENCES mt_participationstatus(idparticipationstatus)
	, CONSTRAINT mt_playerappointment_pk PRIMARY KEY(idappointment, idplayer)
);


INSERT INTO mt_account(email, password) VALUES ('test1@test.ch', '$2a$10$Tueru7iaKxPhErbmlGjO7.LtpM7fAMuabvqWIZYggns567bMVxy1O');
INSERT INTO mt_account(email, password) VALUES ('test2@test.ch', '$2a$10$gfTlazVqZSMAJX5YgXC/3u4yS3PYKoyBDeYfQDiyitJDrS2QogsVO');
INSERT INTO mt_account(email, password) VALUES ('test3@test.ch', '$2a$10$5ueCHAab.vj/19UK2Wq7w.6bkgC1De1c9urfo5knugfjFY4AaH71S');


INSERT INTO mt_player(firstname, lastname, idaccount) VALUES ('David', 'Zibung', NULL);
INSERT INTO mt_player(firstname, lastname, idaccount) VALUES ('Lazar', 'Cirkovic', NULL);
INSERT INTO mt_player(firstname, lastname, idaccount) VALUES ('Stefan', 'Knezevic', NULL);
INSERT INTO mt_player(firstname, lastname, idaccount) VALUES ('Lucas', 'Alves', NULL);
INSERT INTO mt_player(firstname, lastname, idaccount) VALUES ('Nicolas', 'Schindelholz', NULL);


INSERT INTO mt_appointment (startdate, enddate, description) VALUES ('2018-04-13 19:30', '2018-04-13 21:30', 'FC Meggen - FC Adligenswil');
INSERT INTO mt_appointment (startdate, enddate, description) VALUES ('2018-04-20 19:30', '2018-04-20 21:30', 'Inter Altstadt - FC Meggen');
INSERT INTO mt_appointment (startdate, enddate, description) VALUES ('2018-04-27 19:30', '2018-04-27 21:30', 'OG Kickers - FC Meggen');


INSERT INTO mt_participationstatus (idparticipationstatus, participationstatus) VALUES (1, 'Yes');
INSERT INTO mt_participationstatus (idparticipationstatus, participationstatus) VALUES (2, 'No');
INSERT INTO mt_participationstatus (idparticipationstatus, participationstatus) VALUES (3, 'Maybe');


INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (1, 1, 1);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (1, 2, 1);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (1, 3, 1);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (1, 4, 2);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (1, 5, 3);

INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (2, 1, NULL);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (2, 2, 3);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (2, 3, 3);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (2, 4, 2);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (2, 5, 3);

INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (3, 1, 1);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (3, 2, 1);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (3, 3, 1);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (3, 4, 1);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (3, 5, 1);