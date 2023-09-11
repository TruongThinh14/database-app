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
router.get("/",getCustomerProduct)


function getCustomerProduct(req,res){
    connection.query(`
        SELECT * FROM seller_product
        WHERE quantity > 0
    `,(err,result)=>{
        if(err) throw new Error(err)
        res.send(result)
    })
}

module.exports = router