const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//연결 테스트 :)
sequelize.authenticate().then(function(err) {
	console.log('Connection has been established successfully.');
}).catch(function (err) {
	console.log('Unable to connect to the database:', err);
});




//http://docs.sequelizejs.com/en/latest/docs/models-definition/

var User = sequelize.define('user', {
	idx : 		{type : Sequelize.INTEGER ,primaryKey: true},
	userid: 	{type : Sequelize.STRING(500)},
	userpwd:	{type : Sequelize.STRING(1000)},
	username:	{type : Sequelize.STRING(300)},
	userbirth:	{type : Sequelize.STRING(10)}
},{
	createdAt: 'joindate',
	updatedAt: false,
	paranoid: false,
	freezeTableName: true,
	tableName: 'user'
});

module.exports = User;

/*
#==================================================Sequelize 홈페이지 쿼리문예시
// force: true will drop the table if it already exists
User.sync({force: true}).then(function () {
	// Table created
	return User.create({
	firstName: 'John',
	lastName: 'Hancock'
});
User.findOne({
	where: {title: 'aProject'},
	attributes: ['id', ['name', 'title']]
}).then(function(project) {
	// project will be the first entry of the Projects table with the title 'aProject' || null
	// project.title will contain the name of the project
})
User.findAll().then(function(users) {
	console.log(users)
})
#==================================================
User.findAndCountAll({
	where: {
		title: {
			$like: 'foo%'
		}
	},
	offset: 10,
	limit: 2
}).then(function(result) {
	console.log(result.count);
	console.log(result.rows);
});
#=====================================================
User.findOne({
	where: {title: 'aProject'},
	attributes: ['id', ['name', 'title']]
}).then(function(project) {
	// project will be the first entry of the Projects table with the title 'aProject' || null
	// project.title will contain the name of the project
})

*/