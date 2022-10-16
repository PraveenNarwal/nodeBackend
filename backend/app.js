const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helperJwt/jwt');
const errorHandler = require('./helperJwt/error-handler')

app.use(cors());
app.options('*',cors())



//midddleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler)

//roters
const productRouter = require('./routes/products')
const categoryRouter = require('./routes/categories')
const orderRouter = require('./routes/orders')
const userRouter = require('./routes/users');

const api = process.env.API_URL;

app.use(`${api}/products`, productRouter)
app.use(`${api}/categories`, categoryRouter)
app.use(`${api}/order`, orderRouter)
app.use(`${api}/user`, userRouter)

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'nshop-database'
})
.then(()=>{
    console.log("mongoDb connect")
}).catch(err=>{console.log(err)});

app.listen(3000,()=>{
    console.log(`${api}/products`)
    console.log("server is running....")
})