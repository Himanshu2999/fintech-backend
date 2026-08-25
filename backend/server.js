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
    origin: "https://fintech-frontend-liart.vercel.app", 
    credentials: true
}));



mg.connect('mongodb+srv://himanshucolleg_db_user:2BEhhfeDJj5nWuax@sim-cluster.yu5bdrg.mongodb.net/?appName=SIM-Cluster')
    .then(() => {
        console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed");
        console.error(err);
    });

app.use("/api", uplodroutes)
app.use("/api", usrroutes)

mg.set('strictQuery', false)

app.get('/', (req,res)=>{
    res.send("welcome to our website")
}) 



