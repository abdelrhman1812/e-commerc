process.on('uncaughtException', (err) => { console.log('err in code', err) })
import express from 'express'
import dbConnections from './database/db.connections.js'
import bootstrap from './src/modules/bootstrap.js'
import AppError from './src/utils/appError.js'
import globalErrorHandler from './src/utils/globalError.js'
const app = express()
const port = 3000

/* Global */

app.use(express.json())

/* Connections */

dbConnections()


/* Bootstrap */


bootstrap(app)






/* Err Handel Routes */
app.use('*', (req, res, next) => {
    next(new AppError(`route not found ${req.originalUrl}`, 404))
})


/* Err Handdilig */

app.use(globalErrorHandler)


process.on('unhandledRejection', (err) => {
    console.log('error', err)
})


app.get('/', (req, res) => res.send('Abdelrhman'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))