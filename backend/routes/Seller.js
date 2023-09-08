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

router.get("/:inputId", findWarehouse)


function findWarehouse(req, res){
    let {inputId} = req.params
   connection.query(`SELECT * FROM warehouse WHERE id = ${inputId}`,(err,result) =>{
    if(err) throw new Error(err)
    console.log(`Warehouse id:${inputId} fetched`)
    res.send(result)
  })
}

module.exports = router