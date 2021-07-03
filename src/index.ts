import express from 'express'
import routes from './Routes'
import 'reflect-metadata'

(function(){
    const app: express.Application = express()

    app.use(express.json())

    app.use(routes)
    
    app.listen(80, function(){
        console.log('API Ready')
    })
})()