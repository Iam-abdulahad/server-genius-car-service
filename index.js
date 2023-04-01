const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware...........
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSOWRD}@cluster0.tdy11iu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
          const collection = client.db("test").collection("devices");
          // perform actions on the collection object
          console.log('database connected');
          client.close();
});



app.get('/', (req, res) => {
          res.send('Genius server is runnig')
});

app.listen(port, () => {
          console.log('server is running!');
})