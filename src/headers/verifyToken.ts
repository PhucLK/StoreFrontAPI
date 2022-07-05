import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization || ' '
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET!)
        next()
    } catch (error) {
        res.status(401).json({ message: 'unvalid token' })
    }
}

export default verifyAuthToken
