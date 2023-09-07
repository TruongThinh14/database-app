
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://dbUser:iKd5d8MJzhJq7nMQ@cluster0.gnpwyx0.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const mysql = require('mysql')


const connection = mysql.createConnection(
  {
    host:"localhost",
    user:"root",
    password:"123456"
  }
)
connection.connect((err) => {
  if(err) throw new Error(err);
  console.log("Connected")

  connection.query("DROP DATABASE IF EXISTS testdb",(err,res) =>{
    if(err) throw new Error(err);
  console.log("database dropped")
  return console.log(res)
  })

  connection.query("CREATE DATABASE testdb",(err,res) =>{
    if(err) throw new Error(err);
  console.log("database created")
  return console.log(res)
  })
})
// connection.query("SELECT * FROM w6.project",(err,res) =>{
//   if(err) throw new Error(err);
//   console.log("Get data successfully")
//   return console.log(res)
// }

// )
//admindb
//123456Aa!