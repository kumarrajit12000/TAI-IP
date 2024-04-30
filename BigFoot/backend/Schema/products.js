const  mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {  
            category : String ,
            name : String,
            brand : String,
            url : String,
            rating : Number,
            price : Number,
        }
)

module.exports = mongoose.model("products",productSchema);
