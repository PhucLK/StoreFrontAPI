import client from '../database/index'

type Product = {
    id: number
    name: string
    price: number
    category: string
}

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
            // @ts-ignore
            const conn = await client.connect()

            const sql = 'SELECT * FROM products WHERE id=($1)'

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]

        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(p: Partial<Product>): Promise<Product> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'

            const result = await conn.query(sql, [p.name, p.price, p.category])

            const product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
        }
    }

    async popularProducts(): Promise<Object[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()

            const sql =
                'select p.name,p.price,p.category,sum(o.quantity) as order_quantity' +
                ' from products as p inner join orders o ' +
                'on p.id=o.product_id group by p.id order by sum(o.quantity) desc limit 5'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not find.  Error: ${err}`)
        }
    }

    async productByCategory(category: string): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()

            const sql = 'SELECT * FROM products WHERE category = $1'

            const result = await conn.query(sql, [category])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not add  Error: ${err}`)
        }
    }
}

export { Product, ProductStore }
