function SelectGroup(username,room){
    groupid=room;
    socket.emit('joinRoom',{username ,room});
    $(".show-chat-area").removeClass('d-none');
    $(".no-message-found").addClass('d-none');
    $("#status_circle").addClass('d-none');
    $("#room_status").text('');
    $("#last_seen").addClass('d-none');
    document.querySelector('.chat-messages').innerHTML='';
    $.ajax({
        url: document.location.origin+"/get_group_messages",
        method:"POST",
        data:{
            sender:sender,
            receiver:receiver,
            groupid:groupid
        },
        success: function(result){
            var messages=JSON.parse(result);
            var last_seen=messages[0].last_seen;
            //console.info(last_seen);
            $("#last_seen").text(last_seen);
            for(var a=0;a<messages.length;a++){
                var messageclass='user-receive-message';
                var status=messages[a].status;
                avatar=messages[a].sender_avatar;
                username=messages[a].sender_username;
                if(messages[a].sender_username==sender){
                    messageclass='user-sent-message';

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
                chatMessages.scrollTop=chatMessages.scrollHeight;
            }
        }});
    var avatar=$(".user_"+room).find('.avatar-image').find('img').attr('src');
    $("#room_avatar").attr("src",avatar);
}

//Message from server
s/*ocket.on('groupmessage',message => {
console.log(message);
    outputMessage(message);
    //Scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight;
});*/
//get room and users
socket.on('roomUsers',({ room, users })=>{
    console.info("roomUsers"+room);
    outputRoomName(room);
});

//Message from server
socket.on('Groupmessage',message => {
console.info(message);
    message.class='user-receive-message';
    if(sender==message.username){
        message.class='user-sent-message';
    }

    if(groupid==message.groupid){
        outputMessage(message);

    }else{
        /*if($(".user-grid").hasClass("user_"+groupid)){
            $(".user_"+groupid).remove();
        }
        outputUsers(message);*/
    }
    //Scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight;
});
socket.on('groupnotification',message => {
    //to show group notification change the username to current login user
    message.username=sender;
if($(".user-grid").hasClass("user_"+message.groupid)){
        $(".user_"+message.groupid).remove();
    }
    outputUsers(message);
});

socket.on('messageDeleted',id => {
    $(".message_"+id).remove();
    chatMessages.scrollTop=chatMessages.scrollHeight;
});
//Reverse from server code explained later
socket.on('displaygroup', (data)=>{
    if(data.typing==true){
        if(data.sender!=sender){
            $('#room_status').text(data.sender +` is typing...`);
        }

    }else{
        $('#room_status').text('');

    }

})
