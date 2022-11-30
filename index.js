const express = require('express');
const cors = require('cors');
const app =express();
const port = process.env.PORT || 4000;
// import MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
// import variables from .env file
require('dotenv').config();



app.use(cors());
app.use(express.json());



// Connect the MongoDB Database with this Server
const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.8ro0fiu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const brandCollection = client.db('sell-me-laptop').collection('brands');

        /////Get all Categories from MongoDB (brands) collection
        app.get('/categories', async (req,res)=>{
            const query = {};
            const cursor = brandCollection.find(query);
            const brands = await cursor.toArray();
            res.send(brands);
        })
         ///////////////////////////////////////////////////////////////////////////////////////
        ///// Get Products of a particular Category from MongoDB (products) collection
        ////////////////////////////////////////////////////////////////////////////////////////
        const productsCollection = client.db("sell-me-laptop").collection('products');

        app.get('/category/:name', async (req,res)=>{  
             const name = req.params.name;
             const query = { brand : name };    /////////////Get the products of a particular brand by using brand name  in products collection
             const cursor = productsCollection.find(query);
             const products = await cursor.toArray();
             const brandProducts = products.filter(function (element){
                return element.brand ;
             })
             res.send(brandProducts);
        })

        /////// insert new product Data into products Collection /////////////
        app.post('/products',async (req,res)=>{
            const product = req.body;
            
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })

        /////////////////////////////////////////////////////////////////////
        //////    Creating Orders Collection in sell-me-laptop Database
        ////////////////////////////////////////////////////////////////////
        const ordersCollection = client.db("sell-me-laptop").collection('orders');

        ///////////// inserting new Order Data to the Orders Collection /////////////
        app.post('/orders', async (req, res )=>{
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.send(result);
        })

        ///////////// Get Data from Orders Collection ///////////////////////////
        app.get('/orders', async (req,res)=>{
            const email = req.query.email;
            const query = { buyer_email : email };
            const cursor = ordersCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })

        ///////////////Create Users collection in Database //////////////
        const usersCollection = client.db("sell-me-laptop").collection('users');
        
        app.post('/users',async(req,res)=>{
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
    }
    finally{

    }
}

run().catch(error => error.message);




app.get('/', (req,res)=>{
    res.send("sell-me-laptop server is running")
});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
});