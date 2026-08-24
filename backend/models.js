const mg = require("mongoose");

const userSchema=new mg.Schema({
  name:{type:String,required:true, unique: true},
  email:{type:String,required:true},
  mobile:{type:String},
  password:{type:String,required:true},
  photo: {type: String},
  usertype: {type: String}
},
{versionKey: false}
);

const advisorschema = new mg.Schema({"name": {type: String, unique: true}, "password": {type: String} , "specialization": {type: String}, experience: {type: String}, email: {type: String} , 
  mobile: {type: String}, 
photo: {type: String}, usertype: {type: String}}, {versionKey: false})

const finacialdata = new mg.Schema({"monthaly_income": {type: Number}, "monthaly_expenses": {type: Number}, 
    "existing_loans": {type: Number}, "savings": {type: Number}, "investments": {type: Number}, "financial_goal": {type: String},
    "userid": {type: String}, "username": {type: String}
}, {versionKey: false}
)

const consltschema = new mg.Schema({"userid": {type: String}, "advisorid": {type: String}, "user": {type: String}, 
    "advisorname": {type: String}, "roomid": {type: String}, "scheduledAt": {type: String}, "status": String,
"message": {type: String}, Date:{type: String}},{versionKey: false})




const sitemodel = {
  "usermodel" : mg.model("user", userSchema),
 "advisormodel": mg.model("advisor", advisorschema),
 "finacialmodel": mg.model("finacial_details", finacialdata),
 "constmodel": mg.model("consultations", consltschema ),

}

module.exports = sitemodel; 