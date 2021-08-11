
//Message from server
socket.on('Groupmessage',message => {
    chatScrollingTop=false;
    console.info("Groupmessage Message from server");
        message.class='user-receive-message';
        if(sender==message.username){
            message.class='user-sent-message';
        }
        if(Groupid==message.groupid){
            outputMessage(message);
        }
        chatMessages.scrollTop=chatMessages.scrollHeight;
});
/*socket.on('groupnotification',message => {

    message.username=sender;
if($(".user-grid").hasClass("user_"+message.groupid)){
        $(".user_"+message.groupid).remove();
    }
    outputUsers(message);
});*/

socket.on('messageDeleted',id => {
    $(".message_"+id).remove();
    chatMessages.scrollTop=chatMessages.scrollHeight;
});
//Reverse from server code explained later
socket.on('displaygroup', (data)=>{
    console.info("displaygroup");


    if(data.typing==true){
        if(data.sender!=sender){
            $('#room_status').text(data.sender +` is typing...`);
        }

    }else{
        $('#room_status').text('');

    }

})
