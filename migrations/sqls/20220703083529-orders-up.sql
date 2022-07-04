/* Replace with your SQL commands */
create table 
orders(id serial primary key,
    quantity int, 
    status varchar(100),
    product_id int REFERENCES products(id),
    user_id int REFERENCES users(id)
);
insert into orders(quantity,product_id,user_id,status) values(1,1,1,'completed');

insert into orders(quantity,product_id,user_id,status) values(2,2,1,'completed');

insert into orders(quantity,product_id,user_id,status) values(3,3,1,'completed');

insert into orders(quantity,product_id,user_id,status) values(4,4,1,'completed');

insert into orders(quantity,product_id,user_id,status) values(5,5,1,'completed');

insert into orders(quantity,product_id,user_id,status) values(5,5,1,'completed');

insert into orders(quantity,product_id,user_id,status) values(6,6,1,'completed');