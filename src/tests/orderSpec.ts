import { Order, OrderStore } from '../models/order'

const store = new OrderStore()

const orders: Order[] = [
    {
        id: 1,
        quantity: 1,
        status: 'completed',
        product_id: 1,
        user_id: 1
    }
]

const completedOrder: Order[] = [
    {
        id: 1,
        quantity: 1,
        status: 'completed',
        product_id: 1,
        user_id: 1
    },
    {
        id: 2,
        quantity: 2,
        status: 'completed',
        product_id: 2,
        user_id: 1
    },
    {
        id: 3,
        quantity: 3,
        status: 'completed',
        product_id: 3,
        user_id: 1
    },
    {
        id: 4,
        quantity: 4,
        status: 'completed',
        product_id: 4,
        user_id: 1
    },
    {
        id: 5,
        quantity: 5,
        status: 'completed',
        product_id: 5,
        user_id: 1
    },
    {
        id: 6,
        quantity: 5,
        status: 'completed',
        product_id: 5,
        user_id: 1
    },
    {
        id: 7,
        quantity: 6,
        status: 'completed',
        product_id: 6,
        user_id: 1
    }
]

describe('Order Model', () => {
    it('should have an orderByUser method', () => {
        expect(store.orderByUser).toBeDefined()
    })

    it('should have a completedOrders method', () => {
        expect(store.completedOrders).toBeDefined()
    })

    it('orderByUser method should return a list of orders by user', async () => {
        const result = await store.orderByUser(1)
        expect(result).toEqual(completedOrder)
    })

    it('completedOrders method should return list of completed orders by user', async () => {
        const result = await store.completedOrders(1)
        expect(result).toEqual(completedOrder)
    })
})
