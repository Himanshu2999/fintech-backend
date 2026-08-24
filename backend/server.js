require("dotenv").config()

const exp = require("express")
const mg = require("mongoose")
const cors = require("cors")

const uplodroutes = require("./uploadHandler")
const usrroutes = require("./routes")

const app = exp();

app.use(exp.json())
app.use(exp.urlencoded({extended: false}))

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));


mg.connect('mongodb://localhost:27017/Fintech').then(()=>console.log("Connected to mongodb"))


app.use("/api", uplodroutes)
app.use("/api", usrroutes)

mg.set('strictQuery', false)

const PORT = process.env.PORT || 9000

app.get('/', (req,res)=>{
    res.send("welcome to our website")
}) 

app.listen(PORT, ()=>{
    console.log("Server is running");
});

