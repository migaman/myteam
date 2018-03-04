https://stackoverflow.com/questions/549/the-definitive-guide-to-form-based-website-authentication
https://www.owasp.org/index.php/Main_Page

/*
A salt is a random set of bytes of a fixed length that is added to the input of a hash algorithm.
Adding a random salt to a hash ensures that the same password will produce many different hashes.
The salt is usually stored in the database, together with the result of the hash function. Salting a hash is good for a number of reasons:
Salting makes sure that the same password does not result in the same hash. This makes sure you cannot determine if two users have the same password. And, even more important, you cannot determine if the same person uses the same password across different systems

The goal of the salt is only to prevent pre-generated databases 
from being created, it doesn't need to be encrypted or obscured 
in the database. You can store it in plaintext. 
The goal is to force the attacker to have to crack the hashes 
once he gets the database, 
instead of being able to just look them all up in a rainbow table.
*/

--> you should design your system such that the only way 
--> they can get at the salts is by breaking into the database

/*
Update: As of January 2017, 
	the state-of-the-art hashing algorithm of choice is Argon2
	, which won the Password Hashing Competition.
*/

--salt = Store salt in plaintext

CREATE TABLE mt_account
(
	  idaccount	INTEGER			NOT NULL	SERIAL
	, email		VARCHAR(100)	NOT NULL	UNIQUE 
	, passhash	VARCHAR(100)
	, salt		VARCHAR(100)
	
);

INSERT INTO mt_account(email, passhash, salt) VALUES ('mikee@bluewin.ch', '', '');