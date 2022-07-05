import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import verifyAuthToken from '../headers/verifyToken'

const store = new UserStore()
const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        users.length > 0 ? res.json(users) : res.json({ 'message': 'Can not find any users' })
    } catch (error: any) {
        res.status(500)
        res.json(error.toString())
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.params.id)
        user ? res.json(user) : res.json({ 'message': 'Can not find user' })
    } catch (error: any) {
        res.status(500)
        res.json(error.toString())
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: Partial<User> = {
            username: req.body.username,
            password: req.body.password
        }
        const [newUser, token] = await store.create(user)
        res.json({ user: newUser, token })
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
}

export default userRoutes
