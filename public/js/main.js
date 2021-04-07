const chatForm =document.getElementById('chat-form');
const chatMessages =document.querySelector('.chat-messages');
const roomName =document.getElementById('room-name');
const userList =document.getElementById('users');
const uploadform = document.getElementById('plus-icon-form');
//Get username and room from u
const { username } =Qs.parse(location.search,{
    ignoreQueryPrefix:true
});
const socket = io();
if(username){
//Join chatroom
    socket.emit('userConnected',username);
}
//listen from server
socket.on('userConnected',function (user){
    getrecentMessages(user.username);
});
socket.on('online',function (username){
    onlineUsers(username);
});
socket.on('offline',function (username){
    offlineUsers(username);
});
var uploader = new SocketIOFileClient(socket);

var sender=username;
var receiver='';
var typing=false;
var timeout=undefined;
//Submit Message
$( "#chat-form" ).submit(function( e ) {
    e.preventDefault();
    const message = $(".emojionearea-editor").html();
    //Emit message to server
    if(message!=''){
        socket.emit('sendMessage',{
            sender:sender,
            receiver:receiver,
            message:message,
        });
        //Clear input
        $(".emojionearea-editor").html('');
        e.target.elements.msg.value='';
        e.target.elements.msg.focus();
    }
});
//send thumbs up as message
$("#thumbs-up").click(function (e){
    e.preventDefault();
   var message='<img alt="????" class="emojioneemoji" src="files/images/thumbs-up.png">';
    socket.emit('sendMessage',{
        sender:sender,
        receiver:receiver,
        message:message,
    });
});

//upload file as message

$(".upload-file-icon").click(function (e){
    e.preventDefault();
    $("#plus-icon-file").click();
});
$("#plus-icon-file").change(function (){
    $("#plus-icon-form").submit();
});
uploader.on('start', function(fileInfo) {
    console.log('Start uploading', fileInfo);
});
uploader.on('stream', function(fileInfo) {
    console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
});
uploader.on('complete', function(fileInfo) {
    console.log('Upload Complete', fileInfo);
    if(fileInfo){
        var mime_images=['image/png', 'image/jpg','image/jpeg','image/gif'];
        var mime_audio=['audio/mpeg', 'audio/mp3'];
        var mime_videos=['video/mp4','video/mov','video/webm','video/mpeg','video/3gp','video/avi','video/flv','video/ogg','video/mk3d','video/mks','video/wmv','video/m4v','video/x-m4v'];
        if(mime_images.includes(fileInfo.mime)){
            var message='<img class="upload_image" src="files/uploads/'+fileInfo.name+'">';
        }else if(mime_videos.includes(fileInfo.mime)){
            var message='<video ><source src="files/uploads/'+fileInfo.name+'" type="'+fileInfo.mime+'"></video>';
        }
        else if(mime_audio.includes(fileInfo.mime)){
            var message='<audio controls><source src="files/uploads/'+fileInfo.name+'" type="'+fileInfo.mime+'"></audio>';
        }else{
            var message='<img src="files/images/file.svg" class="upload_file_icon"> <a href="files/uploads/'+fileInfo.name+'" class="upload_file"   target="_blank" download>'+fileInfo.name+'</a>';
        }
        socket.emit('sendMessage',{
            sender:sender,
            receiver:receiver,
            message:message,
        });

    }
});
uploader.on('error', function(err) {
    console.log('Error!', err);
});
uploader.on('abort', function(fileInfo) {
    console.log('Aborted: ', fileInfo);
});
uploadform.onsubmit = function(ev) {
    ev.preventDefault();
    var fileEl = document.getElementById('plus-icon-file');
    var uploadIds = uploader.upload(fileEl, {
        data: {

        }
    });
};
//show message to server
socket.on('showmemessage',message => {
    outputMessage({
        text:message.text,
        time:message.time,
        class:'user-sent-message',
        username:message.username,
        status:message.status,
        avatar:message.avatar,

    });
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


//start typing function
$(document).ready(function() {
    var el =$("#msg").emojioneArea({
        pickerPosition: "top",
        filtersPosition: "bottom",
        tonesStyle: "checkbox",
        events: {
            keypress: function (editor, event) {
                if(event.which !== 13){
                    socket.emit('typing', {sender:sender,receiver:receiver, typing:true});
                    setTimeout(function(){
                        socket.emit('typing', {sender:sender,receiver:receiver, typing:false});
                    }, 3000);
                }else{
                    socket.emit('typing', {sender:sender,receiver:receiver, typing:false});
                    event.preventDefault();
                    $('#chat-form').submit();
                }
            }
        }
    });
//Reverse from server code explained later
    socket.on('display', (data)=>{
        console.info(data.typing);
        if(data.typing==true){
            //$('#typing_status').text(`${data.sender} is typing...`);
            $('#room_status').text(`typing...`);
            $(".typing_"+data.sender).text(`typing...`);
        }else{
            $('#room_status').text("online");
            $(".typing_"+data.sender).text('');
        }

    })

});




//Start Function //
//Out put message to Dom
function outputMessage(message){
    const div=document.createElement('div');
        div.classList.add(message.class);
        div.innerHTML=`<div class="avatar-image chat-details">
                       <img src="${message.avatar}" alt="">
                       <span><i class="fas fa-circle ${message.status} status_circle_${message.username}"></i></span>
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
<img src="${message.avatar}" alt="">
<span><i class="fas fa-circle ${message.status}"></i></span>
</div>
<div class="user-chat">
<h5>${message.username} <span class="typing_${message.username}"></span></h5>
<span>${message.text}</span><div class="time-message text-right"><p>${message.time}</p><span><i class="fas fa-check-circle"></i></span></div></div>
`;
    //userList.appendChild(div);
}

function selectUser(username){
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
            var messages=JSON.parse(result);
            var last_seen=messages[0].last_seen;
            console.info(last_seen);
                $("#last_seen").text(last_seen);
            for(var a=0;a<messages.length;a++){
                var messageclass='user-receive-message';
                var status=messages[a].status;
                var avatar=messages[a].receiver_avatar;
                var username=messages[a].receiver_username;
                if(messages[a].sender==sender){
                    messageclass='user-sent-message';
                     status='online';
                    avatar=messages[a].sender_avatar;
                    username=messages[a].sender_username;
                }
                outputMessage({
                    class:messageclass,
                    text:messages[a].text,
                    time:messages[a].message_time,
                    username:username,
                    status:status,
                    avatar:avatar,
                });
                chatMessages.scrollTop=chatMessages.scrollHeight;
            }
        }});

        if( $(".user_"+username).find('.fa-circle').hasClass('online')){
            $("#room_status").text('online');
            $("#status_circle").addClass('online');
            $("#status_circle").addClass('status_circle_'+username);
        }else{
            $("#room_status").text('offline');
            $("#status_circle").removeClass('online');
            $("#status_circle").removeClass('status_circle_'+username);
        }
        var avatar=$(".user_"+username).find('.avatar-image').find('img').attr('src');
        $("#room_avatar").attr("src",avatar);

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
           // console.log(result);
            userList.innerHTML='';
            var messages=JSON.parse(result);
            for(var a=0;a<messages.length;a++){
                outputUsers({
                    text:messages[a].text,
                    username:messages[a].username,
                    time:messages[a].time,
                    status:messages[a].status,
                    avatar:messages[a].avatar
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
            //console.log(result);
            userList.innerHTML='';
            console.info(result);
            var userlist=JSON.parse(result);
            for(var a=0;a<userlist.length;a++){
                outputUsers({
                    text:'',
                    username:userlist[a].username,
                    time:'',
                    status:userlist[a].status,
                    avatar:messages[a].avatar
                });
            }
        }});
    $(".show-chat-area").addClass('d-none');
    $(".no-message-found").removeClass('d-none');
    chatMessages.innerHTML='';
    return ;
}

function onlineUsers(username){
    if($(".user-grid").hasClass("user_"+username)){
        $(".user_"+username).find('.fa-circle').addClass('online');
        $(".status_circle_"+username).addClass('online');
    }
}
function offlineUsers(username){
    if($(".user-grid").hasClass("user_"+username)){
        $(".user_"+username).find('.fa-circle').removeClass('online');
        $(".status_circle_"+username).removeClass('online');
    }
}

$("body").on('click', '.upload_image', function() {

    var src=$(this).attr("src");
    console.info(src);
    $("#popup_image").attr("src", src);
    $("#ImagePopModal").removeClass('d-none');
    $("#ImagePopModalLink").attr("href", src);
});
$("body").on('click', '.closeimage', function() {
    $("#ImagePopModal").addClass('d-none');
});

