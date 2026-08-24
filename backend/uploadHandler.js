const mlt = require("multer");
const pt = require("path");
const exp = require("express")
const updk = exp.Router();
const by = require("bcrypt")
const sitemodel = require("./models")

const store = mlt.diskStorage({
    destination: (req, file, cb) => {
        const dir = pt.join(__dirname, "..", "FinTech", "public", "uploads", "profiles");
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})


const profile = mlt({ storage: store })

updk.post("/addadvisor", profile.single("file"), async (req, res) => {

    const hash = await by.hash(req.body.pass, 10)
    let profilename;
    if (!req.file) {
        profilename = "noimg.jpg";
    } else {
        profilename = req.file.filename;
    }

    const data = new sitemodel.advisormodel({
        name: req.body.name,
        email: req.body.email,
        specialization: req.body.special,
        experience: req.body.exp,
        photo: profilename,
        mobile: req.body.mobile,
        password: hash,
        usertype: "expert",
    });
    let sv = await data.save();
    if (sv) {
        res.status(200).json({ statuscode: 1 })
    } else {
        res.status(500).json({ statuscode: 0, msg: "404 error occur" })
    }
})

updk.post("/creataccount", profile.single("file"), async (req, res) => {

    const hash = await by.hash(req.body.pass, 10)
    let profilename;
    if (!req.file) {
        profilename = "noimg.jpg";
    } else {
        profilename = req.file.filename;
    }
    const data = new sitemodel.usermodel({
        name: req.body.name, email: req.body.email, mobile: req.body.mobile,
        password: hash, photo: profilename, usertype: "customer"
    })
    await data.save();

    res.status(200).json({
        message: "Profile created"
    });


    let sv = await data.save();
    if (sv) {
        res.status(200).json({ statuscode: 1 })
    } else {
        res.status(500).json({ statuscode: 0, msg: "404 error occur" })
    }
})

module.exports = updk;
