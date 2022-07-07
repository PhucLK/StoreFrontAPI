import client from '../database/index'

type Order_Product = {
    id: number
    product_id: number
    order_id: number
    quantity: number
}

class Order_ProductStore {
    async orderByUser(user_id: number): Promise<Object[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()

            const sql =
                'SELECT op.id,p.name,op.quantity,o.status ' +
                'FROM order_products op ' +
                'inner join orders o ' +
                'on o.id = op.order_id ' +
                'inner join products p on p.id = op.product_id ' +
                'WHERE o.user_id = $1'

            const result = await conn.query(sql, [user_id])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async completedOrders(user_id: number): Promise<Object[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()

            const sql =
                'SELECT op.id,p.name,op.quantity ' +
                'FROM order_products op ' +
                'inner join orders o ' +
                'on o.id = op.order_id ' +
                'inner join products p on p.id = op.product_id ' +
                'WHERE o.status=$1 and o.user_id = $2'

            const result = await conn.query(sql, ['completed', user_id])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not find order completed. Error: ${err}`)
        }
    }
}

export { Order_ProductStore, Order_Product }
