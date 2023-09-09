const express = require("express")
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



function checkWarehouseAvalability(req,res){
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

module.exports = router