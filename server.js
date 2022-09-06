const express = require('express'),
    path = require('path'),
    api = require('./api'),
    config = require('./config');

const app = express();

// Configuring our data parsing
app.use(express.urlencoded({
    extend: false
}));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/sent', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/sent.html'));
});

app.post('/sendEmail', function (req, res) {
    api.sendEmail(req, res);
});

app.listen(config.node_port, function () {
    console.log('Server listening on port ' + config.node_port);
});