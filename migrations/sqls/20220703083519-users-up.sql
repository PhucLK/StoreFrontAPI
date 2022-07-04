/* Replace with your SQL commands */
create table 
users(id serial primary key, 
    username varchar(100), 
    password varchar(100)
);
insert into users(username,password) values('phuc','phuc123');