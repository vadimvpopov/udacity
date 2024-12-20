/* Replace with your SQL commands */
CREATE TABLE OrderItems (id serial primary key, orderId bigint REFERENCES Orders(id), productId bigint REFERENCES Products(id), quantity integer);