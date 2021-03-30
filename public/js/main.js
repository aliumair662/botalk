const chatForm =document.getElementById('chat-form');
const chatMessages =document.querySelector('.chat-messages');
const roomName =document.getElementById('room-name');
const userList =document.getElementById('users');

//Get username and room from u
const { username } =Qs.parse(location.search,{
    ignoreQueryPrefix:true
});
const socket = io();
//Join chatroom
socket.emit('userConnected',username);
//listen from server
socket.on('userConnected',function (user){
    getrecentMessages(user.username);
});
socket.on('setOnline',function (username){
    onlineUsers(username);
});
var sender=username;
var receiver='';
//Submit Message
chatForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const message = e.target.elements.msg.value;
    //Emit message to server

    socket.emit('sendMessage',{
        sender:sender,
        receiver:receiver,
        message:message,
    });
    outputMessage({
        text:message,
        time:formatAMPM(new Date),
        class:'user-sent-message'

    });
    //Clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
    chatMessages.scrollTop=chatMessages.scrollHeight;
});

//Message from server
socket.on('message',message => {
   // console.info("sending message"+message);
    message.class='user-receive-message';
    if(message.username==receiver){
        outputMessage(message);
    }else{
        if($(".user-grid").hasClass("user_"+message.username)){
            $(".user_"+message.username).remove();
        }
        outputUsers(message);
    }

    //Scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight;
});


//Out put message to Dom
function outputMessage(message){
    const div=document.createElement('div');
        div.classList.add(message.class);
        div.innerHTML=`<div class="avatar-image chat-details">
                       <img src="files/images/avatar.jpg" alt="">
                       <span><i class="fas fa-circle"></i></span>
                       </div>
                       <div class="message-sent">
                       <p>${message.text}</p>
                       <span>${message.time}</span>
                       </div>`;
    document.querySelector('.chat-messages').appendChild(div);
}
//Add room name to Dom
function outputRoomName(room){
    roomName.innerText = room;
}
//Add Users to Dom
function  outputUsers(message){

    userList.innerHTML += `<div class="row message-grid user-grid user_${message.username}" onclick="selectUser('${message.username}');"><div class="avatar-image" >
<img src="files/images/avatar.jpg" alt="">
<span><i class="fas fa-circle"></i></span>
</div>
<div class="user-chat">
<h5>${message.username}</h5><span>${message.text}</span><div class="time-message text-right"><p>${message.time}</p><span><i class="fas fa-check-circle"></i></span></div></div>

`;
    //userList.appendChild(div);
}

function selectUser(username){
    console.info(username);
    document.getElementById('room-name').innerText=username;
    receiver=username;
    $(".show-chat-area").removeClass('d-none');
    $(".no-message-found").addClass('d-none');
    document.querySelector('.chat-messages').innerHTML='';

    //call an ajax
    $.ajax({
        url: "http://localhost:3000/get_messages",
        method:"POST",
        data:{
          sender:sender,
          receiver:receiver,
        },
        success: function(result){
            //console.log(result);


            var messages=JSON.parse(result);
            for(var a=0;a<messages.length;a++){
                var messageclass='user-receive-message';
                if(messages[a].sender==sender){
                    messageclass='user-sent-message';
                }
                outputMessage({
                    class:messageclass,
                    text:messages[a].text,
                    time:messages[a].message_time
                });
                chatMessages.scrollTop=chatMessages.scrollHeight;
            }
        }});
    getrecentMessages(sender);
}
function getrecentMessages(username){
    //call an ajax
    $.ajax({
        url: "http://localhost:3000/get_recent_messages",
        method:"POST",
        data:{
            username:username,
        },
        success: function(result){
            console.log(result);
            userList.innerHTML='';

            var messages=JSON.parse(result);
            for(var a=0;a<messages.length;a++){
                outputUsers({
                    text:messages[a].text,
                    username:messages[a].username,
                    time:messages[a].time
                });
            }
        }});

}
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function showUserList(){
    $.ajax({
        url: "http://localhost:3000/get_user_list",
        method:"POST",
        data:{
            username:username
        },
        success: function(result){
            console.log(result);
            userList.innerHTML='';
            var userlist=JSON.parse(result);
            for(var a=0;a<userlist.length;a++){
                outputUsers({
                    text:'',
                    username:userlist[a].username,
                    time:''
                });
            }
        }});
    return ;

}

function onlineUsers(username){
    console.info(username);
    if($(".user-grid").hasClass("user_"+username)){
        $(".user_"+username).find('.fa-circle').addClass('online');
    }
}
function onfflineUsers(username){
    console.info(username);
    if($(".user-grid").hasClass("user_"+username)){
        $(".user_"+username).find('.fa-circle').removeClass('online');
    }
}
