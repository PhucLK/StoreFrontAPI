import { Order_ProductStore } from '../models/order_product'
import supertest from 'supertest'
import app from '../index'
import { User, UserStore } from '../models/user'

const userStore = new UserStore()
const store = new Order_ProductStore()

const user: User = {
    id: 1,
    firstname: 'phuc',
    lastname: 'tran',
    username: 'phuc',
    password: 'phuc123'
}

describe('Test order endpoint responses', () => {
    let token: string
    beforeAll(async () => {
        const [_newUser, token_] = await userStore.create(user)
        token = token_
    })

    it('gets the /orders enpoint', (done: Function) => {
        supertest(app)
            .get('/orders')
            .set('authorization', 'Toke ' + token)
            .then((result) => {
                expect(result.status).toBe(200)
            })
        done()
    })
    it('gets the /completedorders enpoint', (done: Function) => {
        supertest(app)
            .get('/completedorders')
            .set('authorization', 'Toke ' + token)
            .then((result) => {
                expect(result.status).toBe(200)
            })
        done()
    })
})

const userOrders: Object[] = [
    { id: 1, name: 'Summer 1', quantity: 1, status: 'completed' },
    { id: 2, name: 'Summer 2', quantity: 3, status: 'active' },
    { id: 3, name: 'Summer 3', quantity: 5, status: 'completed' },
    { id: 4, name: 'Summer 4', quantity: 2, status: 'completed' },
    { id: 5, name: 'Summer 5', quantity: 6, status: 'completed' },
    { id: 6, name: 'Summer 5', quantity: 1, status: 'completed' },
    { id: 7, name: 'Summer 2', quantity: 4, status: 'completed' }
]

const completedOrder: Object[] = [
    { id: 1, name: 'Summer 1', quantity: 1 },
    { id: 3, name: 'Summer 3', quantity: 5 },
    { id: 4, name: 'Summer 4', quantity: 2 },
    { id: 5, name: 'Summer 5', quantity: 6 },
    { id: 6, name: 'Summer 5', quantity: 1 },
    { id: 7, name: 'Summer 2', quantity: 4 }
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
        expect(result).toEqual(userOrders)
    })

    it('completedOrders method should return list of completed orders by user', async () => {
        const result = await store.completedOrders(1)
        expect(result).toEqual(completedOrder)
    })
})
