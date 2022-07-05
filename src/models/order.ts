import client from '../database/index'

type Order = {
    id: number
    product_id: number
    quantity: number
    user_id: number
    status: string
}

class OrderStore {
    async orderByUser(user_id: number): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()

            const sql = 'SELECT * FROM orders WHERE user_id = $1'

            const result = await conn.query(sql, [user_id])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async completedOrders(user_id: number): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()

            const sql = 'SELECT * FROM orders WHERE status=$1 and user_id = $2'

            const result = await conn.query(sql, ['Completed', user_id])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not find order completed. Error: ${err}`)
        }
    }
}

export { Order, OrderStore }
