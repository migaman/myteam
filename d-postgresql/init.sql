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
	, playernr	INT				NULL
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

INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('David', 'Zibung', 1, 1);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Lazar', 'Cirkovic', 2, 3);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Stefan', 'Knezevic', 3, 4);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Lucas', 'Alves', NULL, 5);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Remo', 'Arnold', NULL, 6);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Claudio', 'Lustenberger', NULL, 7);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Olivier', 'Custodio', NULL, 8);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Tomi', 'Juric', NULL, 9);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Daniel', 'Follonier', NULL, 10);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Pascal', 'Schürpf', NULL, 11);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Nicolas', 'Schindelholz', NULL, 14);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Marvin', 'Schulz', NULL, 15);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Simon', 'Grether', NULL, 17);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Christian', 'Schneuwly', NULL, 19);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Shkelqim', 'Demhasaj', NULL, 20);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Jonas', 'Omlin', NULL, 21);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Simon', 'Enzler', NULL, 22);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Ruben', 'Vargas', NULL, 24);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Yannik', 'Schmid', NULL, 25);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Christian', 'Schwegler', NULL, 27);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Dereck', 'Kutesa', NULL, 29);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Hekuran', 'Kryeziu', NULL, 31);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Silvan', 'Sidler', NULL, 34);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Filip', 'Ugrinic', NULL, 35);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Dren', 'Feka', NULL, 36);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Idriz', 'Voca', NULL, 42);
INSERT INTO mt_player(firstname, lastname, idaccount, playernr) VALUES ('Francisco', 'Rodriguez', NULL, 68);



INSERT INTO mt_appointment (startdate, enddate, description) VALUES ('2018-04-19 20:00', '2018-04-19 22:00', 'FC Lausanne-Sport vs. FC Luzern');
INSERT INTO mt_appointment (startdate, enddate, description) VALUES ('2018-04-22 16:00', '2018-04-22 18:00', 'FC Luzern vs. FC Zürich');
INSERT INTO mt_appointment (startdate, enddate, description) VALUES ('2018-04-28 19:00', '2018-04-28 19:00', 'BSC Young Boys vs. FC Luzern');
INSERT INTO mt_appointment (startdate, enddate, description) VALUES ('2018-05-05 19:00', '2018-05-05 21:00', 'FC Luzern vs. FC Lugano');
INSERT INTO mt_appointment (startdate, enddate, description) VALUES ('2018-05-09 20:00', '2018-05-09 22:00', 'FC St. Gallen 1879 vs. FC Luzern');
INSERT INTO mt_appointment (startdate, enddate, description) VALUES ('2018-05-13 16:00', '2018-05-13 18:00', 'FC Luzern vs. Grasshoppers');
INSERT INTO mt_appointment (startdate, enddate, description) VALUES ('2018-05-19 19:00', '2018-05-19 21:00', 'FC Basel 1893 vs. FC Luzern');


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

INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (4, 1, 2);
INSERT INTO mt_playerappointment (idappointment, idplayer, idparticipationstatus) VALUES (5, 1, 3);