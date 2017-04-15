var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
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
	
	if(req.param('id')){
		//암호화는 언제쯤하냐 제발
		var id = req.param('id');		
		var pwd = req.param('pwd');
		var name = req.param('name');
		var birth = req.param('birth');
		
		//data insert -- test
		var data = {userid:id,userpwd:pwd,username:name,userbirth:birth};
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
