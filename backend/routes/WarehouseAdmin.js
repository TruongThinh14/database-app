const express = require("express");
const router = express.Router();
const mysql = require('mysql');


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

router.get("/:inputId", viewWarehouse)
router.post("/:name/:address/:total_volume",addWarehouse)
router.put("/:id/:newName/:newAddress/:newTotalVolume",editWarehouse)
router.delete("/:id",deleteWarehouse)
//inputId,inputName,inputAddress,inputTotalVolum

//view warehouse detail
function viewWarehouse(req, res){
    let {inputId} = req.params
   connection.query(`SELECT * FROM warehouse WHERE id = ${inputId}`,(err,result) =>{
    if(err) throw new Error(err)
    console.log(`Warehouse id:${inputId} fetched`)
    res.send(result)
  })
}

//add warehouse into the db
function addWarehouse(req,res){
    let{name} = req.params
    let{address} = req.params
    let{total_volume} = req.params
    //insert new warehouse to db
    connection.query(`
    INSERT INTO warehouse (name,address,total_volume)
    VALUES
    (${name},${address}, ${total_volume})
    `,(err,result) =>{
      if(err) throw new Error(err)
      console.log(`Warehouse added`)
    res.send(result)
    })
}

function editWarehouse(req,res){
    let{id} = req.params
    let{newName} = req.params
    let{newAddress} = req.params
    let{newTotalVolume} = req.params
    connection.query(`
    UPDATE warehouse
    SET name = ${newName}, address = ${newAddress}, total_volume = ${newTotalVolume}
    WHERE id = ${id}
    `, (err,result) =>{
      if(err) throw new Error(err)
      console.log(`Warehouse id:${id} edited`)
    res.send(result)
    })
  }

function deleteWarehouse(req,res){
    let{id} = req.params
    //check if their is any product in the warehouse
    connection.query(`select * from seller_product
        where warehouse_id = ${id}`,(err,result) =>{
        if(err) throw new Error(err)
        console.log(result[0])
        //if not delete warehouse from the list
        if(result[0] == undefined){
            console.log("warehouse is empty")
            connection.query(`
                DELETE FROM warehouse
                WHERE id = ${id}`,(err,result) =>{
                    if(err) throw new Error(err)
                    console.log(`Warehouse id:${id} deleted`)
                    res.send(result)
                })
        }else{
            console.log(`warehouse not empty can not delete`)
            res.send(result)
        }    
    })
}
module.exports = router