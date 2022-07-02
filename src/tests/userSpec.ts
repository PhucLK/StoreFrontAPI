import { UserStore } from '../models/user';

const store = new UserStore()

const user = {
    username: 'phuc',
    password: 'phuc123',
}


describe("User Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should create a user', async () => {

        const [newUser, token] = await store.create(user);
        //expect(result).toEqual(user);
    });

    it('should return list of user', async () => {

        const result = await store.index();
        //expect(result).toEqual(user);
    });

    it('should return a detail user', async () => {

        const result = await store.show('1');
        //expect(result).toEqual(product);
    });

});