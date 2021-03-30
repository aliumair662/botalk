const path=require('path');
const http =require('http');
const express = require('express');
const socketio=require('socket.io');
const formateMessage =require ('./utils/messages');
//const { userJoin , getCurrentUser ,userLeave,getRoomUsers } = require ('./utils/users');
//const { userJoin,getUsers } = require ('./utils/users');
const app = express();
const server =http.createServer(app);
const io = socketio(server);

//Create body parser instance
var bodyParser = require("body-parser");
//enable url encoded
app.use(bodyParser.urlencoded());
//Create instance of mysql
var mysql = require("mysql");
var connection =mysql.createConnection({
    'host':"localhost",
    'user':"root",
    'password':"",
    'database':"tbl_chat",

});
//connect
connection.connect(function (error){
    //show if any error
});

//enable headers required for POST request
app.use(function(request,result,next){
    result.setHeader("Access-Control-Allow-Origin","*");
    next();
});

//Create api call to return all messages
app.post("/get_messages",function (request,result){
       //get all messages from database
    connection.query("SELECT  * FROM   messages WHERE (from_id ='" +users[request.body.sender].id+ "' and to_id = '" +users[request.body.receiver].id+ "') OR (from_id= '" +users[request.body.receiver].id+ "' and to_id='" +users[request.body.sender].id+ "')" ,function(error,messages){
        //json response
        result.end(JSON.stringify(messages));
    });

});

//Create api call to return all recent messages to specific user
app.post("/get_recent_messages",function (request,result){
    //get all messages from database
    connection.query("SELECT  messages.text,messages.from_id,message_time as time,users.username FROM   messages,users  WHERE users.id=messages.from_id and messages.to_id ='" +users[request.body.username].id+ "' GROUP by messages.from_id  order BY messages.id desc " ,function(error,recentmessages){
        //json response
        result.end(JSON.stringify(recentmessages));
    });

});

//Get all user list
app.post("/get_user_list",function (request,result){
    //get all messages from database
    connection.query("SELECT  * FROM   users  where username !='" +request.body.username+ "' " ,function(error,userlist){
        //json response
        result.end(JSON.stringify(userlist));
    });

});


//Set static folder
app.use(express.static(path.join(__dirname,'public')));
const botName='Botalk Bot';
const users = [];
//Run when client connect
io.on('connection',socket => {
    socket.on('userConnected',(username) => {
        console.log(`userConnected`)
        connection.query("SELECT  * FROM   users WHERE username='" +username+ "'" ,function(error,user){
            users[username]={
                socketid:socket.id,
                id:user[0].id,
                username:user[0].username,
                email:user[0].email,
                avatar:user[0].avatar,
            };
            //io.emit('userConnected',users[username]);
            io.to(socket.id).emit('userConnected',users[username]);
        });
        //users[username]=socket.id;

       // io.emit('userConnected',username);
        io.emit('setOnline',username);
    });
    //Listen for chatMessage
    socket.on('sendMessage',function(data){
        if(users){
            var socketId=users[data.receiver].socketid;
            var formatedMessage=formateMessage(data.sender,data.message);
            io.to(socketId).emit('message',formatedMessage);
            //save in database
            connection.query("INSERT INTO  messages (sender,receiver,text,from_id ,to_id,message_time ) values ('" +users[data.sender].username+ "', '" +users[data.receiver].username+ "', '" +data.message+ "','" +users[data.sender].id+ "', '" +users[data.receiver].id+ "', '" +formatedMessage.time+ "')" ,function(error,result){
                //console.log(error);
            });
        }

    });
    //Runs when client disconnect
    socket.on('disconnect',()=>{
        /*const user =userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message',formateMessage(botName,`${user.username} has left the chat`));
            //Send users and room info
            io.to(user.room).emit('roomUsers',{
                room : user.room,
                users : getRoomUsers(user.room)
            });

        }*/
       // io.emit('setOnline',username);

    });
});
const PORT = 3000 || process.env.PORT;
server.listen(PORT ,()=> console.log(`server running on port ${PORT}`));
