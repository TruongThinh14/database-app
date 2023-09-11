const express = require("express");
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
router.post("/:quantity/:product_id",addProductToWarehouse)
router.get("/find/:id",findProduct)
router.post("/",addProduct)
router.delete("/:id",deleteProduct)
router.put("/",editProduct)

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
function editProduct(req,res){
  let {id,title,description,price,imgString,length,width,height,category_id} = req.body
  console.log(req.body)
  connection.query(`
    UPDATE seller_product
    SET title="${title}", description="${description}",price=${price},imgString="${imgString}",length=${length},width=${width},height=${height},category_id = ${category_id}
    WHERE id = ${id}
  `,(err,result) =>{
    if(err) throw new Error(err)
    console.log("Product added")
    res.send(result)
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
  let {title,description,price,imgString,length,width,height,category_id} = req.body
  console.log(req.body)
  connection.query(`
    INSERT INTO seller_product(title,description,price,imgString,length,width,height,quantity,category_id)
    VALUES("${title}","${description}",${price},"${imgString}",${length},${width},${height},0,${category_id})
  `,(err,result) =>{
    if(err) throw new Error(err)
    console.log("Product added")
    res.send(result)
  })
}




function addProductToWarehouse(req,res){
  let {quantity,product_id} = req.params
  
  //check for warehouse availability
  connection.query(`SELECT * FROM seller_product WHERE id = ${product_id}`,(err,result)=>{
    if(err) throw new Error(err)
    let productVolume = result[0].length * result[0].width * result[0].height
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
          SET total_volume = total_volume - ${productVolume * quantity}, product_number = product_number + ${quantity} 
          WHERE id = ${warehouse.id}`)
          connection.query(`UPDATE seller_product SET quantity = quantity + ${quantity} WHERE id = ${product_id}`)
          quantity = 0
          break
        }
        connection.query(`
          UPDATE warehouse
          SET total_volume = total_volume - ${productVolume * avalableProductNum} , product_number = product_number + ${avalableProductNum}
          WHERE id = ${warehouse.id}`)
          connection.query(`UPDATE seller_product SET quantity = quantity + ${avalableProductNum} WHERE id = ${product_id}`)
        quantity = quantity - avalableProductNum
      }
      if(quantity != 0){
        return res.send(`There are ${quantity} product cannot add to the warehouse`)
      }
      res.send(result)
      console.log("product added to warehouses")
    })
  })
  
  }

module.exports = router