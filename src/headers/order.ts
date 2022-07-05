import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    id: string
}

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization || ' '
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload
        req.body.id = decoded.id
        next()
    } catch (error) {
        res.status(401).json({ message: 'unvalid token' })
    }
}

export default verifyAuthToken
