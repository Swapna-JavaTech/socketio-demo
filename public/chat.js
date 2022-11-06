//Make connection to server to create the web socket between the two
//the socket in frontend
//we have access to this becoz we have logged it in the index.html
var socket = io.connect('http://localhost:4000/')

//Query DOM
//.getElementById because we are getting them by input id in index.html (line 19 and 20)
/* these all are the variables messge,btn,output,feedback 
which are used to handle the values entered in index.html from line no. 18 to 22 */
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//emit events
//JS(Vanilla JS) for listening an event and here we are using click event

btn.addEventListener('click' ,function(){
    //emit a message/message to receive it on client
    //emit functin takes two parameters 1st is name of message called chat
    //2nd will be an object inside '{}' that we will send to server with 2 parameters
    socket.emit('chat',{
        message : message.value, //takes the value of the input field(message)
        handle : handle.value//takes the value of the input field(handle)
    });
    message.value = "";
});

//in the message fields add the keypress event listener
message.addEventListener('keypress',function(){
    socket.emit('typing',{
        /* inside the function we emit an event/message into server 
        and the message to be sent is typing */
        handle:handle.value
        /* we will also some data which is the name of the sender in the handle field 
        which will be displayed on other chat window */
    })
})

//Listen for events
socket.on('chat',function(data){ //fireback the callback function data on client side
/*     we are listening to the chat event after the click send and we'll send
    a feedback with an empty string    */ 
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle +' : </strong> '+ data.message+ ' </p>'
    //.innerHTML to assign the different html to that div tag
    // '+=' add this string to the html
    //function(data) will be used in data.handle and '+' to add in more message
});

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data.handle + ' is typing....</em></p>';
    //add on to the existing string here we use <em> to slant the fonts
});