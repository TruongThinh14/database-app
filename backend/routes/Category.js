const express = require("express");
const router = express.Router();
const Category = require("../CategoryModel");


// router.get("/",getCategoryList)
// router.post("/add",addCategoy)

async function getCategoryList(req,res){
    try{
        const categories = await Category.find()
        res.status(200).send(categories)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

async function addCategoy(req,res){
    try {
        const category = req.body
        await Category.create(category)
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
module.exports = router