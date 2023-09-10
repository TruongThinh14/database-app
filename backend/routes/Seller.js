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
router.use(express.json())
router.get("/",getAllProduct)
router.post("/:length/:width/:height/:quantity/:product_id",addProductToWarehouse)
router.get("/find/:id",findProduct)
router.post("/",addProduct)
router.delete("/:id",deleteProduct)

//get all product
function getAllProduct(req,res){
  connection.query(`
  SELECT * FROM seller_product`,(err,result)=>{
    if(err) throw new Error(err)
    res.send(result)
  })
}
//find product
function findProduct(req,res){
  let {id} = req.params
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
//delete product
function deleteProduct(req,res){
  let {id} = req.params
  connection.query(`
  DELETE FROM seller_product
  WHERE id = ${id}
  `,(err,result)=>{
    if(err) throw new Error(err)
    res.send(result)
  })
}

//add product
function addProduct(req,res){
  let {title,description,price,imgString,length,width,height,categoryId} = req.body
  console.log(req.body)
  connection.query(`
    INSERT INTO seller_product(title,description,price,imgString,length,width,height,category_id)
    VALUES("${title}","${description}",${price},"${imgString}",${length},${width},${height},${categoryId})
  `,(err,result) =>{
    if(err) throw new Error(err)
    console.log("Product added")
    res.send(result)
  })
}




function addProductToWarehouse(req,res){
  let {length,width,height,quantity,product_id} = req.params
  let productVolume = length * width * height
  //check for warehouse availability
  connection.query(`
  CALL check_available_warehouse(${productVolume})`,(err,result) =>{
    if(err) throw new Error(err)
    console.log(result)
    for(let warehouse of result[0]){
      if(quantity == 0 ){break}
      let avalableProductNum = Math.floor(warehouse.total_volume / productVolume)
      console.log(avalableProductNum)
      if(avalableProductNum >= quantity){
        connection.query(`
        UPDATE warehouse
        SET total_volume = total_volume - ${productVolume * quantity} 
        WHERE id = ${warehouse.id}`)
        quantity = 0
        break
      }
      connection.query(`
        UPDATE warehouse
        SET total_volume = total_volume - ${productVolume * avalableProductNum} 
        WHERE id = ${warehouse.id}`)
      quantity = quantity - avalableProductNum
    }
    if(quantity != 0){
      return res.send(`There are ${quantity} product cannot add to the warehouse`)
    }
    res.send(result)
    console.log("product added to warehouses")
  })
  }

module.exports = router