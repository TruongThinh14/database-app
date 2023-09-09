const mysql = require('mysql')

exports.setupDb = () => {
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
        // connection.query("DROP DATABASE IF EXISTS asm2DBss",(err,res) =>{
        //   if(err) throw new Error(err);
        // console.log("database dropped")
        // return console.log(res)
        // })
      //create new database
        connection.query("CREATE DATABASE IF NOT EXISTS asm2DBss",(err,res) =>{
          if(err) throw new Error(err);
        console.log("database created")
       // return console.log(res)
        })
        connection.query("use asm2DBss",(err,res) =>{
          if(err) throw new Error(err);
        console.log("database used")
       // return console.log(res)
        })
        connection.query(`DROP TABLE IF EXISTS seller_product`)
        connection.query(`DROP TABLE IF EXISTS warehouse`)
        //create seller product table
        connection.query(`CREATE TABLE seller_product(
          id int PRIMARY KEY AUTO_INCREMENT,
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
          id int PRIMARY KEY AUTO_INCREMENT,
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
         (1,"watermelon","juicy and delicious", 10000,"img String",10,10,10,1),
         (2,"RC car","fast and cheap", 50000,"img String",20,7,13,3),
         (3,"Couch","super comfy", 700000,"img String",100,40,40,1),
         (4,"Bath tub","shower like a king", 1400000,"img String",100,50,30,3),
         (5,"Knife","package include whole set", 400000,"img String",20,10,5,3)`,(err,res) =>{
          if(err) throw new Error(err)
          console.log("data added to table seller_product")
        })
        //drop procedure if exist
        connection.query(`DROP PROCEDURE IF EXISTS check_available_warehouse`)
        //create store procedure to select available warehouse
        connection.query(`
          CREATE PROCEDURE check_available_warehouse(IN productVolume INT)
          BEGIN
            SELECT * 
            FROM warehouse
            WHERE total_volume >= productVolume
            ORDER BY total_volume DESC;
          END;
        `,(err,result) =>{
          if(err) throw new Error(err)
          console.log("procedure check available warehouse created")
        })
    })
}