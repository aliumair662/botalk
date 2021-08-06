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
var registrationToken=null;
var opneGroupChat=false;
var GroupName='';
var Groupid='';
var EditMessageFlag=false;
var EditMessageId=0;

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
    updateRegistrationTokenWeb(sender);
});
socket.on('online',function (username){
    onlineUsers(username);
});
socket.on('offline',function (data){
    offlineUsers(data.username);
});



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
            groupid:Groupid,
            editmessageflag:EditMessageFlag,
            editmessageid:EditMessageId

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
        groupid:Groupid,
        message:message,
        is_file:1,
        file_type:'image',
        file_path:'files/images/thumbs-up.png',
        editmessageflag:EditMessageFlag,
        editmessageid:EditMessageId
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
        groupid:Groupid,
        message:message,
        is_file:1,
        file_type:'gif',
        file_path:$(this).attr("data-url"),
        editmessageflag:EditMessageFlag,
        editmessageid:EditMessageId
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
            groupid:Groupid,
            message:message,
            is_file:1,
            file_type:file_type,
            file_path:'files/uploads/'+fileInfo.name,
            editmessageflag:EditMessageFlag,
            editmessageid:EditMessageId
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


//Start Firebase Workign

const firebaseConfig = {
    apiKey: "AIzaSyACeSf208P1--gIggBSZnUJSWBlk_RsNUU",
    authDomain: "vyzmo-d9cc0.firebaseapp.com",
    projectId: "vyzmo-d9cc0",
    storageBucket: "vyzmo-d9cc0.appspot.com",
    messagingSenderId: "48070594104",
    appId: "1:48070594104:web:92ed76ce56d3be514460cd"
};
var firebaseapp= firebase.initializeApp(firebaseConfig);
var messaging = firebase.messaging();

messaging.onMessage(function(payload){
    console.info(payload);
    const notificationOption={
        body:payload.notification.body,
        icon:payload.notification.icon,
    };
    if(Notification.permission==="granted"){
        var notification=new Notification(payload.notification.title,notificationOption);
        notification.onclick=function (ev) {
            ev.preventDefault();
            window.open(payload.notification.click_action,'_blank');
            notification.close();

        }
    }

});
messaging.onTokenRefresh(function(payload){
   updateRegistrationTokenWeb(sender)
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
                    socket.emit('typing', {sender:sender,receiver:receiver,groupid:Groupid, typing:true});
                    setTimeout(function(){
                        socket.emit('typing', {sender:sender,receiver:receiver,groupid:Groupid, typing:false});
                    }, 3000);
                }else{
                    socket.emit('typing', {sender:sender,receiver:receiver,groupid:Groupid, typing:false});
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
    let giphyLimit = 5;
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


//Show if message if edit
//Start Function //
//Out put message to Dom
function outputMessage(message){
    if(EditMessageFlag == true && EditMessageId == message.id){
        const div=document.createElement('div');
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
            html+=`<div id="myDropdown_${message.id}" class="dropdown-content">`;
            if(message.is_file==0) {
                html += `<a href="#" onclick="EditMessage('${message.id}','${message.text}');">Edit</a>`;
            }
            html+=`<a href="#" onclick="deleteMessage('${message.id}');">Remove</a></div></div>`;
        }
        div.innerHTML=html;
        document.querySelector('.message_'+message.id).innerHTML='';
        document.querySelector('.message_'+message.id).append(div);

        clearEditMessage();
    }else{
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
            html+=`<div id="myDropdown_${message.id}" class="dropdown-content">`;
            if(message.is_file==0) {
                html += `<a href="#" onclick="EditMessage('${message.id}','${message.text}');">Edit</a>`;
            }
            html+=`<a href="#" onclick="deleteMessage('${message.id}');">Remove</a></div></div>`;
        }
        div.innerHTML=html;
        if (chatScrollingTop) {
            document.querySelector('.chat-messages').prepend(div);
        } else {
            document.querySelector('.chat-messages').appendChild(div);
        }
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
/*function outputRoomName(room){
    roomName.innerText = room;
}*/
//Add Users to Dom
function  outputUsers(message){
    console.info("outputUsers");
    console.info(message.groupid);
        if(message.groupid){
            /*userList.innerHTML += `<div class="row message-grid user-grid user_${message.groupname}" onclick="SelectGroup('${sender}',1,'${message.groupname}','${message.groupid}');"><div class="avatar-image" >*/
            userList.innerHTML += `<div class="row message-grid user-grid user_${message.groupname}" onclick="selectUser('${sender}',0,'${message.groupname}','${message.groupid}');"><div class="avatar-image" >
<img src="${message.avatar}" alt="">
<span></span>
</div>
<div class="user-chat">
<h5>${message.groupname} <span class="typing_${message.groupname}"></span></h5>
<span >${message.text}</span><div class="time-message text-right"><p>${message.time}</p><span><i class="fas fa-check-circle"></i></span></div></div>
`;
        }else{
            userList.innerHTML += `<div class="row message-grid user-grid user_${message.username}" onclick="selectUser('${message.username}',0,'','');"><div class="avatar-image" >
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
function selectUser(username,scrolling,groupname,groupid){
    if(InprogressRequest==true){
        return false;
    }
    if(scrolling==0){
        chatScrollingTop=false;
        PAGE_NO=1;
        document.querySelector('.chat-messages').innerHTML = '';
    }else{
        chatScrollingTop=true;
    }

    document.getElementById('room-name').innerText=(groupname) ? groupname :username;
    $(".show-chat-area").removeClass('d-none');
    $(".no-message-found").addClass('d-none');
    if(groupname){
        $("#status_circle").addClass('d-none');
        $("#room_status").addClass('d-none');
        $("#last_seen").addClass('d-none');
        opneGroupChat=true;
        GroupName=groupname;
        Groupid=groupid;
        receiver=null;
    }else{
        $("#status_circle").removeClass('d-none');
        $("#room_status").removeClass('d-none');
        $("#last_seen").removeClass('d-none');
        opneGroupChat=false;
        GroupName='';
        Groupid='';
        receiver=username;
    }


    //call an ajax
    $(".chat-messages-loader").removeClass("d-none");
    InprogressRequest=true;
    $.ajax({
        url: document.location.origin+"/get_messages",
        method:"POST",
        async: false,
        data:{
          sender:sender,
            receiver:(GroupName != '') ? '' :receiver,
            groupname:GroupName,
            groupid:Groupid,
            limit:LIMIT_MESSAGE,
            first_id:($('.message_box_').length > 0 && chatScrollingTop==true ? $(".message_box_" ).first().attr("data-id") : 0),
            page_number:PAGE_NO,
        },
        success: function(result){
            var messages=JSON.parse(result);
            if(messages.data.length > 0){
                messages=messages.data;
                var last_seen=messages[0].last_seen;
                //console.info(last_seen);
                if(GroupName!=''){
                    $("#last_seen").text('');
                }else{
                    $("#last_seen").text(last_seen);
                }
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
                        is_file:messages[a].is_file,
                        file_path:messages[a].file_path,
                        id:messages[a].id,
                    });
                }
                PAGE_NO++;
            }
            InprogressRequest=false;
        }});
        if(GroupName!=''){
            var avatar=$(".user_"+GroupName).find('.avatar-image').find('img').attr('src');
            socket.emit('joinRoom',{username:sender,groupid:Groupid});
        }else{
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
        }
        $("#room_avatar").attr("src",avatar);
    $(".chat-messages-loader").addClass("d-none");
    if(scrolling==0){
        chatMessages.scrollTop=chatMessages.scrollHeight;
    }
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

async function CreateNewGroup(){
    //call an ajax
    $("#createGroupButton").prop('disabled', true);
    var groupname=$("#groupname").val();
    if(groupname=='' || Group_Users.length===0){
        alert("please fill group name");
        $("#createGroupButton").prop('disabled', false);
        return false;
    }
   if($("#group_picture_file").val()==''  || $("#g_avatar").val()==''){
       alert("please upload an image");
       $("#createGroupButton").prop('disabled', false);
       return false;
   }
   ///start  uploading image data
    $.ajax({
        url: document.location.origin+"/upload-capture-image",
        method:"POST",
        data:{
            file:$("#g_avatar").val(),
            name:Date.now()+'.png',
        },
        success: function(result){
            var messages=JSON.parse(result);
            if(messages.file_path){
                ///start create new Group
                Group_Users.push(sender_id);
                $.ajax({
                    url: document.location.origin+"/create_new_group",
                    method:"POST",
                    data:{
                        groupname:groupname,
                        Group_Users:Group_Users,
                        user_id:sender_id,
                        file_path:messages.file_path

                    },
                    success: function(result){
                        console.log(result);
                        //userList.innerHTML='';
                        var messages=JSON.parse(result);
                        if(messages.status=='201'){
                            alert(messages.message);
                            $("#createGroupButton").prop('disabled', false);
                            return false;
                        }
                        if(messages.status=='200'){
                            messages=messages.data;
                            outputUsers({
                                text:'',
                                username:sender,
                                userid:sender_id,
                                time:'',
                                status:'',
                                avatar:messages.avatar,
                                groupid:messages.id,
                                groupname:messages.groupname
                            });
                            //SelectGroup(sender,messages.groupname);
                            socket.emit('sendMessage',{
                                sender:sender,
                                receiver:null,
                                message:sender+' has made the chat history visible to everyone',
                                is_file:0,
                                file_path:'',
                                file_type:'text',
                                groupid:messages.groupid,
                                editmessageflag:EditMessageFlag,
                                editmessageid:EditMessageId

                            });
                            //$(".user-list-loader").addClass("d-none");
                            $("#groupname").val('');
                            $("#group_picture_file").val('');
                            $("#g_avatar").val('');
                            $("#suggestion-list").html('');
                            $("#selected-people").html('');
                            Group_Users=[];
                            $("#createGroupButton").prop('disabled', false);
                            $("#group-slide-back").trigger("click");
                            $(".close").trigger("click");

                        }

                    }});
                $("#createGroupButton").prop('disabled', false);

            }else{
                alert("file not uploaded");
                return false;
            }
        }});


}

var Group_Users=[];
function addToGroupUser($this,username,avatar,status,userid){

    console.info("checkd"+$($this).prop("checked"));
    if($($this).prop("checked")==true){

        $($this).prop("checked",true);
        GroupSelected.innerHTML +=`<div class="avatar-image groupselecteduser_${userid}" >
                            <img src="${avatar}" alt="">
                            <span><i class="fal fa-times-circle" onclick="removefromGroupUser('${userid}');"></i></span>
                           </div>`;
        Group_Users.push(userid);
    }else{
        removefromGroupUser(userid);

    }

}
function removefromGroupUser(userid){
        $(".groupselecteduser_"+userid).remove();
        $(".groupcheckbox_"+userid).prop("checked",false);
        var Index = Group_Users.indexOf(userid);
         Group_Users.splice(Index, 1);
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
            last_id:0,
            grouplist:1,
            keyword:$("#main_user_search").val()

        },
        success: function(result){
            //console.log(result);
            userList.innerHTML='';
            console.info(result);
            var userlist=JSON.parse(result);
            if(userlist.status==401){
                location.reload();
            }
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
            username:sender,
            grouplist:0,
            limit:10,
            keyword: $("#main_user_search_group").val()
        },
        success: function(result){
            userListCreateGroup.innerHTML='';
            var userlist=JSON.parse(result);
            userlist=userlist.data;
            for(var a=0;a<userlist.length;a++){
                console.info(userlist[a]);
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
                                        <input type="checkbox"  class="groupcheckbox_${userlist[a].id}" onclick="addToGroupUser(this,'${userlist[a].username}','${userlist[a].avatar}','${userlist[a].status}','${userlist[a].id}');">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                `;

            }


        }});


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
                groupid:Groupid,
                receiver:receiver
            }
            socket.emit('messageDeleted',data);
           // io.to(socket.id).emit('userConnected',users[username]);

        }});

    clearEditMessage();

}

function EditMessage(id,text){

    $(".emojionearea-editor").html(text);
    EditMessageFlag=true;
    EditMessageId=id;
    $("#cancel-edit").removeClass('d-none');
}
function clearEditMessage(event){

    EditMessageFlag=false;
    EditMessageId=0;
    $(".emojionearea-editor").html('');
    $("#cancel-edit").addClass('d-none');
    event.preventDefault();
}

function updateRegistrationTokenWeb(sender){
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
    messaging.getToken({ vapidKey: 'BCcO2B3eznrtEsXnPzjdH0mxgWb1xlSAe_ZrfY7SWYjFbIhSaUFYaqh4qY8Z5E_8qwVo7fghMnti7AMkF67s9ZY' }).then((currentToken) => {
        if (currentToken) {
            console.info("currentToken");
            console.info(currentToken);
            $.ajax({
                url: document.location.origin+"/updatefirebasetoken",
                method:"POST",
                data:{
                    username:sender,
                    registrationTokenType:'registrationTokenWeb',
                    token:currentToken,
                },
                success: function(result){
                    console.info("token updated");
                }});
            // Send the token to your server and update the UI if necessary
            // ...
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });




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
        if((receiver || GroupName) && $( ".chat-messages" ).scrollTop()==0){
            console.info("scroll calling");
            setTimeout(function(){ selectUser(receiver,1,GroupName,Groupid); }, 1000);

        }
    }
    lastScrollTop = st;



});
$("body").on('click', '.closeimage', function() {
    $("#ImagePopModal").addClass('d-none');
});
