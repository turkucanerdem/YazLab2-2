var express = require('express');
app=express();

//SOCKET IO 2.2.0 dan 1.7.3 PACKAGE.JSON

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 




var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  //sonradan eklendi
  //res.io.emit("socketToMe", "users");
  //
  res.render('index', { title: 'Express' });
});

var maxid = 0;


//Haber Ekleme
router.post('/', (req, res) => {

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'vergaz34',
    database : 'yazlab22'
  });

  var date = new Date().toJSON().slice(0, 10)
  
  connection.connect()

  var getidquery = connection.query('SELECT max(idhaber) as max from haber', function (error, results) {
    if (error){
      throw error;
    }
    else{
        maxid = results[0].max + 1;
        console.log("Fonksiyon içinde" + maxid)
        var post  = {haberresim : req.body.haberResim,
        haberbaslik: req.body.haberBasligi,
        habericerik: req.body.haberIcerigi,
        haberturu: req.body.haberTuru,
        yayinlanmatarihi: date,
        idhaber: maxid };
         var query = connection.query('INSERT INTO haber SET ?', post, function (error, results, fields) {
         if (error) throw error;
         // Neat!
       });
    }
  });
    console.log("fonksiyon dışında:" +maxid)
    

  
   
   
  res.render('index', { title: 'Express' })

});

//23.04.2019dan sonrakiler
//Beğenme isteği
router.post('/api/begenme', function(req, res, next) {


  var haberid = req.body.idhaber
  console.log(haberid)

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'vergaz34',
    database : 'yazlab22'
  });

  connection.connect()

  var query = connection.query('UPDATE  haber SET begenmesayisi = begenmesayisi + 1 WHERE idhaber = ?', [haberid], function (error, results, fields) {
    if (error) throw error;
    // Neat!
  });

  
  
  //24.0.4 de comment e alındı
  //res.render('index', { title: 'Express' });
});

//beğenmeme isteği
router.post('/api/begenmeme', function(req, res, next) {
  var haberid = req.body.idhaber
  console.log(haberid)

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'vergaz34',
    database : 'yazlab22'
  });
  
  connection.connect()

  var query = connection.query('UPDATE  haber SET begenmemesayisi = begenmemesayisi + 1 WHERE idhaber = ?', [haberid], function (error, results, fields) {
    if (error) throw error;
    // Neat!
  });

  res.render('index', { title: 'Express' });
});


app.get('/api/haberyolla', function(req, res){
  res.io.emit
});



module.exports = router;

