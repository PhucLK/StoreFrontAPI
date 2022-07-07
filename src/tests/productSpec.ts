import supertest from 'supertest'
import app from '../index'
import { Product, ProductStore } from '../models/product'
import { User, UserStore } from '../models/user'

const store = new ProductStore()
const userStore = new UserStore()

const user: Partial<User> = {
    firstname: 'phuc',
    lastname: 'tran',
    username: 'phuc',
    password: 'phuc123'
}
const product: Partial<Product> = {
    name: 'Summer 1',
    price: 450,
    category: 'Shirt'
}
const newProduct: Product = {
    id: 7,
    name: 'Summer 1',
    price: 450,
    category: 'Shirt'
}
const products: Product[] = [
    { id: 1, name: 'Summer 1', price: 450, category: 'Shirt' },
    { id: 2, name: 'Summer 2', price: 450, category: 'Tee' },
    { id: 3, name: 'Summer 3', price: 450, category: 'Shirt' },
    { id: 4, name: 'Summer 4', price: 450, category: 'Shoes' },
    { id: 5, name: 'Summer 5', price: 450, category: 'Shirt' },
    { id: 6, name: 'Summer 6', price: 450, category: 'Shirt' }
]
const categoryProducts: Product[] = [
    { id: 1, name: 'Summer 1', price: 450, category: 'Shirt' },
    { id: 3, name: 'Summer 3', price: 450, category: 'Shirt' },
    { id: 5, name: 'Summer 5', price: 450, category: 'Shirt' },
    { id: 6, name: 'Summer 6', price: 450, category: 'Shirt' },
    { id: 7, name: 'Summer 1', price: 450, category: 'Shirt' }
]
const popularProducts: Object[] = [
    {
        name: 'Summer 5',
        price: 450,
        category: 'Shirt',
        order_quantity: '7'
    },
    {
        name: 'Summer 2',
        price: 450,
        category: 'Tee',
        order_quantity: '7'
    },
    {
        name: 'Summer 3',
        price: 450,
        category: 'Shirt',
        order_quantity: '5'
    },
    {
        name: 'Summer 4',
        price: 450,
        category: 'Shoes',
        order_quantity: '2'
    },
    {
        name: 'Summer 1',
        price: 450,
        category: 'Shirt',
        order_quantity: '1'
    }
]

describe('Test product endpoint responses', () => {
    let token: string
    //get token before testing
    beforeAll(async () => {
        const [_newUser, token_] = await userStore.create(user)
        token = token_
    })

    it('get the /products enpoint', (done: Function) => {
        supertest(app)
            .get('/products')
            .then((result) => {
                expect(result.status).toBe(200)
            })
        done()
    })

    it('get the /products/:id enpoint', (done: Function) => {
        supertest(app)
            .get('/products/1')
            .then((result) => {
                expect(result.status).toBe(200)
            })
        done()
    })

    it('post the /products enpoint', (done: Function) => {
        supertest(app)
            .post('/products')
            .set('authorization', 'Toke ' + token)
            .send(product)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        done()
    })
    it('get the /popular enpoint', (done: Function) => {
        supertest(app)
            .get('/popular')
            .then((result) => {
                expect(result.status).toBe(200)
            })
        done()
    })

    it('get the /category/:category enpoint', (done: Function) => {
        supertest(app)
            .get('/category/Tee')
            .then((result) => {
                expect(result.status).toBe(200)
            })
        done()
    })
})

describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined()
    })

    it('should have a show method', () => {
        expect(store.show).toBeDefined()
    })

    it('should have a create method', () => {
        expect(store.create).toBeDefined()
    })

    it('should have a popularProducts method', () => {
        expect(store.popularProducts).toBeDefined()
    })

    it('should have a productByCategory method', () => {
        expect(store.productByCategory).toBeDefined()
    })

    it('create method should add a product', async () => {
        const result = await store.create(product)
        expect(result).toEqual(newProduct)
    })

    it('method should return list of products', async () => {
        const result = await store.index()
        expect(result).toEqual([...products, newProduct])
    })
    it('method should return a detail product', async () => {
        const result = await store.show('7')
        expect(result).toEqual(newProduct)
    })
    it('method should return list of popular products', async () => {
        const result = await store.popularProducts()
        expect(result).toEqual(popularProducts)
    })
    it('method should return list of product by category', async () => {
        const result = await store.productByCategory('Shirt')
        expect(result).toEqual(categoryProducts)
    })
})
