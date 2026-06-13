const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;

app.use(express.json());

// 1) Schema (blue print), --> 2) Model (Prototype), --> 3) Real Data
// 1) mongoose schema
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true,
  }
});

// 2) Model with big latter acting like a class
const Todo = mongoose.model('Todo', todoSchema);  //here 'Todo' inside the functions is for creating collection automatically with lowercase and plural form.


const uri = "mongodb+srv://express_backend_user:DXrDbNZUv8TtjFYJ@cluster0.7tyfnet.mongodb.net/todoDB?appName=Cluster0"; // here todoDB after the mongodb.net/ is for creating the database wit name.

async function run() {
  try {

    await mongoose.connect(uri);


    app.get('/posts', async (req, res) => {
      // const backend = await backendCollection.find({}).toArray();
      const todos = await Todo.find({}); //here the Todo is the model Todo
      res.send(todos)
    });

    app.post('/post', async (req, res) => {
      const todoData = req.body;

      // option-1
      const todo = new Todo(todoData); //Step-1: here the Todo after new word is the model todo to create in memory
      await todo.save(); //Step-2  save to database

      // Or option-2
      // const todo = await Todo.create(todoData);   --- This alternative does Step 1 and Step 2 at once!---

      console.log(todo)
      res.send(todo)
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