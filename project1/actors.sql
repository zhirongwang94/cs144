
DROP TABLE IF EXISTS CS144.Actors;



CREATE TABLE Actors (
	name VARCHAR(40), 
	movie VARCHAR(80), 
	year INTEGER, 
	role VARCHAR(40) );


LOAD DATA LOCAL INFILE './actors.csv' 
INTO TABLE Actors 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';


SELECT name FROM Actors 
WHERE movie="Die Another Day";