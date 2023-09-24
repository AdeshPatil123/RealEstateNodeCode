const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// const DB = "mongodb+srv://adesh9066:tvfY0bvpotQape2v@cluster0.3jskcba.mongodb.net/RealEstate";
const PORT = process.env.PORT || 8050;
const router = require("./Routes/index");
const dotenv = require("dotenv")
dotenv.config();
const DB = process.env.MONGO_URL;


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("Connect to mongoDB")})
.catch((err)=>{console.log(err)});
app.use(express.json());
app.use(cors());
app.use("/",router);

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`listening on PORT:${PORT}`)
})
