const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")

const cors = require('cors');
const morgan = require("morgan")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

const port = process.env.PORT || 8800;



dotenv.config();
mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true},()=>{
        console.log(`successfully connected`)
})
//
//middleWare
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan("common"))

app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)

app.get('/users',(req,res)=>{
    res.send("welcome")
})

app.listen(port,()=>{
    console.log(`this server is listening on ${port}`);
})