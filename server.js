var express = require('express');
var app = express();

app.use(express.static('vote_tracker_files'));

app.get('/secret', function(req, res) {
  res.send('The cake is a lie');
});

app.use(function (req, res) {
  var options = {
    root: __dirname + '/vote_tracker_files/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile('404.html', options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent:', '404.html ' + new Date());
    }
  });
})

var server = app.listen(5000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('I am listening at http:// ', host, port);
});
