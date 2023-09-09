const express = require("express");
const { connect } = require("http2");
const router = express.Router();
const mysql = require('mysql')

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
})
connection.query("use asm2DBss",(err,res) =>{
    if(err) throw new Error(err);
    console.log("database used")
// return console.log(res)
})

router.get("/:length/:width/:height",checkWarehouseAvalability)
router.get("/find/:id",findProduct)
router.post("/",addProduct)

//find product
function findProduct(req,res){
  let{id} = req.params
  connection.query(`
  SELECT * FROM seller_product
  WHERE id = ${id}
  `,(err,result) =>{
    if(err) throw new Error(err)
    if(result[0] == undefined){
      console.log("Product dont exists")
      res.send(result)
    }else{
      res.send(result)
    }
  })
}

//add product
function addProduct(req,res){
  let product = req.body
  console.log(product)
  console.log("test")
  connection.query(`
    INSERT INTO seller_product(title,description,price,imgString,length,width,height,warehouse_id)
    VALUES(${product.title},${product.description},${product.price},${product.imgString},${product.length},${product.width},${product.height},${product.warehouse_id})
  `,(err,result) =>{
    if(err) throw new Error(err)
    console.log("Product added")
    res.send(result)
  })
}




function checkWarehouseAvalability(req,res){
  let {length} = req.params
  let {width} = req.params
  let {height} = req.params
    let productVolume = length * width * height
    connection.query(`
    CALL check_available_warehouse(${productVolume})`,(err,result) =>{
      if(err) throw new Error(err)
      if(result[0][0] == undefined){
        console.log("no warehouse avalable, canot add product")
        res.send(result)
      }else{
        res.send(result)
      }
      
    })
  }

module.exports = router