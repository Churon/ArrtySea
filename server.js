var express = require('express')
var fs = require('fs')
//RTC
var privateKey = fs.readFileSync('fakekeys/privatekey.pem').toString(),
    certificate = fs.readFileSync('fakekeys/certificate.pem').toString()
,   app = express()
,   conf = require('./config.json')
//,   http = require('http')
,   https = require('https').createServer({key: privateKey, cert: certificate}, app).listen(conf.port)
,   io = require('socket.io').listen(https);

// Webserver
// auf den Port der config.json schalten (8080)
// http.listen(conf.port);



//RTC
//https.createServer({key: privateKey, cert: certificate}, app).listen(conf.port);
//http.createServer(app).listen(conf.port);


app.configure(function(){
	// statische Dateien ausliefern --> Dateien im Ordner Public zu Verfügung stellen
	app.use(express.static(__dirname));
});

// wenn der Pfad "/" aufgerufen wird...
app.get('/', function (req, res) {
	// ...wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/public/index.html');
});

// Websocket
io.sockets.on('connection', function (socket) {
	// der Client ist verbunden
	socket.emit('chat', { zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!' });
	// wenn ein Benutzer einen Text sendet
	socket.on('chat', function (data) {
		// hier wird der Text an alle anderen Benutzer gesendet
		io.sockets.emit('chat', { zeit: new Date(), name: data.name || 'System:', name: data.name, text: data.text });
	});
});



// URL:Portnummer in die Konsole schreiben
console.log('Der Server läuft nun unter "URL:"' + conf.port + '/');
