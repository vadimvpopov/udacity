# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : /api/products returns list of all the products [GET]
- Show: /api/products/:id returns info about specific product [GET]
- Create: /api/products creates a new product description (product fields in body)[POST] [token required]
-  /api/products/most-popular-products [GET] Top 5 most popular products 
-  /api/products/category-products/:category [GET] Products by category (args: product category)


#### Users
- Index /api/users show all the user (JWT token) [GET] [token required]
- Show /api/users/:userId show spcified user [GET][token required]
- Create /api/users create a new user (params in body) [POST] 
- Authenticate api/authenticate authenticate user by user info (name and password) in body [POST]


#### Orders
- /api/orders/order/current Current Order by user (args: user id in token) [token required]
- /api/orders Completed Orders by user (args: user id in token)[token required]
- /api/orders/order/items - adds a new prouct item to the user's current item, creating one if required (args: user id, product id, quantity in body) [POST] [token required]
- /api/orders/order/close - closing currently active order for the user (args: user id in token) [PUT] [token required]


## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
CREATE TABLE Products (id serial primary key, name text not null, price decimal not null, category varchar(20));

#### User
- id
- firstName
- lastName
- password
CREATE TABLE Users (id serial primary key, firstName varchar(50) not null, lastName varchar(50) not null, password varchar(10) not null);

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

CREATE TABLE Orders (id serial primary key, userId bigint REFERENCES Users(id), status varchar(15));
CREATE TABLE OrderItems (id serial primary key, orderId bigint REFERENCES Orders(id), productId bigint REFERENCES Products(id), quantity integer);
