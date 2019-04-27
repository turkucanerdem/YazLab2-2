var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//sonradan ekleme
var bodyParser = require('body-parser');
var request = require('request')

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
  //io.emit('this', { will: 'be received by everyone'});
  console.log('user connected')
  
  socket.on('begen', function(begeni) {
  
        console.log("gönderi beğenildi")
        /*console.log(begeni)
         //24ünde eklendi
        request.post('http://localhost:3000/api/begenme', begeni
        , (error, res, body) => {
        console.log()
        if (error) {
          console.error(error)
          return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
      })*/

      //24.04 ekleme
      var mysql = require('mysql')
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'vergaz34',
        database : 'yazlab22'
      });
      haberid=begeni.idhaber
      console.log(haberid)
      connection.connect()

      var query = connection.query('UPDATE  haber SET begenmesayisi = begenmesayisi + 1 WHERE idhaber = ?', [haberid], function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });
      //

      });


  



      socket.on('haberAl', function(haberTurList) {
      console.log(haberTurList)
      //24.04 ekleme
      var mysql = require('mysql')
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'vergaz34',
        database : 'yazlab22'
      });
      
      haberturu = haberTurList.haberturu;
      console.log(haberturu);
      
      connection.connect()

      var query = connection.query('Select * From  haber WHERE haberturu in (?)', haberturu, function (error, results, fields) {
        console.log(results)
        socket.emit('haberGonder',results)
        if (error) throw error;
        // Neat!
      });

      //console.log(query)

      //

            }); 
            
            
      
      socket.on('begenme', function(begeni) {
  
        console.log("gönderi beğenilmedi")

      
        //24.04 ekleme
        var mysql = require('mysql')
        var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : 'vergaz34',
          database : 'yazlab22'
          });
         haberid=begeni.idhaber
         console.log(haberid)
         connection.connect()
      
          var query = connection.query('UPDATE  haber SET begenmemesayisi = begenmemesayisi + 1 WHERE idhaber = ?', [haberid], function (error, results, fields) {
         if (error) throw error;
              // Neat!
          });
            //
      
           });


           socket.on('goruntule', function(begeni) {
  
            console.log("gönderi goruntulendi")
    
          
            //24.04 ekleme
            var mysql = require('mysql')
            var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'vergaz34',
              database : 'yazlab22'
              });
             haberid=begeni.idhaber
             console.log(haberid)
             connection.connect()
          
              var query = connection.query('UPDATE  haber SET goruntulenmesayisi = goruntulenmesayisi + 1 WHERE idhaber = ?', [haberid], function (error, results, fields) {
             if (error) throw error;
                  // Neat!
              });
                //
          
               });
 
  });
 
//


//sonradan eklendi
module.exports = {app: app, server: server};
//