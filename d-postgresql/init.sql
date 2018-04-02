CREATE TABLE mt_example
(
	 idexample	SERIAL 
	, exampletext	VARCHAR(100) NOT NULL
);

INSERT INTO mt_example(exampletext) VALUES ('db value 1');
INSERT INTO mt_example(exampletext) VALUES ('db value 2');
INSERT INTO mt_example(exampletext) VALUES ('db value 3');


CREATE TABLE mt_session (
	"sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE mt_session ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;


CREATE TABLE mt_account
(
	  idaccount	SERIAL
	, email		VARCHAR(100)	NOT NULL	UNIQUE 
	, password	VARCHAR(100)	
	, username	VARCHAR(100)	NULL
    , gender	VARCHAR(100)	NULL
    , location  VARCHAR(100)	NULL
    , website   VARCHAR(100)	NULL
	, picture   VARCHAR(100)	NULL
	, createdat TIMESTAMPTZ NOT NULL DEFAULT NOW()
	, updatedat TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO mt_account(email, password) VALUES ('test1@test.ch', '$2a$10$Tueru7iaKxPhErbmlGjO7.LtpM7fAMuabvqWIZYggns567bMVxy1O');
INSERT INTO mt_account(email, password) VALUES ('test2@test.ch', '$2a$10$gfTlazVqZSMAJX5YgXC/3u4yS3PYKoyBDeYfQDiyitJDrS2QogsVO');
INSERT INTO mt_account(email, password) VALUES ('test3@test.ch', '$2a$10$5ueCHAab.vj/19UK2Wq7w.6bkgC1De1c9urfo5knugfjFY4AaH71S');