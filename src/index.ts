import express from 'express'
import routes from './Routes'
import 'reflect-metadata'

(function(){
    const app: express.Application = express()

    app.use(express.json())

    app.use(routes)
    
    app.listen(process.env.PORT || 3000, function(){
        console.log(process.env.PORT || 3000)
        console.log('API Ready')
    })
})()