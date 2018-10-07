var express = require('express');
var bodyParser = require('body-parser');
var app = express();

/** Mount the Logger middleware here */
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

/** Mount the body-parser middleware */
app.use(bodyParser.urlencoded({extended: false}));

/** A first working Express Server */
app.get("/", function(req, res) {
  res.send('Hello Express');
})

/** Serve an HTML file */
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/** Serve static assets  */
app.use(express.static(__dirname + '/public'));

/** serve JSON on a specific route */
app.get('/json', function(req, res) {
  res.json(process.env.MESSAGE_STYLE=='uppercase' ? {message: 'HELLO JSON'} : {message: 'Hello json'});
});

/** Chaining middleware. A Time server */

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});

/** Get input from client - Route parameters */

app.get('/:word/echo', function(req, res){
  res.json({echo: req.params.word});
})

/** Get input from client - Query parameters */

app.route('/name').get(function(req, res) {
  res.json({name: req.query.first + ' ' + req.query.last});
}).post(function(req, res) {
  res.json({name: req.body.first + ' ' + req.body.last});
});
   
app.listen(process.env.PORT || 3000 );

module.exports = app;
