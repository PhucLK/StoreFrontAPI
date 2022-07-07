/* Replace with your SQL commands */
create table 
order_products(
    id serial primary key,
    order_id int REFERENCES orders(id),
    product_id int REFERENCES products(id),
    quantity int
);
insert into order_products(order_id,product_id,quantity) values(1,1,1);

insert into order_products(order_id,product_id,quantity) values(2,2,3);

insert into order_products(order_id,product_id,quantity) values(3,3,5);

insert into order_products(order_id,product_id,quantity) values(4,4,2);

insert into order_products(order_id,product_id,quantity) values(5,5,6);

insert into order_products(order_id,product_id,quantity) values(5,5,1);

insert into order_products(order_id,product_id,quantity) values(6,2,4);