import client from '../database/index'

type Order = {
    id: number,
    product_id: number,
    quantity: number,
    user_id: number,
    status: string
}

//insert into orders(product_id,quantity,user_id,status) values(1,4,1,'completed');
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

    async completedOrders(status: string, user_id: number): Promise<Order[]> {
        //console.log(`SELECT * FROM orders WHERE status=${status} and user_id = ${user_id}`);
        try {
            const sql = 'SELECT * FROM orders WHERE status=$1 and user_id = $2'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, [status, user_id])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not find order completed. Error: ${err}`)
        }
    }

}

export { Order, OrderStore }