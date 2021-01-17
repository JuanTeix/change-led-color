const express = require('express');
const app = express();
const cors = require('cors')
const server = require('http').Server(app)
// const io = require('socket.io')(server)
const io = require('./socket')
const {board} = require('./placa')

//Connect Sockect IO
io.connect(server);

//initialize the board
board

//Static
app.use(express.static(__dirname + '/public'));

// Middleware
let URL = `192.168.0.106`;
let port = 8081;
const whitelist = [`http://${URL}:${port}`,`http://localhost:${port}`]

var corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
// app.use(cors())


//Router
app.get('/', function (req,res) { 
  	res.sendFile(__dirname + '/public/index.html');
});


//Listen
server.listen(8081, () => console.log('App run http://localhost:8081'))
