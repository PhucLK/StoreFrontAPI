import express from 'express'
import cors from 'cors'
import productRoutes from './routes/product'
import userRoutes from './routes/user'
import orderRoutes from './routes/order'
import bodyParser from 'body-parser'

const app: express.Application = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

productRoutes(app)
userRoutes(app)
orderRoutes(app)

// start the Express server
app.listen(port, function () {
    console.log(`starting app on: ${port}`)
})

export default app
