/* Replace with your SQL commands */
-- create user phuc with password 'phuc123';
-- create database store_dev;
-- create database store_test;
-- grant all database privileges on database store_dev to phuc;
-- grant all database privileges on database store_test to phuc;

create table 
users(
    id serial primary key, 
    firstName varchar(100), 
    lastname varchar(100), 
    username varchar(100) not null,
    password varchar(100) not null
);
insert into users(firstName,lastname,username,password) values('phuc','tran','phuc','phuc123');