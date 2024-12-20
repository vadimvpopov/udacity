/* Replace with your SQL commands */
CREATE TABLE Orders (id serial primary key, userId bigint REFERENCES Users(id), status varchar(15));