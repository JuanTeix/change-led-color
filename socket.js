const sockeIO = require('socket.io');
const socket = {}

function connect(server){
    socket.io = sockeIO(server)
    if(socket.io){
     console.log("Socket Connect")
    }else{
        console.log("Error Socket Connect")
    }
}
// param1 action,
function activate(act, fun){
    socket.io.on(act, fun)
}

module.exports = {
    connect,
    socket,
    activate,
}
