const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware...........
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tdy11iu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
          try {
                    await client.connect();
                    const serviceCollection = client.db('gebiusCar').collection('services');

                    app.get('/service', async (req, res) => {
                              const query = {};
                              const cursor = serviceCollection.find(query);
                              const services = await cursor.toArray();
                              res.send(services);
                    });

                    app.get('/service/:id', async (req, res) => {
                              const id = req.params.id;
                              const query = { _id: new ObjectId(id) };
                              const service = await serviceCollection.findOne(query);
                              res.send(service);
                    });

                    // POST
                    app.post('/service', async (req, res) => {
                              const newService = req.body;
                              const result = await serviceCollection.insertOne(newService);
                              res.send(result);
                    });
          }

          finally {

          }
}
run().catch(console.dir);



app.get('/', (req, res) => {
          res.send('Genius server is running')
});

app.listen(port, () => {
          console.log('server is running!');
})