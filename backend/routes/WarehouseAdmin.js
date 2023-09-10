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

router.get("/",getAllWarehouse)
router.get("/:inputId", viewWarehouse)
router.post("/:name/:address/:total_volume",addWarehouse)
router.put("/:id/:newName/:newAddress/:newTotalVolume",editWarehouse)
router.delete("/:id",deleteWarehouse)


function getAllWarehouse(req,res){
    connection.query(`SELECT * FROM warehouse`,(err,result)=>{
        if(err) throw new Error(err)
        res.send(result)
    })
    
}

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
    INSERT INTO warehouse (name,address,total_volume,product_number)
    VALUES
    (${name},${address}, ${total_volume},0)
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
    connection.query(`
        DELETE FROM warehouse
        WHERE id = ${id} AND product_number = 0`,(err,result) =>{
            if(err) throw new Error(err)
            if(result[0] == undefined){
                console.log("warehouse is not empty")
                res.send(result)
            }else{
                console.log(`warehouse id:${id} deleted`)
                res.send(result)
            }

            
    })
}
module.exports = router