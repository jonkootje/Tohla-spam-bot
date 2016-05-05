var input = document.getElementById('textdiv');
var adMessage = 'Please visit www.social.web-sj.com';
var adMessage = prompt('Spam message', adMessage)
var btn = document.getElementById('buttondiv');
var interval = 50;


function curTime() {
    return new Date().getTime();
}

function send(msg) {
    input.value = msg;
    SendMessage();
    
    return true;
}
// connect = Connect();
// disconnect = Disconnect();
// send = SendMessage();

var s = true;
var step = 1;


function loop() {
    
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
        send(adMessage);
        console.log('[BOT] Sending message');
        
        step = 3;
        s = curTime();
        
    } else if (btn.value != 'Disconnect') {
        console.log('[BOT] A waiting connection...');
    }
    
    
    if (step == 3 && (curTime() - s) >= 6000) {
        console.log('[BOT] Reconnecting...');
        step = 1;
    }
    
    return true;
}

setInterval(loop, interval);