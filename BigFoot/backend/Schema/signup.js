
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
       
    email : {
            type : String,
            required : true,
        },
    password : {
        type : String,
        required: true,
    },
    cart : [
        {
            product : [],
            color:String,
            size:Number,
        },
    ],
    orders : [],

});
module.exports = mongoose.model("user",userSchema);
