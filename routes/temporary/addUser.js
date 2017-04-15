var express = require('express');
var router = express.Router();
// 0409 스터디 : 개념을 잘 모르는 상태에서 했던것들 버려짐
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '210.183.39.51',
  user     : 'inna',
  password : 'inna@2017#',
  port     : 3306,
  database : 'inna'
});

var params = new Object();

router.post('/',function(req,res,next){
    params.id = req.param('user');
    params.pwd = req.param('pwd');
    params.name = req.param('name');
    if(params.id)    params.status = regist(params);
    res.render('addUser',{ postParams : params });
});


function regist(params){
    console.log(JSON.stringify(params));
    connection.connect();
    var _query = "INSERT INTO member SET ?";
    //_query = "SELECT * FROM member";

    var result =true;
    var query = connection.query(_query , params,  function(err, result) {
        if (!err){
            console.log('Result :'+JSON.stringify(result));
        }else{
            console.log('Error while performing Query.', err);
            console.log("\n");
            result = false;
        }
    });
    connection.end();
    return result;
}


module.exports = router;
