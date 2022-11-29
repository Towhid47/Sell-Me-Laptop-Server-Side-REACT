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

        app.get('/category/:id', async (req,res)=>{  
             const id = req.params.id;
             const query = { brand_id : id };    /////////////Get the products of a particular brand by using brand_id  in products collection
             const cursor = productsCollection.find(query);
             const products = await cursor.toArray();
             const brandProducts = products.filter(function (element){
                return element.brand ;
             })
             res.send(brandProducts);
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