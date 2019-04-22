var express = require('express');
app=express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true })); 

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
  id = 12
  console.log(req.body.haberBaslik)
  var post  = {haberresim : req.body.haberResim,
   haberbaslik: req.body.haberBasligi,
   habericerik: req.body.haberIcerigi,
   haberturu: req.body.haberTuru,
   yayinlanmatarihi: date,
   haberid: id };
  var query = connection.query('INSERT INTO haber SET ?', post, function (error, results, fields) {
    if (error) throw error;
    // Neat!
  });
console.log(query.sql);
  id= id+1; 
   
  res.render('index', { title: 'Express' })

});




module.exports = router;
