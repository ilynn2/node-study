var express = require('express');
var router = express.Router();

var User = require('../models/user');
var md5 = require('md5');


router.get('/', function(req, res, next) {
	res.redirect('/mypage');	
	//res.send('respond with a resource');
});

router.all('/join',function(req,res,next){
	if(req.session.user_id)	res.redirect('/');
	res.render('auth/join');
});


//회원가입 이전
router.post('/register',function(req,res,next){

	/*
		idx			: {type : DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true}
		,id			: {type : DataTypes.STRING(50), allowNull: false, validate : { is: ["^[a-z0-9_-]+$",'i'] }}
		,pass		: {type : DataTypes.STRING(200), allowNull: false}
		,name		: {type : DataTypes.STRING(50)}
		,tel		: {type : DataTypes.STRING(20)}
		,phone		: {type : DataTypes.STRING(20)}
		,email		: {type : DataTypes.STRING(100), validate : { isEmail: true }}
		,birth		: {type : DataTypes.DATEONLY,validate : { isDate: true }}
		,reg_date	: {type : DataTypes.DATEONLY, validate : { isDate: true }, defaultValue : DataTypes.NOW}
		,ip			: {type : DataTypes.STRING(15), validate : { isIP: true }}
	*/
	
	if(req.param('id')){
		//암호화 - 변경예정
		var password = md5(req.param('pwd'));
		
		//for insert data by json
		var data = {
			id:req.param('id')
			,pass:password
			,name:req.param('name')
			,birth:req.param('birth')
		};
		
		//tel, phone, email, ip
		
		
		User.create(data).then(function(result) {
			//res.json(result);
			var result = '<script>alert("가입완료!로그인 후 이용해 주세요!");location.href="/";</script>';
			res.send(result);
		}).catch(function(err) {
			console.log(err);
		});
	}else{
		alert('데이터가 이상해요');
		res.redirect('/user/join');
	}

	
});


module.exports = router;
