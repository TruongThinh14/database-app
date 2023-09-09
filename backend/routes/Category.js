const express = require("express");
const router = express.Router();
const Category = require("../CategoryModel");

router.use(express.json())
router.get("/",getCategoryList)
router.post("/",addCategoy)
router.put("/:id",updateCategory)
router.delete("/:id",deleteCategory)

async function getCategoryList(req,res){
        const categories = await Category.find()
        res.status(200).send(categories)
}

async function addCategoy(req,res){
        const category = req.body
        await Category.create(category)
        res.sendStatus(201)
}

async function updateCategory(req,res){
        const {id} = req.params
        const category = req.body
        await Category.findByIdAndUpdate( id, category)
        res.sendStatus(201)
}
async function deleteCategory(req,res){
        const {id} = req.params
        await Category.findByIdAndDelete(id)
        res.sendStatus(200)
}
module.exports = router