//write express in require so we can use it in our project
//npm install express --save (save express to devDependencies in package.json file)
//npm install express (save express to dependencies in package.json file)
var express = require('express');
//the word express here is a var function

//npm install socket.io --save (save express to devDependencies in package.json file)
//npm install socket.io (save express to dependencies in package.json file)
var socket  =  require('socket.io');


//App Setup
var app = express(); //invoking the express function

//.listen to make it listen to specific port number
var server = app.listen(4000,() =>{ //call back function which will be called when app starts listening
    console.log('listening for requests on port 4000');
});

//Static files
app.use(express.static('public'));
//this will make the host access the public folder and the index.html page in it

//Socket setup and pass server
var io = socket(server);
//io is a variable here & socket is a function which is invoked here
//means we want socket.io to work from the server and will setup the server in the backend
//this will listen for an event called connection with a call back function
io.on('connection',function(socket){
    //socket will given junks of properties but socket.id will give only the id property
    console.log('made scoket connection',socket.id);
    //Handle Chat event
    socket.on('chat',function(data){
        /*after the input value of message and handle in chat.js
         the data is passed as parameter to function
        */
       /* we want to send the data to all the clients connected to websocket to see
        for what message it emitted 
       */
        console.log(data);
        //io.socket refers to all sockets connected to the server
        //.emit function call to emit a message to each socket connected to the server
        //.emit has parameters (type of data,send the data back)
        io.sockets.emit('chat',data) 
    });

    //handle typing event 
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
})


//run above code using nodemon index.js or node index.js


//configure a route to check if app is running or not
app.get('/',(req,res) =>{
    res.send("<h1>Hello...from index.js</h1>")
})


