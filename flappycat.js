var connect = require('connect'),
	http = require('http'),
	socketio = require('socket.io');
	serialport = require('serialport'),
    argv = process.argv;

if (argv.length < 4) {
    console.log("Usage: node flappycat.js /serial/device baudrate");
    process.exit(1);
}

/* Initialize serial connection */
var ser = new serialport.SerialPort(argv[2], {baudrate: parseInt(argv[3])});

/* Initialize server */
var app = connect().use(connect.static(__dirname + '/public')),
    server = http.createServer(app);
    IO = socketio.listen(server);
server.listen(5000);

/* Socket.io routes */
IO.sockets.on('connection', function (socket) {
	console.log('socket connected');

	socket.on('message', function(data) {
		console.log('recieved jump signal');
		if (data == 'jump') {
			ser.write('1');
			setTimeout(function() {
                ser.write('0');
            }, 500);
		}
	});

	ser.on('data', function(data) {
		console.log('sending jump command');
		socket.send('doJump');
		ser.write('0');
	});
});
