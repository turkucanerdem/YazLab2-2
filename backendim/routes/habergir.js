var express = require('express');
var router = express.Router();
var app = express()



app.post('/',function(req,res){
    res.render('index', { title: 'Express' });
});


module.exports = router;



