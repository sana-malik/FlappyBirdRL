var connect = require('connect'),
	http = require('http'),
	socketio = require('socket.io'),
	serialport = require('serialport')
	SerialPort = serialport.SerialPort,
	serialPort = new SerialPort('/dev/tty.usbmodemfa131', {baudrate: 9600}),
	path = require('path');

var app = connect()
  .use(connect.static('/Users/sana/Documents/School/14-02\ Spring/CMSC838F\ -\ Tangible\ Computing/MPA01\ -\ FlappyCat/FlappyBirdRL'));

var server = http.createServer(app);

var IO = socketio.listen(server);
server.listen(5000);

IO.sockets.on('connection', function (socket) {
	console.log('socket connected');


	socket.on('message', function(data) {
		console.log('recieved jump signal');
		if (data == 'jump') {
			serialPort.write('1');
			setTimeout( function() {serialPort.write('0');}, 500);
		}
	});

	serialPort.on('data', function(data) {
		console.log('sending jump command');
		socket.send('doJump');
		serialPort.write('0');
	});
});