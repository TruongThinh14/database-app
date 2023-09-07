
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
const list = document.querySelector(".product-list")

const connection = mysql.createConnection(
  {
    host:"localhost",
    user:"root",
    //your local mySql password
    password:"123456"
  }
)
connection.connect((err) => {
  if(err) throw new Error(err);
  console.log("Connected")
//drop database if exists(create unique name to prevent accidentally delete important database)
  connection.query("DROP DATABASE IF EXISTS asm2DBss",(err,res) =>{
    if(err) throw new Error(err);
  console.log("database dropped")
  return console.log(res)
  })
//create new database
  connection.query("CREATE DATABASE asm2DBss",(err,res) =>{
    if(err) throw new Error(err);
  console.log("database created")
  return console.log(res)
  })
  connection.query("use asm2DBss",(err,res) =>{
    if(err) throw new Error(err);
  console.log("database used")
  return console.log(res)
  })
  //create seller product table
  connection.query(`CREATE TABLE seller_product(
    id int PRIMARY KEY,
    title varchar(255),
    description varchar(255),
    price int, 
    imgString varchar(255), 
    length int, width int, height int)`,(err,res) =>{
    if(err) throw new Error(err)
    console.log("table created")
    return console.log(res)
  })
  //add data to seller product table
  connection.query(`INSERT INTO seller_product
   VALUES
   (1,"watermelon","juicy and delicious", 10000,"img String",10,10,10),
   (2,"RC car","fast and cheap", 50000,"img String",20,7,13),
   (3,"Couch","super comfy", 700000,"img String",100,40,40),
   (4,"Bath tub","shower like a king", 1400000,"img String",100,50,30),
   (5,"Knife","package include whole set", 400000,"img String",20,10,5)`,(err,res) =>{
    if(err) throw new Error(err)
    console.log("data added to table")
    return console.log(res)
  })

  var sellerProductList = []
  
  connection.query("SELECT * FROM asm2dbss.seller_product",(err,res) =>{
    if(err) throw new Error(err)
    sellerProductList = res
  })

  // const htmlStringList = sellerProductList.map(product =>{
  //   return(
  //     `<div class="product-item">
  //         <div class="product-item-left">
  //             <img src=${product.imgString}/>
  //         </div>
  //         <div class="product-item-middle">
  //             <p>Product name:<b>${product.title}</b></p>
  //             <p>Description:<b>${product.description}</b></p>
  //         </div>
  //         <div class="product-item-right">
  //             <p>Price:<b>${product.price}</b></p>
  //             <p>Dimension:<b>l:${product.length}, w:${product.width}, h:${product.height}</b></p>
  //         </div>
  //         <div class="product-item-btn">
  //             <a href="#">edit</a>
  //             <button>delete</button>
  //         </div>
  //     </div>`
  //   )
  // });

  // list.innerHTML = htmlStringList.join("\n")
  
})
