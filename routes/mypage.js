var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');

//var dateFormat = require('dateformat');
var moment = require('moment');


/* GET home page. */
router.get('/', function(req, res, next) {
	sess = req.session;
	//로그인 필수항목!
	if(!sess.username)	res.redirect('/auth/login');
	if(req.cookies && req.cookies.mypage)	res.redirect('/mypage/edit');
	res.render('mypage/main');
});

router.post('/chkPassword',function(req,res,next){
	sess = req.session;
	
	//쓸데없이 비밀번호 체크하는부분입ㄴㅣ다 auth에서 가져옴 ^*^
	User.findOne({
		where: {userid: sess.user_id , userpwd : req.param('pwd')}
	}).then(function(result) {
		if(result){
			res.cookie('mypage', 1, {
				maxAge: 500000
			});
		}
		res.json(result);
	});
	
});

router.get('/edit',function(req,res){
	if(!req.session.username)	res.redirect('/auth/login');
	if(!req.cookies || !req.cookies.mypage)	res.redirect('/mypage');
	
	User.findOne({
		where: {idx : req.session.usernum}
	}).then(function(result) {
		//console.log(result.userbirth);
		//if(result.userbirth)	result.userbirth = moment(result.userbirth).format("yyyy-mm-dd");
		//console.log(result.userbirth);
		res.render('mypage/edit',{usr : result});
	});
	
});

//정보수정 받는부분
router.post('/edit',function(req,res){
	if(!req.session.username)	res.redirect('/auth/login');
	
	var upData = {
		username:req.param('name'),
		userbirth:req.param('birth')
	}
	
	if(req.param('changepwd')){
		upData.userpwd = req.param('pwd');
	}
	
	User.update(upData,{
		where: {idx: req.session.usernum}, returning: true})
	.then(function(result) {
			res.send('<script>alert("변경했습니다.");location.href="/mypage/edit";</script>');
	}).catch(function(err) {
		//TODO: error handling
		console.log(err);
	});
	
	
});

module.exports = router;