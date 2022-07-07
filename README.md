# Getting Started with StoreFrontAPI

## Available Scripts

In the project directory, you can run:

### `npm run start`

Start application

### `npm run test`

Test products enpoint and funtionalities
Test orders enpoint and funtionalities
Test users enpoint and funtionalities

### `npm run build`

Builds the app for production to the `build` folder
Complie all .ts file to .js file

### `npm run lint`

Making code more consistent and avoiding bugs.

### `npm run prettier`

Formatting \*.ts files in project

### `npm run allin`

Formating file , build and testing

## Database setup

create database store_dev;
create database store_test;
create user phuc with password 'phuc123';
grant all privileges on database store_dev to phuc;
grant all privileges on database store_test to phuc;

## products table

CREATE TABLE products(
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
price INTEGER NOT NULL,
category VARCHAR(50)
);

## users table

create table users(
id serial primary key,
firstName varchar(100),
lastname varchar(100),
username varchar(100) not null,
password varchar(100) not null
);

## orders table

create table orders(
id serial primary key,
status varchar(100),
user_id int REFERENCES users(id)
);

## order_products table

create table order_products(
id serial primary key,
order_id int REFERENCES orders(id),
product_id int REFERENCES products(id),
quantity int
);

#### Environment

POSTGRES_HOST=localhost
POSTGRES_DB=store_dev
POSTGRES_USER=phuc
POSTGRES_PASSWORD=phuc123
POSTGRES_TEST_DB=store_test
ENV=dev
DB_PORT=5432
TOKEN_SECRET=jsdiurwejsbb34534sfnf

#### APIs

## Get all products :

GET : http://localhost:3000/products

## Create new a product :

POST : http://localhost:3000/products
(Token Required)

## Get detail product :

GET : http://localhost:3000/products/:id

## Get popular products :

GET : http://localhost:3000/popular

## Get products by category :

GET : http://localhost:3000/category/:category

## Get all orders by user :

GET : http://localhost:3000/orders
(Token Required)

## Get completed orders :

GET : http://localhost:3000/completedorders
(Token Required)

## Get all users :

GET : http://localhost:3000/users
(Token Required)

## Get a detail user :

GET : http://localhost:3000/users/:id
(Token Required)

## Create new user :

POST : http://localhost:3000/users
