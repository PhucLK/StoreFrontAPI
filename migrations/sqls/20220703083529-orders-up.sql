/* Replace with your SQL commands */
create table 
orders(
    id serial primary key,
    status varchar(100),
    user_id int REFERENCES users(id)
);
insert into orders(user_id,status) values(1,'completed');

insert into orders(user_id,status) values(1,'active');

insert into orders(user_id,status) values(1,'completed');

insert into orders(user_id,status) values(1,'completed');

insert into orders(user_id,status) values(1,'completed');

insert into orders(user_id,status) values(1,'completed');

insert into orders(user_id,status) values(1,'completed');