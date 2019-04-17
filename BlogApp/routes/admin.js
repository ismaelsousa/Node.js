const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

router.get("/", function(req, res){
    res.render("admin/index")
})


router.get("/posts", function(req, res){
    res.send("pagina de posts")

})

router.get("/categoria", function(req, res){
    res.render("admin/categorias")
})

router.get("/categorias/add", function(req, res){
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", function(req, res){
    res.render("admin/addcategorias")
})
module.exports = router