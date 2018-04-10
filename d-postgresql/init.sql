DROP TABLE IF EXISTS mt_session;
DROP TABLE IF EXISTS mt_account;


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
);

CREATE UNIQUE INDEX account_email_uni_idx ON mt_account (email) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX account_github_uni_idx ON mt_account (github) WHERE github IS NOT NULL;

INSERT INTO mt_account(email, password) VALUES ('test1@test.ch', '$2a$10$Tueru7iaKxPhErbmlGjO7.LtpM7fAMuabvqWIZYggns567bMVxy1O');
INSERT INTO mt_account(email, password) VALUES ('test2@test.ch', '$2a$10$gfTlazVqZSMAJX5YgXC/3u4yS3PYKoyBDeYfQDiyitJDrS2QogsVO');
INSERT INTO mt_account(email, password) VALUES ('test3@test.ch', '$2a$10$5ueCHAab.vj/19UK2Wq7w.6bkgC1De1c9urfo5knugfjFY4AaH71S');