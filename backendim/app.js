var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//sonradan ekleme
var bodyParser = require('body-parser');
//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//sonradan ekleme
var server = require('http').Server(app);
var io = require('socket.io')(server);
//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//sonradan ekleme
app.use(function(req, res, next){
  
  res.io = io;
  
  next();
});
//

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

/* sonradan çıkarıldı
module.exports = app;
*/

//sonradan eklendi
io.on('connection', (socket) => {
  io.emit('this', { will: 'be received by everyone'});
  console.log('user connected')
  
  socket.on('join', function(nickname) {
  
          console.log("joinlendi")
  
          
      });
 
  });
 
//


//sonradan eklendi
module.exports = {app: app, server: server};
//