const mysql = require('mysql')
const express = require("express")
const { connect } = require('http2')
const warehouseController = require('./controllers/warehouseController')
const app = express()


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
// //drop database if exists(create unique name to prevent accidentally delete important database)
//   connection.query("DROP DATABASE IF EXISTS asm2DBss",(err,res) =>{
//     if(err) throw new Error(err);
//   console.log("database dropped")
//   return console.log(res)
//   })
//create new database
  connection.query("CREATE DATABASE IF NOT EXISTS asm2dbss",(err,res) =>{
    if(err) throw new Error(err);
  console.log("database created")
 // return console.log(res)
  })
  connection.query("use asm2DBss",(err,res) =>{
    if(err) throw new Error(err);
  console.log("database used")
 // return console.log(res)
  })
  //create seller product table
  connection.query(`CREATE TABLE seller_product(
    id int PRIMARY KEY,
    title varchar(255),
    description varchar(255),
    price int, 
    imgString varchar(255), 
    length int, width int, height int,
    warehouse_id INT REFERENCES warehouse(id))`,(err,res) =>{
    if(err) throw new Error(err)
    console.log("table seller_product created")
   // return console.log(res)
  })
  //create warehouse table
  connection.query(`CREATE TABLE warehouse(
    id int PRIMARY KEY,
    name varchar(255),
    address varchar(255),
    total_volume int
    )`,(err,res) =>{
    if(err) throw new Error(err)
    console.log("table warehouse created")
 
   // return console.log(res)
  })
   //add data to warehouse table
  connection.query(`INSERT INTO warehouse
  VALUES
  (1,"north warehouse","hanoi, d5,cau giay,52", 90000),
  (2,"central warehouse","hue, d3, Nguyen trai, 73", 500),
  (3,"south warehouse","hcm, d7, Nguyen Van Linh, 266", 1000)`,(err,res) =>{
   if(err) throw new Error(err)
   console.log("data added to table warehouse")
   //return console.log(res)
 })
  //add data to seller product table
  connection.query(`INSERT INTO seller_product
   VALUES
   (1,"watermelon","juicy and delicious", 10000,"img String",10,10,10,5),
   (2,"RC car","fast and cheap", 50000,"img String",20,7,13,5),
   (3,"Couch","super comfy", 700000,"img String",100,40,40,5),
   (4,"Bath tub","shower like a king", 1400000,"img String",100,50,30,5),
   (5,"Knife","package include whole set", 400000,"img String",20,10,5,5)`,(err,res) =>{
    if(err) throw new Error(err)
    console.log("data added to table seller_product")
  })
 
 
  app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
  })
})

 //get all seller product from db
 app.get("/seller/product", (req,res) => {
  let list;
  connection.query("SELECT * FROM asm2dbss.seller_product",(err,result) =>{
  if(err) throw new Error(err)
    list = result
    res.send(list)
})
  })

  // app.get("/test", (req,res)=>{
  //   let warehouse;
  //   warehouse =  findWarehouse(1)
  //   res.send(warehouse)
  // })
 
//addmin add new ware house
  function addWarehouse(name,address,total_volume){
      //get max id from warehouse list to generate new id
      let newId;
      connection.query(`SELECT MAX(id) FROM warehouse`,(err,result)=>{
        if(err) throw new Error(err)
        newId = result + 1
      })
      connection.query(`
      INSER INTO warehouse
      VALUES
      (${newId},${name},${address}, ${total_volume})
      `,(err,result) =>{
        if(err) throw new Error(err)
        console.log(`Warehouse id:${newId} added`)
      })
  }
  //admin check warehouse info
  
//admin edit warehouse
function editWarehouse(inputId,inputName,inputAddress,inputTotalVolum){
  connection.query(`
  UPDATE warehouse
  SET name = ${inputName}, address = ${inputAddress}, total_volume = ${inputTotalVolum}
  WHERE id = ${inputId}
  `, (err,result) =>{
    if(err) throw new Error(err)
    console.log(`Warehouse id:${newId} edited`)
  })
}
//admin delete warehouse
function deleteWarehouse(inputId){
  let isNull = false
  connection.query(`select * from seller_product
  where warehouse_id = ${inputId}`, (err,result) =>{
    if(err) throw new Error(err)
    if(result == null){
      isNull = true
      console.log("warehouse is null")
    }
    console.log(`warehouse not null`)
  })
  if(isNull){
    connection.query(`
    DELETE FROM warehouse
    WHERE id = ${inputId}`,(err,result) =>{
      if(err) throw new Error(err)
      console.log(`Warehouse id:${newId} deleted`)
    })
  }
  console.log("ware houe not empty, cannot delete")
  
}
//seller check warehouse availability
function checkWarehouseAvalability(product){
  let productVolume = product.length * product.width * product.height
  let avalableWarehouseList
  let selectedWarehouse
  connection.query(`
  SELECT * 
  FROM warehouse
  WHERE total_volume >= ${productVolume}
  ORDER BY total_volume DESC`,(err,result) =>{
    if(err) throw new Error(err)
    avalableWarehouseList = result
    console.log("avalable warehouses selected(most space available at first index)")
  })
  if(avalableWarehouseList == null){
    console.log("no warehouse avalable, canot add product")
    return
  }
  selectedWarehouse = avalableWarehouseList[0]
  product.warehouse_id = selectedWarehouse.id
  console.log( `Product id:${product.id} added to warehouse id:${selectedWarehouse.id}`)
  connection.query(`
  UPDATE warehouse
  SET total_volume = total_volume - ${productVolume},

  WHERE id = ${selectedWarehouse.id}
  `,(err,result) =>{
    if(err) throw new Error(err)
    console.log(`warehouse id:${selectedWarehouse.id}'s total_volume updated`)
  })
}


