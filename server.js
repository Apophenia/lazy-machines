var express = require('express');
var app = express();
var url = require("url");
var pg = require('pg');
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: shove db interaction into module 
var client = new pg.Client(process.env.DATABASE_URL);

client.connect(function(err) {
    if(err) {
	return console.error('Failed to connect to Postgres', err);
    }
});

client.query(
    'CREATE TABLE IF NOT EXISTS queues (uid integer primary key, position integer, content varchar not null)'
);

// Basic routing
app.get('/', function(request, response) {
    response.sendFile("public/index.html");
});

// 404 response
app.use(function(err, request, response, next){
    console.error(err.stack);
    response.send(404, "404: Page not found");
});

// Add
app.use('/add', function(request, response) {
    response.send("add row placeholder");
});	

// Move
app.use('/move', function(request, response) {
    response.send("move row placeholder");
});

// Go!
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
