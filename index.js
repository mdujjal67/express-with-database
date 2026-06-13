const express = require('express');
const app = express()
const port = 5000

app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://express_backend_user:DXrDbNZUv8TtjFYJ@cluster0.7tyfnet.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const backendCollection = client.db('ExBackendDB').collection('exBackend');

    app.get('/posts', async (req, res) => {
        const backend = await backendCollection.find({}).toArray();
        res.send(backend)
    });

    app.post('/post', async (req, res)=> {
        const postdata = req.body;
        const post =await backendCollection.insertOne(postdata);
        res.send(post)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Welcome to Express World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})