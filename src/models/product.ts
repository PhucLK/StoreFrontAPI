import client from '../database/index'

type Product = {
    id : string,
    name: string,
    price: number,
    category: string
}
//insert into products(name,price,category) values('BX 2900', 400, 'Tee');
class ProductStore {

     async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows

        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

     async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]

        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

     async create(p: Partial<Product>): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn
                .query(sql, [p.name, p.price, p.category])
            const product = result.rows[0]
            conn.release()
            return product

        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
        }
    }

     async popularProducts(): Promise<Product[]> {
        try {
            const sql = 'select p.name,p.price,p.category,count(o.id) as order_quantity '
                + 'from products as p inner join orders o '
                + 'on p.id=o.product_id group by p.id order by count(o.id) desc limit 5'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows

        } catch (err) {
            throw new Error(`Could not find.  Error: ${err}`)
        }
    }

     async productByCategory(category: string): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products WHERE category = $1'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [category])
            conn.release()
            return result.rows

        } catch (err) {
            throw new Error(`Could not add  Error: ${err}`)
        }
    }
}

export { Product, ProductStore }