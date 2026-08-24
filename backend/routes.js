const exp = require("express")
const contk = require("./controls")
const routk = exp.Router();

routk.post("/addfindata", contk.findata)
routk.post("/consult", contk.consult)
routk.post("/login", contk.login)
routk.get("/getfindata", contk.getfindata)
routk.get("/getadvisall", contk.getalladv)
routk.get("/getadvbyid/:idk", contk.getadvbyid)
routk.get("/getuserfin/:uid", contk.getuserfin)
routk.get("/getadvbyid/:idk", contk.getadvbyid)
routk.get("/getconslt/:idk", contk.getconsultbyaid)
routk.get("/verifyroom/:room", contk.verifyroomid)
routk.put("/accept/:cid", contk.acceptrequest)
routk.delete("/deleteuserfin/:idk", contk.deleteuserfin )
routk.delete("/deleteadv/:idk", contk.deleteadvdata)

module.exports = routk;