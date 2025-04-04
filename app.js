const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes')
const globalErrorHanlder = require('./controllers/errorController');

const app= express();

app.use(cors({
    // origin: 'http://localhost:4200', // Allow requests from Angular
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
  }));

app.use(express.json({ limit: '10kb' }));

// app.get('/',(req,res) => {
//     res.status(200).send("Hello from the server side")
// })

app.use((req,res,next) => {
    console.log('I am middle ware');
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

  
app.use('/api/v1/users',userRouter);

app.use(globalErrorHanlder)

module.exports = app;