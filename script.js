
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

console.log("test")
const{createPool} = require('mysql')

const pool = createPool(
  {
    host:"localhost",
    user:"root",
    password:"123456"
  }
)
pool.query("SELECT * FROM w6.project",(err,res) =>{
  return console.log(res)
}

)