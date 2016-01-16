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
    socket.broadcast.emit('notif', nickname + ' connects');
  })

  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    socket.broadcast.emit('notif', nickname + ' disconnects');
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
