const path=require('path');
const https =require('https');
const http =require('http');
const express = require('express');
const socketio=require('socket.io');
const dotenv=require('dotenv');
const SocketIOFile = require('socket.io-file');
const formateMessage =require ('./utils/messages');
//const { userJoin , getCurrentUser ,userLeave,getRoomUsers } = require ('./utils/users');
const { userGroupJoin , getCurrentGroupUser ,userGroupLeave,getGroupRoomUsers } = require ('./utils/users');
//const { userJoin,getUsers } = require ('./utils/users');
const app = express();
dotenv.config({ path: "config/config.env" });
var fs = require("fs");
const options = {
    key: fs.readFileSync('client-key.pem'),
    cert: fs.readFileSync('client-cert.pem')
};

const server =http.createServer(app);
//const server =https.createServer(options,app);
const io = socketio(server);

var domain='https://vyzmo.com/';


const users = [];
const usersbysocket = [];
//Create body parser instance
var bodyParser = require("body-parser");
var SocketIOFileUpload = require('socketio-file-upload');
//enable url encoded
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
//Create instance of mysql
var mysql = require("mysql");
var db_config={
    'host':process.env.HOST,
    'user':process.env.USER,
    'password':process.env.PASSWORD,
    'database':process.env.DATABASE,
    /*'user':"develope_botafoga",
    'password':"develope_botafoga",
    'database':"develope_tbl_chat",*/
};
var connection =mysql.createConnection(db_config);


//connect
connection.connect(function (error){
    //show if any error
    if(error) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', error);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }
});
function handleDisconnect() {
    connection = mysql.createConnection(db_config);

}
//enable headers required for POST request
app.use(function(request,result,next){
    result.setHeader("Access-Control-Allow-Origin","*");
    next();
});

//Create api call to return all messages
app.post("/get_messages",function (request,result){
    //get all messages from database

    connection.query("SELECT  * FROM   users WHERE username='" +request.body.receiver+ "'" ,function(error,user){
        connection.query("SELECT  * FROM   messages WHERE (from_id ='" +users[request.body.sender].id+ "' and to_id = '" +user[0].id+ "') OR (from_id= '" +user[0].id+ "' and to_id='" +users[request.body.sender].id+ "') ORDER BY id ASC" ,function(error,messages){
            //json response
            var user_live=false;
            if(users[request.body.receiver]){
                user_live=true;
            }
            var list=[];
            if(messages){
                for(var a=0;a<messages.length;a++){
                    var message=messages[a];
                    message.status=(users[message.sender] ? 'online' : 'offline');
                    message.receiver_avatar=domain+user[0].avatar;
                    message.receiver_username=user[0].username;
                    message.sender_avatar=users[request.body.sender].avatar;
                    message.sender_username=users[request.body.sender].username;
                    message.last_seen=(user[0].last_seen && !user_live ? timeDifference(user[0].last_seen) : '');
                    list[a]=message;
                }
            }
            result.end(JSON.stringify(list));

        });
    });


});
//Create api call to return all Group messages
app.post("/get_group_messages",function (request,result){
    //get all messages from database

    connection.query("SELECT  * FROM   message_group WHERE name='" +request.body.groupid+ "'" ,function(error,group){
        connection.query("SELECT  messages.*,users.avatar,users.username FROM   messages,users WHERE messages.to_group_id='" +group[0].id+ "' and messages.from_id=users.id   ORDER BY id ASC" ,function(error,messages){
            //json response

            var list=[];
            if(messages){
                for(var a=0;a<messages.length;a++){
                    var message=messages[a];
                    message.status=(users[message.sender] ? 'online' : 'offline');
                    message.receiver_avatar='';
                    message.receiver_username='';
                    message.sender_avatar=domain+messages[a].avatar;
                    message.sender_username=messages[a].username;
                    message.last_seen='';
                    list[a]=message;
                }
            }
            result.end(JSON.stringify(list));

        });
    });


});
//Create api call to return all recent messages to specific user
app.post("/get_recent_messages",function (request,result){
    //get all messages from database
    connection.query("SELECT  messages.text,messages.from_id,messages.message_time as time,users.username,users.avatar as avatar FROM   messages,users  WHERE users.id=messages.from_id and messages.to_id ='" +users[request.body.username].id+ "' GROUP by messages.from_id  order BY messages.id desc " ,function(error,recentmessages){
        //json response
        var list=[];
        if(recentmessages){
            for(var a=0;a<recentmessages.length;a++){
                var message=recentmessages[a];
                message.avatar=domain+message.avatar;
                message.groupid=null;
                message.groupname=null;
                message.status=(users[message.username] ? 'online' : 'offline');
                list[a]=message;
            }
        }
        //connection.query("SELECT  messages.text,messages.from_id,messages.message_time as time,users.username,users.avatar as avatar FROM   messages,users,message_group  WHERE users.id=messages.from_id and messages.to_id ='" +users[request.body.username].id+ "' GROUP by messages.from_id  order BY messages.id desc " ,function(error,recentGroupmessages){

        connection.query("SELECT   messages.text,messages.message_time as time,message_group.name as groupname ,message_group.id as groupid,message_group.avatar as avatar ,messages.to_group_id,messages.id,users.username FROM   messages,users,message_group,message_group_join  WHERE   users.id ='" +users[request.body.username].id+ "' and  users.id = message_group_join.user_id and  message_group_join.groupid=message_group.id    and messages.to_group_id=message_group.id  and  messages.id IN ( SELECT MAX(id) FROM messages GROUP BY to_group_id ) " ,function(error,recentGroupmessages){
            if(recentGroupmessages){
                for(var k=0;k<recentGroupmessages.length;k++){
                    var message=recentGroupmessages[k];
                    message.avatar=domain+message.avatar;
                    message.status=(users[message.username] ? 'online' : 'offline');
                    message.groupid=message.groupid;
                    message.groupname=message.groupname;
                    list[a]=message;
                    a++;
                }
            }
            result.end(JSON.stringify(list));
        });

    });

});

//Get all user list
app.post("/get_user_list",function (request,result){
    //get all messages from database
    connection.query("SELECT  * FROM   users  where username !='" +request.body.username+ "'  and  username !='admin' "  ,function(error,userlist){
        //json response
        var list=[];
        if(userlist){
            for(var a=0;a<userlist.length;a++){
                var user=userlist[a];
                user.avatar=domain+user.avatar;
                user.groupid='';
                user.groupname='';
                //console.log(user);
                user.status=(users[user.username] ? 'online' : 'offline');
                list[a]=user;
            }
        }
        connection.query("SELECT   messages.text,messages.message_time as time,message_group.name as groupname ,message_group.id as groupid,message_group.avatar as avatar ,messages.to_group_id,messages.id,users.username FROM   messages,users,message_group,message_group_join  WHERE   users.id ='" +users[request.body.username].id+ "' and  users.id = message_group_join.user_id and  message_group_join.groupid=message_group.id    and messages.to_group_id=message_group.id  and  messages.id IN ( SELECT MAX(id) FROM messages GROUP BY to_group_id ) " ,function(error,Grouplist){
            if(Grouplist){
                for(var k=0;k<Grouplist.length;k++){
                    var user=Grouplist[k];
                    user.avatar=domain+user.avatar;
                    user.username=user.groupname;
                    //console.log(user);
                    user.status='offline';
                    list[a]=user;
                    a++;
                }
            }
            result.end(JSON.stringify(list));
        });
    });

});
//Create api call to return all recent messages to specific user
app.post("/delete_message",function (request,result){
    //get  message from database
    connection.query("SELECT  *   FROM   messages WHERE id ='" +request.body.id+ "' " ,function(error,message){

        connection.query("delete   FROM   messages WHERE id ='" +request.body.id+ "' " ,function(error,deleteduser){
            if(message[0].is_file){
                var filePath = 'public/'+message[0].file_path;
                fs.unlinkSync(filePath);
            }
            var list=[];
            result.end(JSON.stringify(list));
        });
    });

});
//upload voice clip to sever //
app.post("/upload-voice-clip",function (request,result){
    var base64Data = request.body.file.replace(/^data:audio\/webm;codecs=opus;base64,/, "");
    fs.writeFile("public/files/uploads/"+request.body.name, base64Data, 'base64', function(err) {
        result.end(JSON.stringify(request.body.name));
    });

});
//upload capture image to sever //
app.post("/upload-capture-image",function (request,result){
    var base64Data = request.body.file.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("public/files/uploads/"+request.body.name, base64Data, 'base64', function(err) {
        result.end(JSON.stringify(request.body.name));
    });

});
//Set static folder
app.use(express.static(path.join(__dirname,'public')));
const botName='Botalk Bot';


//Run when client connect
io.on('connection',socket => {
    socket.on('userConnected',(username) => {
        //console.log(`userConnected`+username);
        connection.query("SELECT  * FROM   users WHERE username='" +username+ "'" ,function(error,user){
            if(user){
                users[username]={
                    socketid:socket.id,
                    id:user[0].id,
                    username:user[0].username,
                    email:user[0].email,
                    avatar:domain+user[0].avatar,
                };
                usersbysocket[socket.id]={
                    socketid:socket.id,
                    id:user[0].id,
                    username:user[0].username,
                    email:user[0].email,
                    avatar:domain+user[0].avatar,
                };
                //io.emit('userConnected',users[username]);
                io.to(socket.id).emit('userConnected',users[username]);

            }
        });
        //users[username]=socket.id;

        // io.emit('userConnected',username);
        io.emit('online',username);
    });

    //Listen Delete Message
    socket.on('messageDeleted',function(data){
        if(data.groupid){
            io.to(data.groupid).emit('messageDeleted',data.id);
        }else{
            io.to(socket.id).emit('messageDeleted',data.id);
        }


    });

    //Listen for chatMessage
    socket.on('sendMessage',function(data){
        //var message = connection.escape(data.message);
        var message = data.message;
        var message = message.replace(/'/g, "\\'");
        if(users){

            var formatedMessage=formateMessage(data.sender,message);
            if(data.groupid){
                if(users[data.sender]){
                    connection.query("SELECT  * FROM   message_group WHERE name='" +data.groupid+ "'" ,function(error,group){
                        connection.query("INSERT INTO  messages (sender,receiver,text,from_id ,to_id,message_time,is_file,file_path,to_group_id ) values ('" +users[data.sender].username+ "', '" +group[0].name+ "', '" +message+ "','" +users[data.sender].id+ "', 0, '" +formatedMessage.time+ "', '" +data.is_file+ "', '" +data.file_path+ "', '" +group[0].id+ "')" ,function(error,result){
                            if (error) {
                                console.error('error connecting: ' + error.stack);
                                return;
                            }
                            formatedMessage.status='online';
                            formatedMessage.avatar=users[data.sender].avatar;
                            formatedMessage.username=users[data.sender].username;
                            formatedMessage.is_file=data.is_file;
                            formatedMessage.file_path=data.file_path;
                            formatedMessage.id=result.insertId;
                            formatedMessage.groupid=data.groupid;
                            io.to(data.groupid).emit('Groupmessage',formatedMessage);
                            //send data for group notigication
                            formatedMessage.groupname=group[0].name;
                            formatedMessage.avatar=domain+group[0].avatar;
                            socket.broadcast.emit('groupnotification',formatedMessage);
                            return;
                        });
                    });

                }

            }
            if(data.receiver) {
                connection.query("SELECT  * FROM   users WHERE username='" + data.receiver + "'", function (error, user) {
                    connection.query("INSERT INTO  messages (sender,receiver,text,from_id ,to_id,message_time,is_file,file_path ) values ('" + users[data.sender].username + "', '" + user[0].username + "', '" + message + "','" + users[data.sender].id + "', '" + user[0].id + "', '" + formatedMessage.time + "', '" + data.is_file + "', '" + data.file_path + "')", function (error, result) {
                        if (error) {
                            console.error('error connecting: ' + error.stack);
                            return;
                        }
                        if (users[data.receiver]) {
                            var socketId = users[data.receiver].socketid;
                            if (socketId) {
                                formatedMessage.status = 'online';
                                formatedMessage.avatar = users[data.sender].avatar;
                                formatedMessage.username = users[data.sender].username;
                                formatedMessage.is_file = data.is_file;
                                formatedMessage.file_path = data.file_path;
                                formatedMessage.id = result.insertId;
                            }
                            io.to(socketId).emit('message', formatedMessage);
                        }
                        // show message on to sender  while sending
                        if (users[data.sender]) {
                            formatedMessage.status = 'online';
                            formatedMessage.avatar = users[data.sender].avatar;
                            formatedMessage.username = users[data.sender].username;
                            formatedMessage.is_file = data.is_file;
                            formatedMessage.file_path = data.file_path;
                            formatedMessage.id = result.insertId;
                            io.to(users[data.sender].socketid).emit('showmemessage', formatedMessage);
                        }
                    });
                });
                //save in database

            }


        }

    });
    //Runs when client disconnect
    socket.on('disconnect',()=>{
        const user =userLeave(socket.id);
        if(user){
            userGroupLeave(user.id);
            delete users[user.username];
            delete usersbysocket[user.socketid];
            io.emit('offline',user.username);
        }

    });


    //start uploading file to server
    var uploader = new SocketIOFile(socket, {
        uploadDir: 'public/files/uploads',                          // simple directory
        //accepts: ['image/png', 'image/jpg','image/jpeg','image/gif','audio/mpeg', 'audio/mp3','video/mp4','video/mov','video/webm','video/mpeg','video/3gp','video/avi','video/flv','video/ogg','video/mk3d','video/mks','video/wmv','video/m4v','video/x-m4v'],      // chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
        maxFileSize: 25194304,                      // 25 MB. default is undefined(no limit)
        chunkSize: 10240,                           // default is 10240(1KB)
        transmissionDelay: 0,                       // delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
        overwrite: true                             // overwrite file if exists, default is true.
    });
    uploader.on('start', (fileInfo) => {
        // console.log('Start uploading');
        //console.log(fileInfo);
    });
    uploader.on('stream', (fileInfo) => {
        //console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
    });
    uploader.on('complete', (fileInfo) => {
        //console.log('Upload Complete.');
        //console.log(fileInfo);
    });
    uploader.on('error', (err) => {
        //console.log('Error!', err);
    });
    uploader.on('abort', (fileInfo) => {
        //console.log('Aborted: ', fileInfo);
    });

    /*from server side we will emit 'display' event once the user starts typing
     so that on the client side we can capture this event and display
     '<data.user> is typing...' */
    socket.on('typing', (data)=>{
        if(data.groupid){
            io.to(data.groupid).emit('displaygroup', data);
        }else{
            if(users[data.receiver]){
                var socketId=users[data.receiver].socketid;
                if(socketId){
                    io.to(socketId).emit('display', data);
                }
            }
        }


    });

    //Start Group Chat Working//
    socket.on('joinRoom',({username ,room}) => {
        const user = userGroupJoin(socket.id,username ,room);
        socket.join(user.room);
        //console.log('New Ws Connection..');
        //Welcome current user
        // socket.emit('groupmessage',formateMessage(botName,'Welcome to Botalk'));
        //Broadcast when a user connects
        var formatedMessage=formateMessage(botName,`${ user.username } has joined the chat`);

        formatedMessage.status='online';
        formatedMessage.avatar=users[username].avatar;
        formatedMessage.username=users[username].username;
        formatedMessage.groupid=room;
        socket.broadcast.to(user.room).emit('groupmessage',formatedMessage);
        //Send users and room info
        io.to(user.room).emit('roomUsers',{
            room : user.room,
            users : getGroupRoomUsers(user.room)
        });
    });

});
//user leaves chat
function  userLeave(id){
    const user=usersbysocket[id];
    if(user){
        connection.query("update users set last_seen='" +new Date()+ "' where id='" +user.id+ "' " ,function(error,result){
        });
    }

    return user;

}
///Convert Last seen
function timeDifference(previous) {
    var current=new Date();
    var previous=new Date(previous);
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return 'last seen : ' + Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return 'last seen : ' + Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
        return 'last seen : ' + Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'last seen : ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'last seen : ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return 'last seen : ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}


const PORT = 3000 || process.env.PORT;
server.listen(PORT ,()=> console.log(`server running on port ${PORT}`));

