var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var nickname = '';

  socket.on('login', function(nick){
    nickname = nick;
    io.emit('notif', nickname + ' connects');
  })

  socket.on('chat message', function(msg){
    io.emit('chat message', nickname + ": " + msg);
  });

  socket.on('disconnect', function() {
    io.emit('notif', nickname + ' disconnects');
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
