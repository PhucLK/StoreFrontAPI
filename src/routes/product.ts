import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import verifyAuthToken from '../headers/verifyToken'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index()
        products.length > 0
            ? res.json(products)
            : res.json({ message: 'Can not find any products' })
    } catch (error: any) {
        res.status(500)
        res.json(error.toString())
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.params.id)
        product ? res.json(product) : res.json({ message: 'Can not find product' })
    } catch (error: any) {
        res.status(500)
        res.json(error.toString())
    }
}

const popularProducts = async (req: Request, res: Response) => {
    try {
        const products = await store.popularProducts()
        products.length > 0
            ? res.json(products)
            : res.json({ message: 'Can not find any products' })
    } catch (error: any) {
        res.status(500)
        res.json(error.toString())
    }
}

const productByCategory = async (req: Request, res: Response) => {
    try {
        const products = await store.productByCategory(req.params.category)
        products.length > 0
            ? res.json(products)
            : res.json({ message: 'Can not find any products' })
    } catch (error: any) {
        res.status(500)
        res.json(error.toString())
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const article: Partial<Product> = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }
        const newArticle = await store.create(article)
        res.json(newArticle)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.get('/popular', popularProducts)
    app.get('/category/:category', productByCategory)
    app.post('/products', verifyAuthToken, create)
}

export default productRoutes
