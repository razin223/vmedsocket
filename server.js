const express = require('express');
const app = express();
const port = 3000;
const http = require('http').createServer(app);


app.get('/', function (req, res) {
    //console.log("Homepage");
    res.sendFile(__dirname + '/index.html');
});

const io = require('socket.io')(http, {
    'pingTimeout': 4000,
    'pingInterval': 2000
});
io.on("connection", (socket) => {

    socket.emit("welcome", "Hello there. Your id is " + socket.id);
    socket.emit("id", socket.id);


    socket.on('msg', (data) => {
        data.from = socket.id;
        io.to(data.to).emit('msg', data);
    });


    /*
     socket.on('call', (data) => {
     var RemoteId = data.to;
     var OfferSDP = data.offerSDP;
     
     
     io.to(RemoteId).emit('incomingCall', {from: socket.id, "OfferSDP": OfferSDP});
     
     });
     socket.on("getUser", () => {
     
     io.clients((error, clients) => {
     if (error)
     throw error;
     socket.emit("new-list", clients);
     });
     });
     
     
     socket.on('typing', (data) => {
     io.to(data.to).emit('typing', {from: socket.id});
     });
     
     socket.on('typing-stopped', (data) => {
     io.to(data.to).emit('typing-stopped', {from: socket.id});
     });
     
     
     socket.on('text-msg', (data) => {
     io.to(data.to).emit('text-msg', {from: socket.id, msg: data.msg});
     });
     
     
     socket.on('call', (data) => {
     io.to(data.to).emit('incoming-call', {from: socket.id, offerSDP: data.offerSDP});
     });
     
     
     socket.on('answer', (data) => {
     console.log('Answer received ' + data.to);
     io.to(data.to).emit('answer', {from: socket.id, answerSDP: data.answerSDP});
     });
     
     
     
     
     
     
     
     
     
     
     socket.on('disconnect', function () {
     });
     
     */
});
http.listen(port, () => {
    console.log("Server listening " + port);
});