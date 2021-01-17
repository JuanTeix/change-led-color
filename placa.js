const express = require('express');
const app = express();
const server = require('http').Server(app)
//Sockect IO
const io = require('./socket')
const five = require('johnny-five');



const board = new five.Board({
    repl:false
});

board.on('ready', function () {
  let LedRGB = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  });

  LedRGB.on();
  LedRGB.color("#fcba03");

  LedRGB.blink(1000);

  let blink = true;

  io.activate('connection', (socket) => {
    console.log('Client Connect');
    socket.emit('message', "Welcome");

      socket.on('blue', () => {
          LedRGB.on();
          LedRGB.color("blue");
      });

      socket.on('green', () => {
          LedRGB.on();
          LedRGB.color("green");
      });

      socket.on('red', () => {
          LedRGB.on();
          LedRGB.color("red");
      });

      socket.on('stop', () => {
          if (blink){
              LedRGB.stop();
              blink = false;
          }
          else{
              LedRGB.blink(1000);
              blink = true;
          }
      });

      socket.on('off', () => {
          LedRGB.off()  
      });

      socket.on('on', () => {
          LedRGB.on(); 
      });

      socket.on('ranger', (v) => {
          LedRGB.intensity(v)
          console.log(`valor de la intencidad ${v}`);
      })

  });
});

module.exports = {
    board,
}