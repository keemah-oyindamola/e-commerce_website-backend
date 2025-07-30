const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    username:{type:String, require:true, unique:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true, }
})

const user_model=mongoose.model("user-info", user_schema)

module.exports = user_model