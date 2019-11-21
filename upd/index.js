var path = require('path');
var fs = require('fs');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(express.static('www'));

app.get('/metadata', function (req, res) {
  fs.readFile(path.join(__dirname, '..', 'www', 'metadata.json'), function (err, data) {
    if (err) {
      console.error('Error reading file');
      res.status(500);
      res.send('{}');
    }
    else {
      res.contentType('application/json');
      res.send(data);
    }
  });
});

app.post('/metadata', function (req, res) {
  if ('title' in req.body && 'composer' in req.body && 'live' in req.body) {
    fs.writeFile(path.join(__dirname, '..', 'www', 'metadata.json'), JSON.stringify({'title': req.body.title, 'composer': req.body.composer, 'live': req.body.live}), function (err) {
      if (err) {
        console.error('Error updating file');
        res.status(500);
      }

      res.send();
    });
  }
  else {
    res.status(400);
    res.send();
  }
});

app.listen(8070, function () {
  console.log('Carillon updater running...');
});
