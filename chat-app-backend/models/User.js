const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{type:String, required:true},
    password:{type:String, required:true},
    online:{type:Boolean, default:false}
});

module.exports = mongoose.model("user", userSchema);