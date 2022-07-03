/* Replace with your SQL commands */
create table 
orders(id serial primary key,
    quantity int, status varchar(100),
    product_id int REFERENCES products(id),
    user_id int REFERENCES users(id)
)