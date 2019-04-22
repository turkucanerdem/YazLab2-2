var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


app=express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}))


router.post('/', (req, res) => {

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'vergaz34',
    database : 'yazlab22'
  });

  connection.connect()

  console.log(req.body.haberbaslik)
  var post  = {haberresim : 'Hello World', haberbaslik: req.body.haberbaslik, haberid: 7};
  var query = connection.query('INSERT INTO haber SET ?', post, function (error, results, fields) {
    if (error) throw error;
    // Neat!
  });
console.log(query.sql);
  res.render('index', { title: 'Express' })
});




module.exports = router;
