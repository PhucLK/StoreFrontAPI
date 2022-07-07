import supertest from 'supertest'
import app from '../index'
import { User, UserStore } from '../models/user'

const store = new UserStore()

const user: Partial<User> = {
    firstname: 'phuc',
    lastname: 'tran',
    username: 'phuc',
    password: 'phuc123'
}

const newUser: User = {
    id: 1,
    firstname: 'phuc',
    lastname: 'tran',
    username: 'phuc',
    password: 'phuc123'
}

describe('Test user endpoint responses', () => {
    let token: string
    //get token before testing
    beforeAll(async () => {
        const [_newUser, token_] = await store.create(user)
        token = token_
    })
    it('get the /users enpoint', (done: Function) => {
        supertest(app)
            .get('/users')
            .set('authorization', 'Toke ' + token)
            .then((result) => {
                expect(result.status).toBe(200)
            })
        done()
    })

    it('get the /users/:id enpoint', (done: Function) => {
        supertest(app)
            .get('/users/1')
            .set('authorization', 'Toke ' + token)
            .then((result) => {
                expect(result.status).toBe(200)
            })
        done()
    })

    it('post the /users enpoint', (done: Function) => {
        supertest(app)
            .post('/users')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        done()
    })
})

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
        const [newUser_, token_] = await store.create(user)
        expect(newUser_.username).toEqual(newUser.username)
        expect(token_).not.toEqual('')
    })

    it('should return list of users', async () => {
        const result = await store.index()
        expect(result[0].username).toEqual(newUser.username)
    })

    it('should return a detail user', async () => {
        const result = await store.show('1')
        expect(result).toEqual(newUser)
    })
})
