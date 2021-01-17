let URL = location.href;
console.log(URL);

const socket = io.connect(URL , {
                forceNew: true,
            });

        socket.on("message" ,  (data) => {
            console.log(data);
        })
		 
		function changeBlue(){
            socket.emit('blue');
        }
        
		function changeGreen(){
            socket.emit('green');
        }
        
		function changeRed(){
            socket.emit('red');
		}

		function stopBlink(){
            socket.emit('stop');
        }
        
		function offLed(){
            socket.emit('off');
        }
        
		function onLed(){
            socket.emit('on'); 
        }
        
        function intensity(val){
            let valor = Number(document.getElementById('range').value ) ;
            console.log(typeof valor);
            document.getElementById('textInput').value = valor;
            socket.emit('ranger', valor);
        }


		document.getElementById('btn_blue').onclick = changeBlue;
		document.getElementById('btn_green').onclick = changeGreen;
		document.getElementById('btn_red').onclick = changeRed;
		document.getElementById('btn_stop').onclick = stopBlink;
		document.getElementById('btn_off').onclick = offLed;
        document.getElementById('btn_on').onclick = onLed;
        document.getElementById('range').onchange = intensity;



