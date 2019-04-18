const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
//carregando models categorias
require("../models/Categoria")

//pega o modulo do arquivo Categorias.js
const Categoria = mongoose.model("Categorias")



//routers //rotas
router.get("/", function(req, res){
    res.render("admin/index")
})


router.get("/posts", function(req, res){
    res.send("pagina de posts")

})

//routers of marcar

router.get("/categorias", function(req, res){
    //fazendo uma busca nas categorias e passando para a pagina
    Categoria.find().sort({date: 'desc'}).then(function(categorias){
        res.render("admin/categorias", {categorias: categorias})
    }).catch((error)=>{
        req.flash('error_msg', "houve um erro ao listas as marcas")
        res.redirect("/admin")
    })
    
})

router.get("/categorias/add", function(req, res){
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", function(req, res){
    //validacao do formulario
    var erros = [] 
    //se o nome for vazio ou undefined ou null
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto:"Nome inválido"})        
    }
    if(!req.body.slug || typeof req.body.slug == undefined  || req.body.slug == null){
        erros.push({texto:"Slug inválido: coloque somente letras e que sejam minúsculas"})        
    }

    if(erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    }else{
        console.log("criou a categoria")
        //se não houver erros cria no banco
        const novaCatedoria = {
            // ESSE REQ.BODY.NOME É REFERENCIA PARA O ADDCATEGORIAS
            // QUE POSSUE UM NAME=  "NOME"
            nome: req.body.nome,
            slug: req.body.slug
        }
        //schema do modulo
        new Categoria(novaCatedoria).save().then((result) => {
            //enviar msg de sucesso para variavel global
            req.flash("success_msg","Marca criada com sucesso")
            res.redirect('/admin/categorias')
        }).catch((error) => {
            //envia msg de erro para variavel global
            req.flash("error_msg","Houve um erro ao salvar a marca, tente novamente!")
        });
    
    }
    

})

//quando usa ":" é um parametro que recebe
router.get("/categorias/edit/:id", function(req, res){
    //fazer busca no bd pelo id passado
    Categoria.findOne({_id: req.params.id}).then(function(categoria){//usa params pq foi passado 
        res.render('admin/editcategoria', {categoria: categoria});
    }).catch(function(error){
        req.flash('error_msg','Esta marca não existe')
        res.redirect('/admin/categorias')
    })
    
})

router.post("/categorias/edit", function(req, res){    
            Categoria.findOne({_id:req.body.id}).then(function(categoria){
                //pega a categoria que vai ser editada e substitue os valores
                categoria.nome = req.body.nome
                categoria.slug = req.body.slug
                //savar
                categoria.save().then(function(){
                    req.flash("success_msg", "Atualizado com sucesso")
                    res.redirect("/admin/categorias")
                }).catch((error)=>{
                    req.flash("error_msg", "Não foi possível atualizar")
                    res.redirect("/admin/categorias")
                })
            }).catch(function(error){
                req.flash("error_msg", "Não foi possível atualizar, tente novamente!")
                res.redirect("/admin/categorias")
            })
})
//rota de deletar
router.post("/categorias/deletar", function(req, res){
    Categoria.remove({_id:req.body.id}).then(function(){
        req.flash("success_msg", "Deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch(function(error){
        req.flash("error_msg", "Não foi possível deletar, tente novamente!")
        res.redirect("/admin/categorias")
    })
})
module.exports = router