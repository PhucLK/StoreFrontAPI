import express, { Request, Response } from 'express'
import verifyAuthToken from '../headers/order'
import { Order_ProductStore } from '../models/order_product'

const store = new Order_ProductStore()

const orderByUser = async (req: Request, res: Response) => {
    try {
        const orders = await store.orderByUser(req.body.id)
        orders.length > 0 ? res.json(orders) : res.json({ message: 'Can not find any orders' })
    } catch (error: any) {
        res.status(500)
        res.json(error.toString())
    }
}

const completedOrders = async (req: Request, res: Response) => {
    try {
        const orders = await store.completedOrders(req.body.id)
        orders.length > 0 ? res.json(orders) : res.json({ message: 'Can not find any orders' })
    } catch (error: any) {
        res.status(500)
        res.json(error.toString())
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, orderByUser)
    app.get('/completedorders', verifyAuthToken, completedOrders)
}

export default orderRoutes
