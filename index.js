const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser') 
const jwt = require('jsonwebtoken')


// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const PORT = 3003
// const URLMONGO = "mongodb+srv://stox:assassin19982@cluster0.kfhet.mongodb.net/Movies" 
const URLMONGO = "mongodb://localhost:27017/Movies?readPreference=primary&appname=MongoDB%20Compass&ssl=false" 
mongoose.connect(URLMONGO, { useNewUrlParser: true,useUnifiedTopology: true },(error) => {
    if(!error){
        console.log("Success Connected");
    }else{
        console.log("Error connecting problem");
    }
})


// Routers
const movieRouter = require('./movies/route')

app.use('/movies', movieRouter)


const userRouter = require('./movies/userRout')

app.use('/users', userRouter)

const reserveRouter = require('./movies/reserveRoute')

app.use('/reserve', reserveRouter)

const server = app.listen(PORT, console.log(`Server running on port ${PORT}.`))
