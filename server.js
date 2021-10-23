const config = require('dotenv')
config.config({path:'./config.env'})
const express = require('express')
const app = express()
const exhbs  = require("express-handlebars")
const cookieParser = require('cookie-parser')
const path = require('path')
const connectDB = require('./config/db')
const auth = require('./middleware/auth')
const varMiddleware = require('./middleware/varMiddleware')
const {refreshTokens} = require('./controllers/auth')

//Connecting to database Mongo
connectDB()

const hbs = exhbs.create({
    extname:'hbs',
    layoutsDir:'views/layouts',
    defaultLayout:'main',
    runtimeOptions:{
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    },
    helpers:{
        ifeq: function(a,b,options){
            if(a.toString() === b.toString()){
                return options
            }
            else{
                return null
            }
        }
    }
})


app.set('view engine','hbs')
app.engine('hbs',hbs.engine)
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))


app.use('/api/auth',require('./routes/auth'))
app.use('/api/refresh-tokens',refreshTokens) // Refresh token when they are expired
app.use(varMiddleware)

app.use('/',auth,require('./routes/index'))
app.use('/blogs',auth,require('./routes/blogs'))
app.use('/user',auth,require('./routes/user'))


 


const PORT = process.env.PORT || 3000

const server = app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));




process.on('unhandledRejection',(err,promise)=>{
    console.log(`Logged error ${err}`)
    server.close(()=>process.exit(1))
}) 