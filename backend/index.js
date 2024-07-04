const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");


app.use(express.json());

const corsOptions = {
  origin: 'http://192.168.0.104:3000',  // Replace with your React app's domain/port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://khanshabawasim:sabakhan26@cluster0.9lssltt.mongodb.net/e-commerce");

//API Creation
app.get("/",(req,res)=>{
  res.send(" Express App is Running");
})

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage })

//creating upload endpointt for images
app.use('/images',express.static("upload/images"))

app.post("/upload",upload.single('product'),(req,res)=>{
  res.json({
    success:1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
})

//Schema for creating products
const Product = mongoose.model("Product",{
  id:{
    type: Number,
    required: true,
  },
  name:{
    type:String,
    required: true,
  },
  image:{
    type:String,
    required: true,
  },
  category:{
    type:String,
    required: true,
  },
  new_price:{
    type: Number,
    required: true,
  },
  old_price:{
    type: Number,
    required: true,
  },
  color: {
    type: String, 
  },
  size: {
    type: String, 
  },
  offer: {
    type: Number, 
  },
  date:{
    type: Date,
    default: Date.now,
  },
  available:{
    type: Boolean,
    required: true,
  },
})

//Creating API for adding products
app.post('/addproduct', async (req,res)=>{
  let products = await Product.find({});
  let id;
  if(products.length>0)
    {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    }
    else{
      id=1;
    }
  const product = new Product({
    id:id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    color: req.body.color, 
    size: req.body.size,   
    offer: req.body.offer,
    date: req.body.date,
    available: req.body.available,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({ 
    success: true, 
    name: req.body.name ,
  })
})

//Creating API for deleting products
app.post('/removeproduct',async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  })
})

//Creating API for Getting All Products
app.get('/allproducts',async(req,res)=>{
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
	})

  //schema creating for user model
  const Users = mongoose.model('Users',{
    name:{
      type: String,
    },
    email:{
      type: String,
      unique: true,
    },
    password:{
      type: String,
    },
    cartData:{
      type: Object,
    },
    date:{
      type: Date,
      default: Date.now,
    }
  })

  //Creating endpoint for registering the user
  app.post('/signup',	async (req, res) =>{

    let check = await Users.findOne({email: req.body.email});
    if(check){
      return res.status(400).json({success:false, errors:"Existing User Found with Same Email Address!!"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i]=0;
    }
    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password:  req.body.password,
      cartData: cart,
    })

    await user.save();

    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, "secret_ecom");
    res.json({success: true,token})

  })

  //creating endpoint for user login
  app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email: req.body.email});
    if(user){
      const passCompare = req.body.password === user.password;
      if (passCompare){
        const data = {
          user: {
            id: user.id
          }
        }
        const token = jwt.sign(data, "secret_ecom");
        res.json({success: true,token})
      }
      else{
        res.json({success: false,errors:"Wrong Password!!"});
      }
    }
    else{
      res.json({success: false,errors:"Wrong Email Address!!"});
    }
  }) 

  //creating endpoint for newcollection data
  app.get('/newcollections', async (req,res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
  })

  // endpoint for getting womens products data
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.splice(0, 4);
  console.log("Popular In Women Fetched");
  res.send(popular_in_women);
});


//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  else{
    try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  }
  
};

//creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser , async (req, res) => {
  console.log("Added",req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added to Cart")
})

//creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("Remove Cart", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Items is Removed from Cart");
})

//creating endpoint to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);

})

// Order Schema and Model
const orderSchema = new mongoose.Schema({
  userId: String,
  orderDetails: Array,
  totalAmount: Number,
  paymentId: String,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Route to handle order saving
app.post('/api/orders', fetchUser, async (req, res) => {
  const { orderDetails, totalAmount, paymentId } = req.body;

  const newOrder = new Order({
      userId: req.user.id,
      orderDetails,
      totalAmount,
      paymentId
  });

  try {
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to fetch orders for a user
app.get('/api/orders', fetchUser, async (req, res) => {
  try {
      const orders = await Order.find({ userId: req.user.id });
      res.json(orders);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Endpoint to remove entire order
app.delete('/api/orders/:orderId', fetchUser, async (req, res) => {
  const { orderId } = req.params;
  try {
      const order = await Order.findOne({ _id: orderId, userId: req.user.id });
      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }

      // Remove order from database
      await Order.findOneAndDelete({ _id: orderId });

      res.json({ message: 'Order deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete order' });
  }
});

app.listen(port,(error)=>{
  if(!error){
    console.log("Server Running on port " + port)
  }
  else
  {
    console.log("Error: "+error)
  }
})
