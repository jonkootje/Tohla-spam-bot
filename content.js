var adMessage = prompt('Spam message', 'Please visit www.social.web-sj.com');
var disconnectInterval = prompt('Time waiting until automatic disconnect', 'Use 0 or less to not disconnect automatically at all');
var btn = document.getElementById('buttondiv');
var s = -1;
var step = 1;


function curTime() {
    return new Date().getTime();
}

// Tohla defines following functions:
// connect = Connect();
// disconnect = Disconnect();
// send = SendMessage();

function loop() {
    // Steps:
	// 1   =  Disconnect (start)
	// 1.5 =  Connect
	// 2   =  Send spam message
	// 3   =  Reconnect to a new stranger (after interval)
	// 4   =  Sit idle until stranger disconnects
	
    if (step == 1) {
        Disconnect();
        step = 1.5;
        s = curTime();  
    }
    
    if (step == 1.5 && (curTime() - s) >= 1000) {
        Connect();
        s = curTime();
        step = 2;
    }
    
    if (step == 2 && btn.value == 'Disconnect') {
        document.getElementById('textdiv').value = adMessage;
		SendMessage();
		
        console.log('[BOT] Sending message');
        
        if (disconnectInterval > 0) {
			step = 3;
		} else {
			step = 4;
		}
        s = curTime();
    } else if (btn.value != 'Disconnect') {
        console.log('[BOT] Awaiting connection...');
    }
    
    if ((step == 3 && (curTime() - s) >= disconnectInterval) || (step == 4 && btn.value == 'New')) {
		console.log('[BOT] Reconnecting to new stranger...');
        step = 1;
    }
}

setInterval(loop, 50);