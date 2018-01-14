CREATE TABLE mt_example
(
	 idexample	SERIAL 
	, exampletext	VARCHAR(100) NOT NULL
);

INSERT INTO mt_example(exampletext) VALUES ('db value 1');
INSERT INTO mt_example(exampletext) VALUES ('db value 2');
INSERT INTO mt_example(exampletext) VALUES ('db value 3');