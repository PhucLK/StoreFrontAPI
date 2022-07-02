import { Product, ProductStore } from '../models/product';
import { Order, OrderStore } from '../models/order';
import { User, UserStore } from '../models/user';


const orderStore = new OrderStore()
const store = new ProductStore()
const userStore = new UserStore()

const order: Partial<Order> = {
    product_id: '1',
    quantity: 1,
    status: 'completed',
    user_id: '1'
}

const user: Partial<User> = {
    username: 'phuc',
    password: 'phuc123'
}



const product: Partial<Product> = {
    name: 'Bridge to Terabithia',
    price: 250,
    category: 'Katherine Paterson',
}
const newProduct: Product = {
    id: '1',
    name: 'Bridge to Terabithia',
    price: 250,
    category: 'Katherine Paterson',
}

describe("Product Model", () => {

    // beforeAll(() => {
    //     store.create(product)
    //     userStore.create(user)
    //     orderStore.
    // });


    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should return list of popular Products', () => {
        expect(store.popularProducts).toBeDefined();
    });

    it('should return list of popular Products by category', () => {
        expect(store.productByCategory).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create(product);
        expect(result).toEqual(newProduct);
    });

    it('method should return list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([newProduct]);
    });
    it('method should return a detail product', async () => {
        const result = await store.show('1');
        expect(result).toEqual(newProduct);
    });
    it('method should return list of popular products', async () => {
        const result = await store.popularProducts();
        expect(result).toEqual([newProduct]);
    });
    it('method should return list of product by category', async () => {
        const result = await store.productByCategory('New');
        expect(result).toEqual([newProduct]);
    });

});

