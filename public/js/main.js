const chatForm =document.getElementById('chat-form');
const chatMessages =document.querySelector('.chat-messages');
const roomName =document.getElementById('room-name');
const userList =document.getElementById('users');
const userListCreateGroup =document.getElementById('suggestion-list');
const GroupSelected =document.getElementById('selected-people');
const uploadform = document.getElementById('plus-icon-form');
//Get username and room from u
//const getUserMedia = require('get-user-media-promise');
//const MicrophoneStream = require('microphone-stream');
//var username=null

var sender=null;
var sender_avatar=null;
var sender_id=null;
var chatScrollingTop=false;
const { u } =Qs.parse(location.search,{
    ignoreQueryPrefix:true
});
var domain='https://vyzmo.com/';
const socket = io();
if(u){
//Join chat
    socket.emit('userConnected',u);
}
//listen from server
socket.on('userConnected',function (user){
    getrecentMessages(user.id);
    //username=username;
    $("#loginusername").text(user.username);
    sender=user.username;
    sender_avatar=user.avatar;
    sender_id=user.id;
    console.log("username=>"+user.username);

});
socket.on('online',function (username){
    onlineUsers(username);
});
socket.on('offline',function (data){
    offlineUsers(data.username);
});
var groupid=null;


var uploader = new SocketIOFileClient(socket);


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
            is_file:0,
            file_path:'',
            file_type:'text',
            groupid:groupid

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
        groupid:groupid,
        message:message,
        is_file:1,
        file_type:'image',
        file_path:'files/images/thumbs-up.png',
    });
});
//Send Giphy
$('body').on('click', '.gif-gallery-item', function() {
    //code
//$(".gif-gallery-item").click(function (){
    console.info("gif-gallery-item");
    console.info($(this).attr("data-url"));
    var message='<img alt="????"  src="'+$(this).attr("data-url")+'">';
    socket.emit('sendMessage',{
        sender:sender,
        receiver:receiver,
        groupid:groupid,
        message:message,
        is_file:1,
        file_type:'gif',
        file_path:$(this).attr("data-url"),
    });

    $("#gifmodal").addClass('d-none');
    $(".modal-backdrop").addClass('d-none');
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
    if(fileInfo){

        var mime_images=['image/png', 'image/jpg','image/jpeg','image/gif'];
        var mime_audio=['audio/mpeg', 'audio/mp3'];
        var mime_videos=['video/mp4','video/mov','video/webm','video/mpeg','video/3gp','video/avi','video/flv','video/ogg','video/mk3d','video/mks','video/wmv','video/m4v','video/x-m4v'];
        if(mime_images.includes(fileInfo.mime)){
            var message='<img class="upload_image" src="files/uploads/'+fileInfo.name+'">';

        }else if(mime_videos.includes(fileInfo.mime)){
            var message='<video controls><source src="files/uploads/'+fileInfo.name+'" type="'+fileInfo.mime+'"></video>';

        }
        else if(mime_audio.includes(fileInfo.mime)){
            var message='<audio controls><source src="files/uploads/'+fileInfo.name+'" type="'+fileInfo.mime+'"></audio>';

        }else{
            var message='<img src="files/images/file.svg" class="upload_file_icon"> <a href="files/uploads/'+fileInfo.name+'" class="upload_file"   target="_blank" download>'+fileInfo.name+'</a>';

        }

        outputFile({
            uploadId:fileInfo.uploadId,
            time:formatAMPM(new Date()),
            text:message,
            username:sender,
            avatar:sender_avatar,
            class:'user-sent-message',

        });
        chatMessages.scrollTop=chatMessages.scrollHeight;
    }

});
uploader.on('stream', function(fileInfo) {

    var uploadProgress=calculateUploadProgress(fileInfo.size,fileInfo.sent);
    console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
    $(".uploadprogress_"+fileInfo.uploadId).text('Sending ...(' + uploadProgress + ' %)');
});
uploader.on('complete', function(fileInfo) {
    console.log('Upload Complete', fileInfo);
    $(".message_"+fileInfo.uploadId).remove();
    if(fileInfo){
        var file_type='text';
        var mime_images=['image/png', 'image/jpg','image/jpeg','image/gif'];
        var mime_audio=['audio/mpeg', 'audio/mp3'];
        var mime_videos=['video/mp4','video/mov','video/webm','video/mpeg','video/3gp','video/avi','video/flv','video/ogg','video/mk3d','video/mks','video/wmv','video/m4v','video/x-m4v'];
        if(mime_images.includes(fileInfo.mime)){
            var message='<img class="upload_image" src="files/uploads/'+fileInfo.name+'">';
            file_type='image';
        }else if(mime_videos.includes(fileInfo.mime)){
            var message='<video controls><source src="files/uploads/'+fileInfo.name+'" type="'+fileInfo.mime+'"></video>';
            file_type='video';
        }
        else if(mime_audio.includes(fileInfo.mime)){
            var message='<audio controls><source src="files/uploads/'+fileInfo.name+'" type="'+fileInfo.mime+'"></audio>';
            file_type='audio';
        }else{
            var message='<img src="files/images/file.svg" class="upload_file_icon"> <a href="files/uploads/'+fileInfo.name+'" class="upload_file"   target="_blank" download>'+fileInfo.name+'</a>';
            file_type='file';
        }
        socket.emit('sendMessage',{
            sender:sender,
            receiver:receiver,
            groupid:groupid,
            message:message,
            is_file:1,
            file_type:file_type,
            file_path:'files/uploads/'+fileInfo.name,
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
    chatScrollingTop=false;
    outputMessage({
        text:message.text,
        time:message.time,
        class:'user-sent-message',
        username:message.username,
        status:message.status,
        avatar:message.avatar,
        is_file:message.is_file,
        file_path:message.file_path,
        id:message.id,

    });
    chatMessages.scrollTop=chatMessages.scrollHeight;
});


socket.on('message',message => {

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
//Message from server



    var el =$("#msg").emojioneArea({
        pickerPosition: "top",
        filtersPosition: "bottom",
        tonesStyle: "checkbox",

        events: {
            keypress: function (editor, event) {

                if(event.which !== 13){
                    socket.emit('typing', {sender:sender,receiver:receiver,groupid:groupid, typing:true});
                    setTimeout(function(){
                        socket.emit('typing', {sender:sender,receiver:receiver,groupid:groupid, typing:false});
                    }, 3000);
                }else{
                    socket.emit('typing', {sender:sender,receiver:receiver,groupid:groupid, typing:false});
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
            if($("#room-name").text()==data.sender){
                $('#room_status').text(`typing...`);
            }
            $(".typing_"+data.sender).text(`typing...`);
        }else{
            $('#room_status').text("online");
            $(".typing_"+data.sender).text('');
        }

    })

    let offset = 0;
    // initial value for offset
    let offsetVal = 0;
    // set your limit
    let giphyLimit = 10;
    let giphyCallInprogess=false;
    const apiKey = 'pyqgeU33gNSqBeuCS2wZrhnaOnjSKTUP'
    function getGiphy (i){
        console.info("clcik here");
        if(giphyCallInprogess==true){
            return false;
        }
        // if offset is greater than one then fetch further items prior to previous ones
        if (i > 0){
            // increase the offset with item limit like 25, 50 to get the next items
            offsetVal = giphyLimit*i;
        }
        var url='https://api.giphy.com/v1/gifs/trending?';
        var data={api_key:apiKey, limit: giphyLimit, offset: offsetVal};
        if($(".gif-search-input").val()!=''){
            url='https://api.giphy.com/v1/gifs/search?';
            data={q:$(".gif-search-input").val(),api_key:apiKey, limit: giphyLimit, offset: offsetVal};
        }
        giphyCallInprogess=true;
        $.ajax({
           /* url: 'https://api.giphy.com/v1/gifs/search?',*/
            url: url,
            type: 'GET',
            dataType: 'json',
            /*data: {q:'keyword',api_key:apiKey, limit: giphyLimit, offset: offsetVal},*/
            data: data,
            success: (data) => {
                $.each(data['data'], ( index, value) => {
                    let url = value['images']['original']['url'];
                    var html='<div class="col-lg-3 gif-gallery-item" data-url="'+url+'">';
                    html+='<img src="'+url+'">';
                    html+='</div>';
                    document.getElementById("gif-gallery-wrapper").innerHTML+=html;
                });
                // increase offset to get further items.
                console.info("offset"+offset);
                offset = offset+1;
                giphyCallInprogess=false;
            }
        });
    }
    getGiphy(0);
    var lastGifScrollTop = 0;
    $("#gif-gallery-wrapper").scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastGifScrollTop){
            // downscroll code
        } else {
            // upscroll code
            getGiphy(offset);
        }


        lastGifScrollTop = st;
    });

    $("#start_giphy_search").click(function(event){
        getGiphy(0);
    });

});



function calculateUploadProgress(filesize,filesizesent){
    var pPos = filesize;
    var pEarned = filesizesent;
    var perc="";
    if(isNaN(pPos) || isNaN(pEarned)){
        perc=" ";
    }else{
        perc = ((pEarned/pPos) * 100).toFixed(3);
    }

   return perc;
}

//Start Function //
//Out put message to Dom
function outputMessage(message){
    const div=document.createElement('div');
        div.classList.add(message.class);
        div.classList.add('message_'+message.id);
        div.classList.add('message_box_');
        div.setAttribute('data-id',message.id);
        var html=`<div class="avatar-image chat-details">
                       <img src="${message.avatar}" alt="">
                       <span><i class="fas fa-circle ${message.status} status_circle_${message.username}"></i></span>
                       </div>
                       <div class="message-sent">`;
        if(message.is_file==1){
            html+=`${message.text}`;
        }else{
            html+=`<p>${message.text}</p>`;
        }
        html+=`<span>${message.time}</span></div>`;
    if(message.username==sender){
        html+=`<div class="dropdown">`;
        html+=`<a onclick="openAction('${message.id}');" class="dropbtn"><i class="fal fa-ellipsis-v ml-2"></i></a>`;
        html+=`<div id="myDropdown_${message.id}" class="dropdown-content"><a href="#" onclick="deleteMessage('${message.id}');">Remove</a></div></div>`;
    }
        /*html+=`<div class="dropdown">`;
        html+=`<a onclick="myFunction()" class="dropbtn"><i class="fal fa-ellipsis-v ml-2"></i></a>`;
        html+=`<div id="myDropdown" class="dropdown-content"><a href="#home">Remove</a></div></div>`;*/
        div.innerHTML=html;
        console.info("scroll");
        /*console.info(scroll);
        if(scroll==false){
            document.querySelector('.chat-messages').appendChild(div);

        }else{
            document.querySelector('.chat-messages').prepend(div);
        }*/
    if(chatScrollingTop){
        document.querySelector('.chat-messages').prepend(div);
    }else{
        document.querySelector('.chat-messages').appendChild(div);
    }


}
function outputFile(message){
    console.info("outputFile");
    const div=document.createElement('div');
    div.classList.add(message.class);
    div.classList.add('message_'+message.uploadId);
    var html=`<div class="avatar-image chat-details">
                       <img src="${message.avatar}" alt="">
                       <span><i class="fas fa-circle online status_circle_${message.username}"></i></span>
                       </div>
                       <div class="message-sent">`;
    html+=`${message.text}`;
    html+=`<span>${message.time}</span></div>`;
    html+=`<span class="uploadprogressbar uploadprogress_${message.uploadId}"></span></div>`;

    div.innerHTML=html;

    document.querySelector('.chat-messages').appendChild(div);
}
//Add room name to Dom
function outputRoomName(room){
    roomName.innerText = room;
}
//Add Users to Dom
function  outputUsers(message){
    console.info("outputUsers");
    console.info(message.groupid);
        if(message.groupid){
            userList.innerHTML += `<div class="row message-grid user-grid user_${message.groupname}" onclick="SelectGroup('${sender}','${message.groupname}');"><div class="avatar-image" >
<img src="${message.avatar}" alt="">
<span></span>
</div>
<div class="user-chat">
<h5>${message.groupname} <span class="typing_${message.groupname}"></span></h5>
<span >${message.text}</span><div class="time-message text-right"><p>${message.time}</p><span><i class="fas fa-check-circle"></i></span></div></div>
`;
        }else{
            userList.innerHTML += `<div class="row message-grid user-grid user_${message.username}" onclick="selectUser('${message.username}','${message.userid}',false);"><div class="avatar-image" >
<img src="${message.avatar}" alt="">
<span><i class="fas fa-circle ${message.status}"></i></span>
</div>
<div class="user-chat">
<h5>${message.username} <span class="typing_${message.username}"></span></h5>
<span>${message.text}</span><div class="time-message text-right"><p>${message.time}</p><span><i class="fas fa-check-circle"></i></span></div></div>
`;
        }

    //userList.appendChild(div);
}
var LIMIT_MESSAGE=10;
var PAGE_NO=1;
var HAS_MORE_PAGE=false;
var InprogressRequest=false;
function selectUser(username,userid){
    if(InprogressRequest==true){
        return false;
    }
    if(userid>0){
        chatScrollingTop=false;
    }
    console.info("dsds");
    console.info($(".message_box_" ).first().attr("data-id"));
    var first_id=($('.message_box_').length > 0 && chatScrollingTop==true ? $(".message_box_" ).first().attr("data-id") : 0);

    /*if(scroll==false){
        PAGE_NO=1;
        HAS_MORE_PAGE=false;
    }*/
    document.getElementById('room-name').innerText=username;
    receiver=username;
    $(".show-chat-area").removeClass('d-none');
    $(".no-message-found").addClass('d-none');
    $("#status_circle").removeClass('d-none');
    $("#room_status").removeClass('d-none');
    $("#last_seen").removeClass('d-none');
    if(chatScrollingTop==false){ //if scrolling call
    document.querySelector('.chat-messages').innerHTML = '';
    }
    //call an ajax
    groupid=null;
    $(".chat-messages-loader").removeClass("d-none");
    InprogressRequest=true;
    $.ajax({
        //url: "http://localhost:3000/get_messages",
        url: document.location.origin+"/get_messages",
        method:"POST",
        async: false,
        data:{
          sender:sender,
            receiver:receiver,
            limit:LIMIT_MESSAGE,
            first_id:first_id,

        },
        success: function(result){
            var messages=JSON.parse(result);
            if(messages.data.length > 0){
                messages=messages.data;
                var last_seen=messages[0].last_seen;
                //console.info(last_seen);
                $("#last_seen").text(last_seen);
                for(var a=0;a<messages.length;a++){
                    var messageclass='user-receive-message';
                    var status=messages[a].status;
                    var avatar=messages[a].receiver_avatar;
                    var username=messages[a].receiver_username;
                    console.info(messages[a].sender+'=='+sender+'=='+status);
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
                        is_file:messages[a].is_file,
                        file_path:messages[a].file_path,
                        id:messages[a].id,
                    });
                    /*chatMessages.scrollTop=chatMessages.scrollHeight;*/
                    /*if(scroll==false){
                        chatMessages.scrollTop=chatMessages.scrollHeight;
                    }else{

                    }*/
                    if(chatScrollingTop==false){
                        chatMessages.scrollTop=chatMessages.scrollHeight;
                    }

                }



            }
            InprogressRequest=false;
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
    $(".chat-messages-loader").addClass("d-none");

}
function getrecentMessages(userid){
    //call an ajax
$(".user-list-loader").removeClass("d-none");
    $.ajax({
        url: document.location.origin+"/get_recent_messages",
        method:"POST",
        data:{
            userid:userid,

        },
        success: function(result){
            console.log(result);
            userList.innerHTML='';
            var messages=JSON.parse(result);
            messages=messages.data;
            for(var a=0;a<messages.length;a++){
                outputUsers({
                    text:(messages[a].last_message ? messages[a].last_message.text : ''),
                    username:messages[a].username,
                    userid:messages[a].userid,
                    time:(messages[a].last_message ? messages[a].last_message.message_time : ''),
                    status:messages[a].status,
                    avatar:messages[a].avatar,
                    groupid:messages[a].groupid,
                    groupname:messages[a].groupname
                });
            }
            $(".user-list-loader").addClass("d-none");
        }});
}
function addToGroupUser($this,username,avatar,status){

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

    $(".user-list-loader").removeClass('d-none');
    $.ajax({
        url: document.location.origin+"/get_user_list",
        method:"POST",
        data:{
            username:sender,
            limit:10,
            last_id:0

        },
        success: function(result){
            //console.log(result);
            userList.innerHTML='';
            console.info(result);
            var userlist=JSON.parse(result);
            userlist=userlist.data;
            for(var a=0;a<userlist.length;a++){
                outputUsers({
                    text:'',
                    username:userlist[a].username,
                    time:'',
                    status:userlist[a].status,
                    groupid:userlist[a].groupid,
                    groupname:userlist[a].groupname,
                    avatar:userlist[a].avatar
                });
            }
            $(".user-list-loader").addClass('d-none');
        }});
    $(".show-chat-area").addClass('d-none');
    $(".no-message-found").removeClass('d-none');
    chatMessages.innerHTML='';
    return ;
}
function showUserListForGroup(){
    $.ajax({
        url: document.location.origin+"/get_user_list",
        method:"POST",
        data:{
            username:sender
        },
        success: function(result){
            userListCreateGroup.innerHTML='';
            var userlist=JSON.parse(result);
            for(var a=0;a<userlist.length;a++){
                userListCreateGroup.innerHTML += ` 
                     <div class="row message-grid">
                            <div class="avatar-image">
                                <img src="${userlist[a].avatar}" alt="" />
                                <span><i class="fas fa-circle ${userlist[a].status}"></i></span>
                            </div>
                            <div class="user-chat">
                                <h5>${userlist[a].username}</h5>
                                <div class="form-check">
                                    <label class="contain-check">
                                        <input type="checkbox" checked="checked" onclick="addToGroupUser(this,'${userlist[a].username}','${userlist[a].avatar}','${userlist[a].status}');">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                `;

            }


        }});

    return ;
}
function deleteMessage(id){

    $.ajax({
        url: document.location.origin+"/delete_message",
        method:"POST",
        data:{
            id:id,
        },
        success: function(result){

            var data={
                id:id,
                groupid:groupid,
                receiver:receiver
            }
            socket.emit('messageDeleted',data);
           // io.to(socket.id).emit('userConnected',users[username]);

        }});



}
function onlineUsers(username){
    if($(".user-grid").hasClass("user_"+username)){
        $(".user_"+username).find('.fa-circle').addClass('online');
        $(".status_circle_"+username).addClass('online');
        if($("#room-name").text()==username){
            $("#room_status").text('Online');
            $("#last_seen").text('');
            $("#status_circle").addClass('online');
        }
    }
}

function offlineUsers(username){
    if($(".user-grid").hasClass("user_"+username)){
        $(".user_"+username).find('.fa-circle').removeClass('online');
        $(".status_circle_"+username).removeClass('online');
    }
    if($("#room-name").text()==username){
        $("#room_status").text('offline');
        $("#last_seen").text('');
        $("#status_circle").removeClass('online');
    }
}

$("body").on('click', '.upload_image', function() {

    var src=$(this).attr("src");
    console.info(src);
    $("#popup_image").attr("src", src);
    $("#ImagePopModal").removeClass('d-none');
    $("#ImagePopModalLink").attr("href", src);
});
var lastScrollTop = 0;
$(chatMessages).scroll(function(event){
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
        // downscroll code
    } else {
        // upscroll code
        if(receiver!=null){
            chatScrollingTop=true;
            selectUser(receiver,0);
        }
    }


    lastScrollTop = st;
});
$("body").on('click', '.closeimage', function() {
    $("#ImagePopModal").addClass('d-none');
});