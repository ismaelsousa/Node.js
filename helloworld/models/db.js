//conexão ao banco
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postapp','root','ismael123456',{
	host: "localhost",
	dialect:"mysql"
});

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}