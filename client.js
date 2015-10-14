$(document).ready(function(){
	// WebSocket
	var socket = io.connect();
    var i = 0;
    var name;
	// neue Nachricht
	socket.on('chat', function (data) {
		var zeit = new Date(data.zeit);
		$('#content').append(
			$('<li></li>').append(
				// Uhrzeit
				$('<span>').text('[' +
					(zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours())
					+ ':' +
					(zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes())
					+ '] '
				),
				// Name
				$('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : ''),
				// Text
				$('<span>').text(data.text))
		);
		// nach unten scrollen
		$('body').scrollTop($('body')[0].scrollHeight);
	});
	// Nachricht senden
	function senden(){
		// Eingabefelder auslesen
        if (i == 0){
        name = $('#name').val();
		$('#name').val('');
        $('#name').attr("placeholder","Schreib etwas...");
        }
        
                  
        else{
		var text = $('#name').val();
		// Socket senden
		socket.emit('chat', { name: name, text: text });
		// Text-Eingabe leeren
		$('#name').val('');
        }
        i++;
	}
	// bei einem Klick
	$('#senden').click(senden);
	// oder mit der Enter-Taste
	$('#name').keypress(function (e) {
		if (e.which == 13) {
			senden();
		}
	});
});