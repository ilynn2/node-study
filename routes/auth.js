var express = require('express');
var router = express.Router();

var User = require('../models/user');
var md5 = require('md5');

router.get('/', function(req, res, next) {
	res.redirect('/auth/login');
});

router.get('/login', function(req, res, next) {
	sess = req.session;
	//이미 로그인한 아이디는 메인으로
	if(req.session.user_id)	res.redirect('/');

	res.render('auth/login');
});

router.post('/authenticator',function(req,res,next){

	//console.log(req.param);
	//로그인 유효성 검사 후 세션 만들어줘야함
	//sess = req.session;sess.username = "velopert"
	sess = req.session;
	
	User.findOne({
		where: {id: req.param('id')}
	}).then(function(result) {
		//res.json(project);
		if(result && result.pass== md5(req.param('pwd')) ){
			sess.user_id = result.id;
			sess.username = result.name;
			sess.usernum = result.idx;
			sess.userbirth = result.birth;
		}
		res.redirect('/auth/login');
	});
	
});

router.get('/logout', function(req, res){
	sess = req.session;
	if(sess.username){
		req.session.destroy(function(err){
			if(err)	console.log(err);
			else	res.redirect('/');
		});
	}else{
		res.redirect('/');
	}
});


module.exports = router;
