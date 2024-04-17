update my chatinterface like above

<!DOCTYPE html>
<html>
<head>
    <title>Chat Application</title>
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div id="chat">
        <ul id="messages"></ul>
        <form id="form" action="">
            <input id="input" autocomplete="off" /><button>Send</button>
        </form>
    </div>

    <script>
        $(function () {
            var socket = io();
            $('form').submit(function(){
                socket.emit('chat message', $('#input').val());
                $('#input').val('');
                return false;
            });

            // Handle user joining
            var username = prompt("Please enter your name:");
            socket.emit('join', username);

            socket.on('chat message', function(msg){
                $('#messages').append($('<li>').text(msg.username + ": " + msg.message));
            });

            // Handle user joining
            socket.on('user joined', function(username){
                $('#messages').append($('<li>').text(username + " joined the chat"));
            });

            // Handle user leaving
            socket.on('user left', function(username){
                $('#messages').append($('<li>').text(username + " left the chat"));
            });
        });
    </script>
</body>
</html>
dont change any socket functionality and inetnal css and js