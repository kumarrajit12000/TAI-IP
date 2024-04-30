const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cookie = require("cookie");
const { ObjectId } = require('mongodb')

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: 'true' }));
app.use(cookieParser());

//Schema
const user = require('./Schema/signup.js');
const productsSchema = require("./Schema/products.js");
const products = require("./data.js");

main()
    .then(() => {
        console.log("connected to db sucessfully");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/bigFoot");
}

const verifyuser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }
    const decode = jwt.verify(token, "secretkey");
    next() //return to route
}

//routes
app.get('/verifyuser', verifyuser, (req, res) => {
    res.json({ status: true, messgae: "authorized" })
})
app.get("/products", async (req, res) => {
    const products = await productsSchema.find({});
    return res.json({ products });
})

app.post("/products", async (req, res) => {
    const product_id = req.body.product_id.id;
    const objectId = new ObjectId(`${product_id}`);
    const product = await productsSchema.find({ _id: objectId });
    return res.json({ product });
})
app.post("/category", async (req, res) => {
    const category = req.body.category.category;
    const products = await productsSchema.find({ category: category });
    return res.json({ products });
})

app.post("/addtocart", verifyuser, async (req, res) => {
    const token = req.cookies.token;
    const decode = jwt.verify(token, "secretkey");
    console.log(decode.email);

    const product = await req.body;
    const objectId = new ObjectId(`${product.product_id.id}`);

    const getproduct = await productsSchema.find({ _id: objectId });
    console.log(getproduct)
    const product_details = {
        product: getproduct[0],
        color: product.color,
        size: product.size,
    }

    const CheckCart = await user.find({ email: decode.email })
    const cart = CheckCart[0].cart;

    if (cart.length == 0) {
        const newUser = await user.findOneAndUpdate({ email: decode.email }, { $push: { cart: product_details } });
        // console.log(newUser);
        return res.json({ status: true });
    }

    const checkProduct = cart.some((obj) => {
        if (obj.product[0]._id.toHexString() === objectId.toHexString()) {
            return true;
        }
    });
    console.log(checkProduct)
    if (checkProduct) {
        return res.json({ message: 'alreadyExist' });
    } else {
        const newUser = await user.findOneAndUpdate({ email: decode.email }, { $push: { cart: product_details } });
        console.log(newUser);
        return res.json({ status: true });
    }
}
)

app.post("/buynow", async (req, res) => {
    const product_id = req.body.product_id.id;
    const objectId = new ObjectId(`${product_id}`);

    const products = await productsSchema.find({ _id: objectId });
    return res.json({ status: true });
})
app.get("/getcart", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "login to get cart..." });
    }
    const decode = jwt.verify(token, "secretkey");
    const User = await user.find({ email: decode.email })
    const cart = User[0].cart;
    return res.json({ cart });

})

app.post("/deleteitem", async (req, res) => {
    const id = req.body.id;
    const token = req.cookies.token;
    const decode = jwt.verify(token, "secretkey");
    const objectId = new ObjectId(`${id}`);

    await user.findOneAndUpdate(
        { email: `${decode.email}` },
        { $pull: { cart: {_id : objectId}} },);
    return res.json({ status: true });

})

app.post("/orders", (req, res) => {
    const orders = req.body.order;
    console.log(orders);
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "login to get cart..." });
    }
    const decode = jwt.verify(token, "secretkey");

    orders.map(async (order, idx) => {
        const newUser = await user.findOneAndUpdate({ email: decode.email }, { $push: { orders: order } });
        console.log(newUser)
    })
    res.json({ status: true })

})

app.get("/getorders", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "login to See Orders..." });
    }
    const decode = jwt.verify(token, "secretkey");
    const User = await user.find({ email: decode.email })
    const orders = User[0].orders;
    return res.json({ orders });

})

app.post("/cancelorder", async (req, res) => {
    const id = req.body.id;
    console.log(id)
    const token = req.cookies.token;
    const decode = jwt.verify(token, "secretkey");
    const objectId = new ObjectId(`${id}`);

    await user.findOneAndUpdate(
        { email: `${decode.email}` },
        { $pull: { orders: {_id : `${id}`}} },);
    return res.json({ status: true });

})

app.get("/getcategory", async (req, res) => {
    const getproducts = await productsSchema.find({});
    const getCategory = getproducts.map((product, idx) => {
        return product.category;
    })
    res.json({ getCategory });
    console.log(getCategory);
})
app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ status: true });
})
app.post("/signup", async (req, res) => {

    const { email, password } = req.body.user;

    const newUser = await user.find({ email: email });
    console.log(newUser);

    if (newUser.length > 0) {
        return res.json({ status: false, message: "email Already Exist" });
    }

    // salt = 10;
    const hashPassword = await bcrypt.hash(password, 10)

    const user1 = new user({ email: email, password: hashPassword })
    await user1.save()
    console.log("data sucessfully inserted");
    return res.json({ status: true, message: "register successfully.." });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body.user;

    const newUser = await user.find({ email: email })


    if (newUser.length == 0) {
        return res.json({ status: true, message: 'user is not registered' })
    }

    const validPassword = await bcrypt.compare(req.body.user.password, newUser[0].password);
    console.log(validPassword);
    if (!validPassword) {
        console.log("incorrect")
        return res.json({ status: false, message: 'password is incorrect' })
    }
    else {
        const token = jwt.sign({ email: newUser[0].email }, 'secretkey', { expiresIn: "1d" })
        res.cookie('token', token, { httpOnly: true, maxAge: 86400000 })
        return res.json({ message: 'login successfully..' })
    }

})


app.listen("8080", () => {
    console.log("app is listing...");
})


