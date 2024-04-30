const user = require('./Schema/signup.js');
const mongoose = require("mongoose");
const productsSchema = require("./Schema/products.js");
const products = require("./data.js");
const  {uuid } = require("uuid");
const user1 = new user({
    email : 'kumarrajit@123',
    password : '123',
});
main()
.then(()=> {
    console.log("connected to db sucessfully");
})
.catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/bigFoot");
}

const inituser = async ()=> {
    await user.deleteMany({});
    // await user.insertMany({});
    console.log("data sucessfully inserted");
};
inituser();

const initProduct = async () => {
    products.map((product) => {
        const newProduct = new productsSchema({
            id : uuid(),
            category : product.category,
            name: product.name,
            brand: product.brand,
            url: product.url,
            rating: product.rating,
            price: product.price,
        })
        productsSchema.deleteMany({});
        newProduct.save();
       
    })
   
    console.log("data sucessfully inserted");

}

// initProduct();