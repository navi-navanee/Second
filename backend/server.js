const express =require('express')
const dotenv=require("dotenv");
const connectDB = require('./config/db');
const userRoutes=require('./routes/userRoutes');
const adminRoutes=require('./routes/adminRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app=express();
dotenv.config()
connectDB()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("API IS RUNNING>>>>>>>>>")
})


app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)

app.use(notFound)
app.use(errorHandler)



const PORT=process.env.PORT || 5000

app.listen(PORT,console.log("server started runnig ...."))
