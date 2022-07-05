import { Product, ProductStore } from '../models/product'
const store = new ProductStore()

const products: Product[] = [
    { id: 1, name: 'Summer 1', price: 450, category: 'Shirt' },
    { id: 2, name: 'Summer 2', price: 450, category: 'Shirt' },
    { id: 3, name: 'Summer 3', price: 450, category: 'Shirt' },
    { id: 4, name: 'Summer 4', price: 450, category: 'Shirt' },
    { id: 5, name: 'Summer 5', price: 450, category: 'Shirt' },
    { id: 6, name: 'Summer 6', price: 450, category: 'Shirt' }
]
const popularProductList: Object[] = [
    {
        name: 'Summer 5',
        price: 450,
        category: 'Shirt',
        order_quantity: '10'
    },
    {
        name: 'Summer 6',
        price: 450,
        category: 'Shirt',
        order_quantity: '6'
    },
    {
        name: 'Summer 4',
        price: 450,
        category: 'Shirt',
        order_quantity: '4'
    },
    {
        name: 'Summer 3',
        price: 450,
        category: 'Shirt',
        order_quantity: '3'
    },
    {
        name: 'Summer 2',
        price: 450,
        category: 'Shirt',
        order_quantity: '2'
    }
]

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
        expect(result).toEqual(popularProductList)
    })
    it('method should return list of product by category', async () => {
        const result = await store.productByCategory('Shirt')
        expect(result).toEqual([...products, newProduct])
    })
})
