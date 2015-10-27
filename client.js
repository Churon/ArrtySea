
//$(document).ready(function(){
	// WebSocket
	var socket = io.connect();
    var i = 0;
    var name;
	// neue Nachricht
	socket.on('chat', function (data) {
        
		var zeit = new Date(data.zeit);
        var content = document.getElementById("content");
        var li = document.createElement("li");
        var span = document.createElement("span");
        var newspan = document.createElement("span");
        var b = document.createElement("b");
        
        
        
        span.innerHTML= '[' +
					(zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours())
					+ ':' +
					(zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes())
					+ '] ';
        b.innerHTML = typeof(data.name) != 'undefined' ? data.name + ': ' : '';
        
        newspan.innerHTML = data.text;
        
        li.appendChild(span);
        li.appendChild(b);
        li.appendChild(newspan);
        
        content.appendChild(li);
		/*$('#content').append(
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
		);*/
		// nach unten scrollen
		//$('#content').scrollTop($('#content')[0].scrollHeight);
        document.getElementById("content").scrollTop=document.getElementById("content").scrollHeight;
	});
	// Nachricht senden
	function senden(){
		// Eingabefelder auslesen
        if (i == 0){
        //name = $('#name').val();
        name = document.getElementById("name").value;
		//$('#name').val('');
        document.getElementById("name").value="";
        //$('#name').attr("placeholder","Schreib etwas...");
            document.getElementById("name").setAttribute("placeholder","Schreib etwas...");
	       socket.emit('chat', { zeit: new Date(), name: 'System' , text: name + ' hat den Chat betreten' });

        }
        
                  
        else{
		//var text = $('#name').val();
        var text = document.getElementById("name").value;
		// Socket senden
		socket.emit('chat', { name: name, text: text });
		// Text-Eingabe leeren
		//$('#name').val('');
        document.getElementById("name").value= "";
         document.getElementById("content").scrollTop=document.getElementById("content").scrollHeight;   
        }
        i++;
	}
	// bei einem Klick
	//$('#senden').click(senden);
   // document.getElementById("senden").onclick=senden();
function versuchsenden(){
        senden();
};
    
	// oder mit der Enter-Taste
    //document.keypress()
	//$('#name').keypress(function (e) 
                 //       {
		//if (e.which == 13) {
		//	senden();
		//}
	//});
    function myFunction(e){
        if (e.which == 13) {
			senden();
		}
    
    }
//});