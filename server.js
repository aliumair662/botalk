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
var formidable = require('formidable');
const options = {
    key: fs.readFileSync('client-key.pem'),
    cert: fs.readFileSync('client-cert.pem')
};
/*const admin = require('firebase-admin')*/

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
/*const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId:process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};
var firebase = require('firebase');
var firebaseapp=firebase.initializeApp(firebaseConfig);*/
const server =http.createServer(app);
// const server =https.createServer(options,app);
const io = socketio(server);

var domain='https://vyzmo.com/';
var temp_url=process.env.HOST_URL;
const users = [];
const usersbysocket = [];
//Create body parser instance
var bodyParser = require("body-parser");
var SocketIOFileUpload = require('socketio-file-upload');
//enable url encoded
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.static(__dirname + 'public'));
//Create instance of mysql
var mysql = require("mysql");
var db_config={
     'host':process.env.HOST,
     'user':process.env.USER,
     'password':process.env.PASSWORD,
     'database':process.env.DATABASE,
    // 'host':'vyzmo.com',
    // 'user':"mybotalkuser",
    // 'password':"develope_botafoga",
    // 'database':"develope_tbl_chat",
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
app.post("/get_messages", function (request,result){
    //get all messages from database
        console.log("get_messages");
        console.log(request.body);

    if(users[request.body.sender]){
        var page_number=request.body.page_number;
        if(request.body.page_number >0){

        }else{
            request.body.page_number=1;
        }
        var offset = (request.body.page_number-1) * request.body.limit;
        if(request.body.receiver){
            connection.query("SELECT  * FROM   users WHERE username='" +request.body.receiver+ "'" ,function(error,receiver){
                connection.query("SELECT  * FROM   chatmessages WHERE (from_id ='" +users[request.body.sender].id+ "' and to_id = '" +receiver[0].id+ "') OR (from_id= '" +receiver[0].id+ "' and to_id='" +users[request.body.sender].id+ "')     " ,function(error,totalmessages){
                    var total_records=totalmessages.length;
                    var subtractar='';
                    var order='ASC';
                    if(request.body.first_id >0){
                        subtractar+="and id < "+request.body.first_id+"";
                        order='DESC';
                    }
                    //if(request.body.last_id >0){
                    // subtractar+="and id > "+request.body.last_id+"";
                    //}
                    var offset = total_records - (request.body.limit * request.body.page_number);
                    //console.log("SELECT  * FROM   chatmessages WHERE ((from_id ='" +users[request.body.sender].id+ "' and to_id = '" +receiver[0].id+ "') OR (from_id= '" +receiver[0].id+ "' and to_id='" +users[request.body.sender].id+ "')) "+subtractar+"   ORDER BY `id` desc  LIMIT   "+request.body.limit+" ");
                    console.log("SELECT * FROM (SELECT * FROM chatmessages WHERE ((from_id ='" +users[request.body.sender].id+ "' and to_id = '" +receiver[0].id+ "') OR (from_id= '" +receiver[0].id+ "' and to_id='" +users[request.body.sender].id+ "')) "+subtractar+"  ORDER BY id DESC LIMIT "+request.body.limit+")Var1 ORDER BY id "+order+" ");
                    /*connection.query("SELECT  * FROM   chatmessages WHERE ((from_id ='" +users[request.body.sender].id+ "' and to_id = '" +receiver[0].id+ "') OR (from_id= '" +receiver[0].id+ "' and to_id='" +users[request.body.sender].id+ "')) "+subtractar+" ORDER BY `id` desc  LIMIT   "+request.body.limit+" " ,function(error,messages){*/
                    connection.query("SELECT * FROM (SELECT * FROM chatmessages WHERE ((from_id ='" +users[request.body.sender].id+ "' and to_id = '" +receiver[0].id+ "') OR (from_id= '" +receiver[0].id+ "' and to_id='" +users[request.body.sender].id+ "')) "+subtractar+"  ORDER BY id DESC LIMIT "+request.body.limit+")Var1 ORDER BY id "+order+" " ,function(error,messages){
                        //json response
                        var user_live=false;
                        if(users[request.body.receiver]){
                            user_live=true;
                        }
                        var list=[];
                        var total_pages=0;
                        var currentPageRecords=0;
                        var has_more_pages=false;
                        if(total_records >0){
                            total_pages=Math.ceil(total_records /  request.body.limit);
                            var currentPageRecords=Math.round(request.body.limit *  request.body.page_number);
                            if(total_records > currentPageRecords){
                                has_more_pages=true;
                            }

                        }
                        if(messages){
                            for(var a=0;a<messages.length;a++){
                                var message=messages[a];
                                message.status=(users[request.body.receiver] ? 'online' : 'offline');
                                message.avatar=domain+receiver[0].avatar;
                                message.username=receiver[0].username;
                                message.last_seen=(receiver[0].last_seen && !user_live ? timeDifference(receiver[0].last_seen) : '');
                                message.receiver_avatar=domain+receiver[0].avatar;
                                message.receiver_username=receiver[0].username;
                                message.sender_avatar=users[request.body.sender].avatar;
                                message.sender_username=users[request.body.sender].username;
                                list[a]=message;
                            }
                        }
                        var data={
                            'status':200,
                            'data':list,
                            'per_page':request.body.limit,
                            'total_pages':total_pages,
                            'current_page':request.body.page_number,
                            'has_more_pages':has_more_pages,


                        };
                        result.end(JSON.stringify(data));

                    });
                });
            });
        }
        //Get Group message list
        else if(request.body.groupid!='' && request.body.groupid> 0 ){
                connection.query("SELECT  * FROM   chatmessages WHERE to_group_id ='" +request.body.groupid+ "' " ,function(error,totalmessages){
                    var total_records=totalmessages.length;
                    var subtractar='';
                    var order='ASC';
                    if(request.body.first_id >0){
                        subtractar+="and id < "+request.body.first_id+"";
                        order='DESC';
                    }
                    //if(request.body.last_id >0){
                    // subtractar+="and id > "+request.body.last_id+"";
                    //}
                    var offset = total_records - (request.body.limit * request.body.page_number);
                    connection.query("SELECT * FROM (SELECT * FROM chatmessages WHERE to_group_id='" +request.body.groupid+ "'   "+subtractar+"  ORDER BY id DESC LIMIT "+request.body.limit+")Var1 ORDER BY id "+order+" " ,async function(error,messages){
                        //json response
                        var list=[];
                        var total_pages=0;
                        var currentPageRecords=0;
                        var has_more_pages=false;
                        if(total_records >0){
                            total_pages=Math.ceil(total_records /  request.body.limit);
                            var currentPageRecords=Math.round(request.body.limit *  request.body.page_number);
                            if(total_records > currentPageRecords){
                                has_more_pages=true;
                            }

                        }
                        if(messages){
                            for(var a=0;a<messages.length;a++){
                                var message=messages[a];
                                var query="SELECT id,avatar,username from users where id  ='" +message.from_id + "' limit 0,1     ";
                                const user = await SelectAllElements(query);
                                message.status='online';
                                message.avatar='';
                                message.username=request.body.groupname;
                                message.last_seen= '';
                                message.receiver_avatar='';
                                message.receiver_username='';
                                message.sender_avatar=domain+user[0].avatar;
                                message.sender_username=user[0].avatar.username;
                                list[a]=message;
                            }
                        }
                        var data={
                            'status':200,
                            'data':list,
                            'per_page':request.body.limit,
                            'total_pages':total_pages,
                            'current_page':request.body.page_number,
                            'has_more_pages':has_more_pages,


                        };
                        result.end(JSON.stringify(data));

                    });
                });

        }else{
            var data={
                'status':200,
                'data':{},
                'per_page':request.body.limit,
                'total_pages':0,
                'current_page':request.body.page_number,
                'has_more_pages':false,


            };
            result.end(JSON.stringify(data));
        }
        //End of get group message list

    }else{
        var data={
          'status':400,
          'message':'socket id not exits',

        };
        result.end(JSON.stringify(data));
    }



});
//Create api call to return all Group messages
app.post("/get_group_messages",function (request,result){
    //get all messages from database

    connection.query("SELECT  * FROM   message_group WHERE name='" +request.body.groupid+ "'" ,function(error,group){
        connection.query("SELECT  chatmessages.*,users.avatar,users.username FROM   chatmessages,users WHERE chatmessages.to_group_id='" +group[0].id+ "' and chatmessages.from_id=users.id   ORDER BY id ASC" ,function(error,messages){
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
SelectAllElements = (query) =>{
    return new Promise((resolve, reject)=>{
        connection.query(query,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};
//Create api call to return all recent messages to specific user
app.post("/get_recent_messages",async function (request,result){
   /* if(users[request.body.username]){*/
    var list=[];
    try {
        var query="SELECT id,avatar,username from users where id IN(SELECT distinct from_id FROM chatmessages WHERE to_id ='" +request.body.userid+ "' union SELECT distinct to_id FROM chatmessages WHERE from_id ='" +request.body.userid+ "' )     ";
        const recentmessages = await SelectAllElements(query);
        if(recentmessages){
            var allusersdata=[];
            for(var a=0;a<recentmessages.length;a++){
                if(recentmessages[a]){
                    var message=recentmessages[a];
                    message.status='offline';
                    message.userid=message.id;
                    message.avatar=domain+message.avatar;
                    message.status=(users[message.username] ? 'online' : 'offline');
                    message.groupid=null;
                    message.groupname=null;
                    message.last_message={};
                    message.chat_name=message.username;
                    try{
                        var query="SELECT  * FROM   chatmessages WHERE  (chatmessages.to_id ='" +message.id+ "' or  chatmessages.from_id ='" +message.id+ "')  order BY chatmessages.id desc limit 0,1 ";
                        const lastmessages = await SelectAllElements(query);
                        if(lastmessages){
                            var messages = lastmessages[0];
                            if(messages.is_file==1){
                                messages.text=messages.file_type;
                            }
                            message.last_message=messages;
                        }
                    }catch (e) {
                        console.log("something wrong",e);
                    }
                    list[a]=message;
                }

            }
        }
        //Group messages
        try{
            //var query="SELECT   chatmessages.text,chatmessages.message_time as time,message_group.name as groupname ,message_group.id as groupid,message_group.avatar as avatar ,chatmessages.to_group_id,chatmessages.id,users.username FROM   chatmessages,users,message_group,message_group_join  WHERE   users.id ='" +request.body.userid+ "' and  users.id = message_group_join.user_id and  message_group_join.groupid=message_group.id    and chatmessages.to_group_id=message_group.id  and  chatmessages.id IN ( SELECT MAX(id) FROM chatmessages GROUP BY to_group_id ) ";
            //var query="SELECT message_group.name, message_group.avatar,message_group.id FROM message_group LEFT JOIN chatmessages ON message_group.id = chatmessages.to_group_id and (chatmessages.to_id ='" +request.body.userid+ "' or  chatmessages.from_id ='" +request.body.userid+ "') GROUP by id ";
            var query="SELECT message_group.name, message_group.avatar,message_group.id FROM message_group , message_group_join where (message_group.id = message_group_join.groupid and message_group_join.user_id='" +request.body.userid+ "') or (message_group.is_community_group=1)   GROUP by id";
            const recentGroupmessages = await SelectAllElements(query);
            if(recentGroupmessages){
                for(var k=0;k<recentGroupmessages.length;k++){
                    var message={};
                    message.groupid=recentGroupmessages[k].id;
                    message.groupname=recentGroupmessages[k].name;
                    message.chat_name=recentGroupmessages[k].name;
                    message.status='offline';
                    message.userid=0;
                    message.avatar=recentGroupmessages[k].avatar;
                    message.last_message={};
                    var query="SELECT * FROM `chatmessages` WHERE `to_group_id`='"+recentGroupmessages[k].id+"' order by id DESC limit 1";
                    const lastmessage = await SelectAllElements(query);
                    if(lastmessage[0]){
                        if(lastmessage[0].is_file==1){
                            lastmessage[0].text=lastmessage[0].file_type;
                        }
                        message.last_message=lastmessage[0];
                        if(lastmessage){
                            list[a]=message;
                        }
                    }

                    a++;
                }
            }
        }catch (e) {
            console.log("something wrong",e);
        }
        console.log("list");
        console.log(list);
        var data={
            'status':200,
            'data':list,

        };
        console.log("list");
        console.log(list);

        result.end(JSON.stringify(data));
        //res.status(200).json({elements: resultElements}); // send a json response
    } catch(e) {
        console.log(e); // console log the error so we can see it in the console
        //res.sendStatus(500);
    }


   /* }else{
        var data={
            'status':400,
            'message':'socket id not exits',

        };
        result.end(JSON.stringify(data));
    }*/


});

queryPromise1 = (query) =>{
    return new Promise((resolve, reject)=>{
        pool.query(query,  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};
//Get all user list
app.post("/get_user_list",async function (request,result){
    //get all messages from database
    console.log("grouplist");
    console.log(request.body.grouplist);
    var search='';
    var groupsearch='';

    if(request.body.keyword!=''){
        search=" and username LIKE '"+request.body.keyword+"%' ";
        groupsearch=" and message_group.name LIKE '"+request.body.keyword+"%'  ";
    }
    if(users[request.body.username]){
        connection.query("SELECT  * FROM   users  where username !='" +request.body.username+ "'  and  username !='admin' " +search+ " order by id asc limit "+request.body.limit+" "  ,async function(error,userlist){
            //json response
            var list=[];
            if(userlist){
                for(var a=0;a<userlist.length;a++){
                    var user=userlist[a];
                    user.avatar=domain+user.avatar;
                    user.groupid='';
                    user.groupname='';
                    user.chat_name=user.username;
                    //console.log(user);
                    user.status=(users[user.username] ? 'online' : 'offline');
                    list[a]=user;
                }
            }



            /*connection.query("SELECT   chatmessages.text,chatmessages.message_time as time,message_group.name as groupname ,message_group.id as groupid,message_group.avatar as avatar ,chatmessages.to_group_id,chatmessages.id,users.username FROM   chatmessages,users,message_group,message_group_join  WHERE   users.id ='" +users[request.body.username].id+ "' and  users.id = message_group_join.user_id and  message_group_join.groupid=message_group.id    and chatmessages.to_group_id=message_group.id  and  chatmessages.id IN ( SELECT MAX(id) FROM chatmessages GROUP BY to_group_id ) " ,function(error,Grouplist){
                if(Grouplist && request.body.grouplist == true){
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
                if (list.length === 0) {
                    var data={
                        'status':400,
                        'message':'no data found',
                    };
                    result.end(JSON.stringify(data));
                }else{
                    var data={
                        'status':200,
                        'data':list,
                    };
                    result.end(JSON.stringify(data));
                }

            });*/
            var limit=request.body.limit - list.length;
            if(request.body.grouplist == 1){
            var query="SELECT message_group.name, message_group.avatar,message_group.id FROM message_group , message_group_join WHERE  (message_group.id = message_group_join.groupid and message_group_join.user_id='" +users[request.body.username].id+ "' ) or (message_group.is_community_group=1)      GROUP by id limit " +limit+ " ";
           if(groupsearch!=''){
               var query="SELECT message_group.name, message_group.avatar,message_group.id FROM message_group , message_group_join WHERE  (message_group.id = message_group_join.groupid and message_group_join.user_id='" +users[request.body.username].id+ "' "+groupsearch+" ) or (message_group.is_community_group=1)    GROUP by id limit " +limit+ " ";
           }
            console.log(query);

            const recentGroupmessages = await SelectAllElements(query);
               /* var query="SELECT name, avatar,id FROM message_group where  is_community_group=1   GROUP by id limit 1 ";
                const communityGroup = await SelectAllElements(query);
                console.log("community");
                console.log(communityGroup);

                recentGroupmessages.push(communityGroup[0]);*/
                if(recentGroupmessages){
                for(var k=0;k<recentGroupmessages.length;k++){
                    if(recentGroupmessages[k].name){
                        var user={};
                        user.username='';
                        user.groupid=recentGroupmessages[k].id;
                        user.groupname=recentGroupmessages[k].name;
                        user.chat_name=recentGroupmessages[k].name;
                        user.status='offline';
                        user.userid=0;
                        user.avatar=recentGroupmessages[k].avatar;
                        var query="SELECT * FROM `chatmessages` WHERE `to_group_id`='"+recentGroupmessages[k].id+"' order by id DESC limit 1";
                        const lastmessage = await SelectAllElements(query);
                        if(lastmessage[0]){
                            if(lastmessage[0].is_file==1){
                                lastmessage[0].text=lastmessage[0].file_type;
                            }
                            user.last_message=lastmessage[0];
                        }
                        console.log("list")
                        console.log(user)
                        list.push(user);
                    }




                }
             }
            }
            if (list.length === 0) {
                var data={
                    'status':400,
                    'message':'no data found',
                };
                result.end(JSON.stringify(data));
            }else{
                var data={
                    'status':200,
                    'data':list,
                };
                result.end(JSON.stringify(data));
            }

        });
    }else{
        var data={
            'status':401,
            'message':"reload the page",
        };
    }






});
//Create api call to return all recent messages to specific user
app.post("/delete_message",function (request,result){
    //get  message from database

    connection.query("SELECT  *   FROM   chatmessages WHERE id ='" +request.body.id+ "' " ,function(error,message){

        connection.query("delete   FROM   chatmessages WHERE id ='" +request.body.id+ "' " ,function(error,deleteduser){
            if(message[0].is_file && str.indexOf("uploads/") >= 0){
                var filePath = 'public/'+message[0].file_path;
                fs.unlinkSync(filePath);
            }
            var list=[];
            result.end(JSON.stringify(list));
        });
    });

});
//Update Firebase token api call to return all recent messages to specific user
app.post("/updatefirebasetoken",async function (request,result){

    const  query="update users set " +request.body.registrationTokenType+ "= '" +request.body.token+ "' where username ='" +request.body.username+ "'  ";
    const updatetoken = await SelectAllElements(query);
    if(updatetoken){
        var data={
            'status':200,
            'message':'Token updated',
        };
        result.end(JSON.stringify(data));
    }else{
        var data={
            'status':400,
            'message':'Token Not updated',
        };
        result.end(JSON.stringify(data));
    }


});
//Update Firebase token api call to return all recent messages to specific user
app.post("/create_new_group",async function (request,result){
    const  query="select * from  message_group where name= '" +request.body.groupname+ "'";
    const groupdata=await SelectAllElements(query);
    console.log("groupdata");
    console.log(groupdata);
    const  queryuser="select * from  users where username= '" +request.body.groupname+ "'";
    const groupdatauser=await SelectAllElements(queryuser);
    console.log("groupdatauser");
    console.log(groupdatauser);
    if(groupdatauser.length >0 || groupdatauser.length >0){
        request.body.groupname=request.body.groupname+'_';
    }
    var groupavatar=request.body.file_path;
        await connection.query("INSERT INTO  message_group (name,user_id,avatar ) values ('" +request.body.groupname+ "','" +request.body.user_id+ "', '"+groupavatar+"')", function(err, resultq, fields) {
            if (err) throw err;
            if(resultq.insertId){
                var Group_Users=request.body.Group_Users;
                for(var a=0;a<Group_Users.length;a++){
                    const  query="INSERT INTO  message_group_join (groupid,user_id) values ('" +resultq.insertId+ "','" +Group_Users[a]+ "')";
                    SelectAllElements(query);
                }
                var data={
                    'status':200,
                    'message':'Group Created Successfully',
                    'data':{
                        'id':resultq.insertId,
                        'groupname':request.body.groupname,
                        'groupid':resultq.insertId,
                        'avatar':groupavatar
                    }
                };
                result.end(JSON.stringify(data));
            }else{
                var data={
                    'status':404,
                    'message':'Something went wrong please try again',
                    'data':{

                    }
                };
                result.end(JSON.stringify(data));
            }

        });



});




//upload voice clip to sever //
app.post("/upload-voice-clip",function (request,result){
    console.log(request.body.file);

    var base64Data = request.body.file.replace("data:", "")
        .replace(/^.+,/, "");
    console.log(base64Data);

   // var base64Data = request.body.file.replace(/^data:audio\/webm;codecs=opus;base64,/, "");
    fs.writeFile("public/files/uploads/"+request.body.name, base64Data, 'base64', function(err) {
        var response={
            'file_path': temp_url+'/files/uploads/'+request.body.name,
        };
        result.end(JSON.stringify(response));
    });

});
//upload capture image to sever //
app.post("/upload-capture-image",function (request,result){
    var base64Data = request.body.file.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("public/files/uploads/"+request.body.name, base64Data, 'base64', function(err) {
        var response={
            'file_path': temp_url+'/files/uploads/'+request.body.name,
        };
        result.end(JSON.stringify(response));
    });

});
//Set static folder



//Start Mobile Api here

//uplaod video api for mobile

app.post("/upload-media",function (request,result){
    var upload_path = "public/files/uploads/";
    var form = new formidable.IncomingForm();
    form.parse(request,function (err, fields, files) {
        // oldpath : temporary folder to which file is saved to
        var oldpath = files.uploadfile.path;
        var newpath = upload_path + fields.name;
        // copy the file to a new location
        fs.copyFile(oldpath, newpath, function (err) {
            if (err) throw err;
            // you may respond with another html page
            var response={
                'file_path': temp_url+'/files/uploads/'+fields.name,
            };
            result.end(JSON.stringify(response));
        });
    });

});

//Get all user list


app.use(express.static(path.join(__dirname,'public')));
const botName='Botalk Bot';


//Run when client connect
io.on('connection',socket => {
    socket.on('userConnected',(sessionid) => {
        console.log(`sessionid`+sessionid);
        connection.query("SELECT  users.*,sessions.user_id  FROM   users,sessions WHERE sessions.session_id='" +sessionid+ "' and users.id=sessions.user_id" ,function(error,user){
            console.log(user);

            if(user){
                users[user[0].username]={
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
                io.to(socket.id).emit('userConnected',users[user[0].username]);
                io.emit('online',user[0].username);

            }
        });
        //users[username]=socket.id;

        // io.emit('userConnected',username);

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
        console.log("send message");
        console.log(data);

        //var message = connection.escape(data.message);
        var message = data.message;
        var message = message.replace(/'/g, "\\'");
        if(users){
            var formatedMessage=formateMessage(data.sender,message);
            if(data.groupid){
                if(users[data.sender]){
                    connection.query("SELECT  * FROM   message_group WHERE id='" +data.groupid+ "'" ,async function(error,group){
                        var query="INSERT INTO  chatmessages (sender,receiver,text,from_id ,to_id,message_time,is_file,file_path,to_group_id,file_type ) values ('" +users[data.sender].username+ "', '" +group[0].name+ "', '" +message+ "','" +users[data.sender].id+ "', 0, '" +formatedMessage.time+ "', '" +data.is_file+ "', '" +data.file_path+ "', '" +group[0].id+ "', '" +data.file_type+ "')";
                        if(data.editmessageid > 0){
                            var query="update  chatmessages set sender='" +users[data.sender].username+ "',receiver='" +group[0].name+ "',text='" +message+ "',from_id='" +users[data.sender].id+ "' ,to_id=0,message_time='" +formatedMessage.time+ "',is_file='" +data.is_file+ "',file_path='" +data.file_path+ "',to_group_id='" +group[0].id+ "',file_type='" +data.file_type+ "' where id='" +data.editmessageid+ "' ";
                        }

                        await connection.query(query ,async function(error,result){
                            if (error) {
                                console.error('error connecting: ' + error.stack);
                                return;
                            }
                            if (result) {
                                var query = "SELECT  * FROM   chatmessages WHERE  id ='" + result.insertId + "'";
                                if (data.editmessageid > 0) {
                                    var query = "SELECT  * FROM   chatmessages WHERE  id ='" + data.editmessageid + "' ";
                                }
                                await connection.query(query ,function(error,thismessages){
                                    if(thismessages){
                                        var message=thismessages[0];
                                        message.status='online';
                                        message.receiver_avatar=group[0].avatar;
                                        message.receiver_username=group[0].name;
                                        message.sender_avatar=users[message.sender].avatar;
                                        message.sender_username=users[message.sender].username;
                                        message.time=message.message_time;
                                        message.last_seen='';
                                        message.avatar=users[message.sender].avatar;
                                        message.username=users[message.sender].username;
                                        message.groupid=message.to_group_id;
                                        io.to(data.groupid).emit('Groupmessage',message);
                                    }

                                });

                            }
                           /* formatedMessage.status='online';
                            formatedMessage.avatar=users[data.sender].avatar;
                            formatedMessage.username=users[data.sender].username;
                            formatedMessage.is_file=data.is_file;
                            formatedMessage.file_path=data.file_path;
                            formatedMessage.id=result.insertId;
                            formatedMessage.groupid=data.groupid;*/
                            //io.to(data.groupid).emit('Groupmessage',formatedMessage);
                            //send data for group notigication
                            /*formatedMessage.groupname=group[0].name;
                            formatedMessage.avatar=domain+group[0].avatar;
                            socket.broadcast.emit('groupnotification',formatedMessage);*/
                            return;
                        });
                    });

                }


            }
            if(data.receiver) {
                console.log("data recived");
                console.log(users);
                 connection.query("SELECT  * FROM   users WHERE username='" + data.receiver + "'", async function (error, user) {
                    var query="INSERT INTO  chatmessages (sender,receiver,text,from_id ,to_id,message_time,is_file,file_path,file_type ) values ('" + users[data.sender].username + "', '" + user[0].username + "', '" + message + "','" + users[data.sender].id + "', '" + user[0].id + "', '" + formatedMessage.time + "', '" + data.is_file + "', '" + data.file_path + "', '" + data.file_type + "')";
                   console.log(query);
                    if(data.editmessageid > 0){
                        var query="update  chatmessages set sender='" +users[data.sender].username+ "',receiver='" +user[0].username+ "',text='" +message+ "',from_id='" +users[data.sender].id+ "' ,to_id='" + user[0].id + "',message_time='" +formatedMessage.time+ "',is_file='" +data.is_file+ "',file_path='" +data.file_path+ "',file_type='" +data.file_type+ "' where id='" +data.editmessageid+ "' ";
                    }

                     await connection.query(query, async function (error, result) {
                        if (error) {
                            console.error('error connecting: ' + error.stack);
                            return;
                        }
                        if (result) {
                            var query="SELECT  * FROM   chatmessages WHERE  id ='" +result.insertId+ "'";
                            if(data.editmessageid > 0){
                                var query="SELECT  * FROM   chatmessages WHERE  id ='" +data.editmessageid+ "' ";
                            }
                            await connection.query(query ,function(error,thismessages){
                                if(thismessages){
                                    var user_live=false;

                                    var message=thismessages[0];
                                    if(users[message.receiver]){
                                        user_live=true;
                                    }
                                    message.status=(users[message.receiver] ? 'online' : 'offline');
                                    message.receiver_avatar=domain+user[0].avatar;
                                    message.receiver_username=user[0].username;
                                    message.sender_avatar=users[message.sender].avatar;
                                    message.sender_username=users[message.sender].username;
                                    message.time=message.message_time;
                                    message.last_seen=(user[0].last_seen && !user_live ? timeDifference(user[0].last_seen) : '');
                                    if (users[data.receiver]) {
                                        var socketId = users[data.receiver].socketid;
                                        if (socketId) {
                                            message.status = 'online';
                                            message.avatar = users[data.sender].avatar;
                                            message.username = users[data.sender].username;
                                            /*message.is_file = data.is_file;
                                            message.file_path = data.file_path;
                                            message.id = result.insertId;*/
                                        }
                                        io.to(socketId).emit('message_'+users[data.receiver].id, message);
                                        io.to(socketId).emit('message', message);
                                    }
                                    // show message on to sender  while sending
                                    if (users[data.sender]) {
                                        message.status = 'online';
                                        message.avatar = users[data.sender].avatar;
                                        message.username = users[data.sender].username;
                                       /* message.is_file = data.is_file;
                                        message.file_path = data.file_path;
                                        message.id = result.insertId;*/
                                        io.to(users[data.sender].socketid).emit('showmemessage', message);
                                    }
                                }

                            });

                            /*const message = {
                                data: {
                                    title: 'New Message',
                                    message: message
                                },
                                token: registrationToken
                            };*/
                            var alldevice=[];
                            if(user[0].registrationTokenWeb){
                                alldevice.push(user[0].registrationTokenWeb)
                            }
                            if(user[0].registrationTokenAndroid){
                                alldevice.push(user[0].registrationTokenAndroid)
                            }
                            if(user[0].registrationTokenIos){
                                alldevice.push(user[0].registrationTokenIos)
                            }
                            var i;
                            for (i = 0; i < alldevice.length; ++i) {
                                const message = {
                                    notification: {
                                        title: data.sender,
                                        body:(data.is_file === 1) ? 'File' :data.message
                                    },
                                    token: alldevice[i]
                                };
                                admin.messaging().send(message)
                                    .then((response) => {
                                        // Response is a message ID string.
                                        console.log('Successfully sent message:', response);
                                    })
                                    .catch((error) => {
                                        console.log('Error sending message:', error);
                                    });
                            }


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
            connection.query("SELECT  last_seen FROM   users WHERE  id ='" +user.id+ "'" ,function(error,lastseen){
                var offlinedata={
                  'username':user.username,
                  'last_seen':timeDifference(lastseen[0].last_seen),
                };
                io.emit('offline',offlinedata);
            });

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
    socket.on('joinRoom',({username ,groupid}) => {
        const user = userGroupJoin(socket.id,username ,groupid);
        socket.join(user.groupid);
        var formatedMessage=formateMessage(botName,`${ user.username } has joined the chat`);
        formatedMessage.status='online';
        formatedMessage.avatar=users[username].avatar;
        formatedMessage.username=users[username].username;
        formatedMessage.groupid=user.groupid;
        console.log("formatedMessage");
        console.log(formatedMessage);
        socket.broadcast.to(user.groupid).emit('Groupmessage',formatedMessage);
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


const PORT =  process.env.PORT || 3000 ;
server.listen(PORT ,()=> console.log(`server running on port ${PORT}`));

