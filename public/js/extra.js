
$(document).ready(function(){
    $('#message-box').keypress((e)=>{
        if(e.which!=13){
            typing=true
            socket.emit('typing', {user:user, typing:true})
            clearTimeout(timeout)
            timeout=setTimeout(typingTimeout, 3000)
        }else{
            clearTimeout(timeout)
            typingTimeout()
            //sendMessage() function will be called once the user hits enter
            sendMessage()
        }
    })

    //code explained later
    socket.on('display', (data)=>{
        if(data.typing==true)
            $('.typing').text(`${data.user} is typing...`)
        else
            $('.typing').text("")
    })
})

