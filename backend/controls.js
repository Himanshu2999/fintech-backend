const { json } = require("express");
const sitemodel = require("./models")

const by = require("bcrypt")
// post apis starting.. //


// CREATE PROFILE
exports.createProfile = async (req, res) => {
    try {
        
        const hash = await by.hash(req.body.pass, 10)
        const data = new sitemodel.usermodel({name: req.body.name, email: req.body.email, mobile: req.body.mobile,
            password: hash , 
        })
        await data.save();

        res.status(200).json({
            message: "Profile created"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating profile",
            error: error.message
        });
    }
};

exports.findata = async (req, res) => {
    try {
        const data = new sitemodel.finacialmodel({
            monthaly_income: req.body.mincom,
            monthaly_expenses: req.body.mexp,
            existing_loans: req.body.exiloans,
            savings: req.body.savin,
            investments: req.body.invk,
            financial_goal: req.body.fingoal,
            userid: req.body.uid,
            username: req.body.uname,
        });
        const sv = await data.save()
        if (sv) {
            res.status(200).json({ statuscode: 1 })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }
    }
    catch (e) {
        res.status(507).json({ statuscode: -1, error: e.code })
    }
}

exports.consult = async (req, res) => {
    try {
        const data = new sitemodel.constmodel({
            userid: req.body.uid,
            user: req.body.uname,
            advisorname: req.body.adname,
            advisorid: req.body.aid,
            roomid: req.body.rid,
            scheduledAt: req.body.schld,
            message: req.body.msg,
            status: "requested",
            Date: new Date()
        })
        const sv = await data.save()
        if (sv) {
            res.status(200).json({ statuscode: 1 })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }
    }
    catch (e) {
        res.status(507).json({ statuscode: -1, error: e.code })
    }
}

exports.acceptrequest = async(req,res)=>{
    try{
        const data = await sitemodel.constmodel.updateOne({_id: req.params.cid}, {status: "accepted"})
        if(data.modifiedCount==1){
            res.status(200).json({ statuscode: 1 })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }
        }
      catch (e) {
        res.status(507).json({ statuscode: -1, error: e.code })
    }
}

// post apis ending....  //


// get api starting.... //


exports.login = async (req, res) => {
    try {
        const udata = await sitemodel.usermodel.findOne({ name: req.body.uname});
        const advdata = await sitemodel.advisormodel.findOne({ name: req.body.uname});

        
        if (udata != null) {
            const match =  by.compare(req.body.pass, udata.password);
            if (match) {
                return res.status(200).json({ statuscode: 1, user: udata });
            }
        }
        else if (advdata != null) {
            const match = by.compare(req.body.pass, advdata.password);
            if (match) {
                return res.status(202).json({ statuscode: 2, advi: advdata });
            }
            
        }
        else {
            return res.status(404).json({ statuscode: 0, error: "Invalid username or password" });
        }
    }
    catch (e) {
        return res.status(500).json({ statuscode: -1, error: e.message });
    }
}


exports.getconsltdata = async (req, res) => {
    try {
        const conslt = await sitemodel.constmodel.find();
        if (conslt != null) {
            res.status(200).json({ statuscode: 1, consltdat: conslt })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }

    }
    catch (e) {
        res.status(507).json({ statuscode: -1, error: e.code })
    }
}



exports.getfindata = async (req, res) => {
    try {
        const fin = await sitemodel.finacialmodel.find();
        if (fin != null) {
            res.status(200).json({ statuscode: 1, findata: fin })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }

    }
    catch (e) {
        res.status(507).json({ statuscode: -1, error: e.code })
    }
}

exports.getalladv = async (req, res) => {
    try {
        const adv = await sitemodel.advisormodel.find();
        if (adv != null) {
            res.status(200).json({ statuscode: 1, datadv: adv })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }
    }
    catch (e) {
        res.status(507).json({ statuscode: -1, error: e.code })
    }
}

exports.getconsultbyaid = async (req, res) => {
    try {
        const advidmdl = await sitemodel.constmodel.find({ $or : [{ userid: req.params.idk}, {advisorid: req.params.idk }] })
        if (advidmdl != null) {
            res.status(200).json({ statuscode: 1, consltdat: advidmdl })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }
    }
    catch (e) {
        res.status(507).json({ statuscode: -1, error: e.code })
    }
}

exports.verifyroomid = async(req, res) =>{
    try{
        const consult = await sitemodel.constmodel.findOne({roomid: req.params.room})
        if(consult!=null){
            res.status(200).json({statuscode: 1, msg: "roomID is verified"})
        }
        else{
            res.status(500).json({statuscode: 0, msg: "roomid is invalid" })
        }
    }
    catch(e){
        res.status(507).json({statuscode: -1, error: e.code})
    }
}

exports.getadvbyid = async (req, res) => {
    try {
        const advid = await sitemodel.advisormodel.findOne({ _id: req.params.idk })
        if (advid != null) {
            res.status(200).json({ statuscode: 1, advdt: advid })
        }
        else {
            res.status(500).json({ statuscode: 0 })
   
        }
    }
    catch (e) {
        res.status(507).json({ statuscode: -1, error: e.code })
    }
}

exports.getuserfin = async (req, res) => {
    try {
        const ufin = await sitemodel.finacialmodel.findOne({ userid: req.params.uid })
        if (ufin != null) {
            res.status(200).json({ statuscode: 1, fink: ufin })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }
    }
    catch (e) {
        res.status(507).json({ statuscode: -1, error: e.code })
    }
}

// get api ending.. //

// delete api starting... //

exports.deleteuserfin = async (req, res) => {
    try {
        const delfin = await sitemodel.finacialmodel.deleteOne({ _id: req.params.idk })
        if (delfin.deletedCount == 1) {
            res.status(200).json({ statuscode: 1 })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }
    }
    catch (e) {
        res.status(507).json({ statuscode: -1, error: e.code })
    }
}

exports.deleteadvdata = async (req, res) => {
    try {
        const deladv = await sitemodel.advisormodel.deleteOne({ _id: req.params.idk })
        if (deladv.deletedCount == 1) {
            res.status(200).json({ statuscode: 1 })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }
    }
    catch (e) {
        res.status(508).json({ statuscode: -1, error: e.code })
    }
}

exports.deleteconsult = async (req, res) => {
    try {
        const deladv = await sitemodel.constmodel.deleteOne({ _id: req.params.cid })
        if (deladv.deletedCount == 1) {
            res.status(200).json({ statuscode: 1 })
        }
        else {
            res.status(500).json({ statuscode: 0 })
        }
    }
    catch (e) {
        res.status(508).json({ statuscode: -1, error: e.code })
    }
}

// delete api ending.. //
