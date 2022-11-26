const express = require('express');
const cors = require('cors');
const app =express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("sell-me-laptop server is running")
});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
});