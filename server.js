const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// DB connection
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {})
.then (() =>  console.log("DB connection successful"))

const port = process.env.PORT || 3000;

app.listen(port,()=> {
    console.log(`App is working on ${port}`)
})
