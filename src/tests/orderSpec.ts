import { OrderStore } from '../models/order';


const store = new OrderStore()

const order = {
    name: 'Bridge to Terabithia',
    price: 250,
    category: 'Katherine Paterson',
}


describe("Order Model", () => {
    it('should have an orderByUser method', () => {
        expect(store.orderByUser).toBeDefined();
    });

    it('should have a completedOrders method', () => {
        expect(store.completedOrders).toBeDefined();
    });


    it('orderByUser method should ', async () => {

        const result = await store.orderByUser('1', '1');
        //expect(result).toEqual([product]);
    });

    it('completedOrders method should ', async () => {

        const result = await store.completedOrders('1');
        //expect(result).toEqual([product]);
    });

});

