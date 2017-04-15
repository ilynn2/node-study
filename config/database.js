var connection = require('./connection.js');

var Sequelize = require('sequelize');
//				new Sequelize('postgres://user:pass@example.com:5432/dbname');
//var sequelize = new Sequelize('mariadb://'+connection.user+':'+connection.password+'@'+connection.host+':'+connection.port+'/'+connection.database); //<- 이거 왜안대여!!

var sequelize = 
	new Sequelize(connection.database, connection.user, connection.password,{
		host: connection.host,
		pool : {max:10,min:0,idle:10000}
	});
//내보내줍니다
module.exports = sequelize;