//SLACK-휘님 : 출석체크 모델

const DataTypes = require('sequelize');
const sequelize = require('../config/database2');
/*
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('attendance', {
		idx				: {type : DataTypes.INTEGER(11), primaryKey: true}
		,date			: {type : DataTypes.DATEONLY, primaryKey: true, validate : { isDate: true }}
		,memo			: {type : DataTypes.STRING(2000)}
		,submit_date	: {type : DataTypes.DATE}
		,file_name		: {type : DataTypes.STRING(100)}
	}, {
		timestamps: false,
		tableName: 'attendance'
	});
};
*/

var Attendance = sequelize.define('attendance', {
	idx				: {type : DataTypes.INTEGER(11), primaryKey: true}
	,date			: {type : DataTypes.DATEONLY, primaryKey: true, validate : { isDate: true }}
	,memo			: {type : DataTypes.STRING(2000)}
	,submit_date	: {type : DataTypes.DATE}
	,file_name		: {type : DataTypes.STRING(100)}
}, {
	timestamps: false,
	tableName: 'attendance'
});
	
	
module.exports = Attendance;