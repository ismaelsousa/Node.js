const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const Post = require("./models/Post");
//handlebars
const handlebars = require('express-handlebars')
//configuração do handlebars
	app.engine('handlebars', handlebars({defaultLayout: 'main'}))
	app.set('view engine', 'handlebars')





//body-parse
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//public
app.get('/cad', function(req, res){	
	res.render('formulario')
});
app.get('/', function(req, res){
	Post.findAll({order:[['id','DESC']]}).then(function(posts){
		res.render('home', {posts: posts})	
	})
	
});
app.get('/deletar/:id', function(req, res){	
	Post.destroy({where: {'id': req.params.id}}).then(function(){
		res.send("postagem deletada")
	}).catch(function(erro){
		res.send("esta n existe")
	})
});

app.post('/add', function(req, res){	

	Post.create({
		titulo: req.body.titulo,
		conteudo: req.body.conteudo
	}).then(function(){
		res.redirect("/")
	}).catch(function(erro){
		res.send("houve erro:"+ erro)
	})
});

app.listen(8081, function(){
	console.log("server rodando");
});
