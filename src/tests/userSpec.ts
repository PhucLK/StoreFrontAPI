import { User, UserStore } from '../models/user'

const store = new UserStore()

const user: User = {
    id: 1,
    username: 'phuc',
    password: 'phuc123'
}

describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined()
    })

    it('should have a show method', () => {
        expect(store.show).toBeDefined()
    })

    it('should have a create method', () => {
        expect(store.create).toBeDefined()
    })

    it('create method should create a new user', async () => {
        const [newUser, token] = await store.create(user)
        expect(newUser.username).toEqual(user.username)
        expect(token).not.toEqual('')
    })

    it('should return list of users', async () => {
        const result = await store.index()
        expect(result[0].username).toEqual(user.username)
    })

    it('should return a detail user', async () => {
        const result = await store.show('1')
        expect(result).toEqual(user)
    })
})
