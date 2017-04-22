var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

var User = require('../models/user');
var Attendance = require('../models/attendance');
var md5 =require('md5')

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
	
	//쓸데없이 비밀번호 체크하는부분입 auth에서 가져옴 ^*^
	User.findOne({
		where: {id: sess.user_id,pass: md5(req.param('pwd'))}
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
		//console.log(result.birth);
		if(result.birth)	result.birth = moment(result.birth).format("YYYY[-]MM[-]DD");
		//console.log(result.birth);
		res.render('mypage/edit',{usr : result});
	});
	
});

//정보수정 받는부분
router.post('/edit',function(req,res){
	if(!req.session.username)	res.redirect('/auth/login');
	
	var upData = {
		name:req.param('name'),
		birth:req.param('birth')
	}
	
	if(req.param('changepwd')){
		upData.pass = md5(req.param('pwd'));
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


router.get('/stamp',function(req,res,next){
	if(!req.session.username)	res.redirect('/auth/login');
	
	//console.log(new moment());
	
	var current = (req.param('m'))?
		(req.param('y')+'-'+req.param('m')):new moment().format("YYYY[-]MM");
	var Week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	var Month = [31,28,31,30,31,30,31,31,30,31,30,31];
	
	Attendance.findAndCountAll({
		where: {
			idx: req.session.usernum,
			date: {$between: [current+'-01', current+'-31']}     // DATE BETWEEN A AND B
		}
	}).then(function(result) {
		console.log(result.count);
		console.log(result.rows);
		res.render('mypage/calendar',{checked : result, current : current, calendar : [moment,Week,Month]});
	});

	
});

module.exports = router;