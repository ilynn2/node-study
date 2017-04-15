var express = require('express');
//0413 layout
var expressLayouts = require('express-ejs-layouts');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

//0413 layout - old-version
var engine = require('ejs-locals')



var app = express();

//0412 session
var session = require('express-session');
app.use(session({
	secret: '!?inna@#:)',
	resave: false,
	saveUninitialized: true
}));
app.use(cookieParser());

//출처 - hwi : 세션을 전역변수로 만든다
app.use(function(req, res, next) {
	res.locals.userdata = req.session;
	next();
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//컨트롤러 설정부
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));
app.use('/auth',require('./routes/auth'));
app.use('/mypage',require('./routes/mypage'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
