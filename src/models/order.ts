// @ts-ignore
import client from '../database/index'

type Order = {
    id: number,
    product_id: string,
    quantity: number,
    user_id: string,
    status: string
}

//insert into orders(product_id,quantity,user_id,status) values(1,4,1,'completed');
class OrderStore {

     async orderByUser(id: string, user_id: string): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE id = $1 user_id = $2'

            const result = await conn.query(sql, [id, user_id])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

     async completedOrders(user_id: string): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE  WHERE status=$1 user_id = $2'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, ['Completed', user_id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order completed. Error: ${err}`)
        }
    }

}

export { Order, OrderStore }