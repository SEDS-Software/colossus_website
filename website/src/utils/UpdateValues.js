export default function updateData(app) {

    console.log("ran");

    let socket = new WebSocket("ws://192.168.1.100:8080");

    socket.onopen = function(event) {
    };


    // Handle messages sent by the server.
    socket.onmessage = function(event) {
	console.log("got a message");
        let jsonObject = JSON.parse(event.data);
        try{
            app.setState(JSON.parse(event.data));
        }catch(e){
            console.log(e);
        }
    };


    //errors out on the server without this
    window.addEventListener('beforeunload', function () {
        socket.close();
    });
}
