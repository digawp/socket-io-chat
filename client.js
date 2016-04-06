var io = require('socket.io-client');
var $ = require('jquery');

function appendMessage (msg) {
  $('#messages').append($('<li>').text(msg));
}

function login () {
  socket.emit("login", nick);
}

var nick = prompt("Enter your nickname");

var socket = io();

login();

$('form').submit(function(){
  var msg = nick + ": " + $('#m').val();
  appendMessage(msg);
  socket.emit('chat message', msg);
  $('#m').val('');
  return false;
});

socket.on('reconnect', function() {
  login();
  $('#messages').append($('<li class="notif">').text("Reconnected."));
});

socket.on('disconnect', function() {
  $('#messages').append($('<li class="notif">').text("Disconnected. Reconnecting..."));
});

socket.on('chat message', appendMessage);

socket.on('notif', function(msg){
  $('#messages').append($('<li class="notif">').text(msg));
});