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
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});





app.get('/', (req,res)=>{
    res.send("sell-me-laptop server is running")
});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
});