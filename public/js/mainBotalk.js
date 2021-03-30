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
socket.emit('joinChat',username);
//listen from server
socket.on('liveUser',function (users){
    outputUsers(users);
});
//get room and users
/*socket.on('roomUsers',({ room, users })=>{
    outputRoomName(to);
    outputUsers(users);

});*/

//Message from server
/*socket.on('message',message => {
console.log(message);
    outputMessage(message);
    //Scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight;
});*/

//Submit Message

/*chatForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    //Emit message to server
    socket.emit('chatMessage',msg);
    //Clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();

});*/
//Out put message to Dom
    function outputMessage(message){
        const div=document.createElement('div');
        if(to==message.username){
            div.classList.add('user-receive-message');
            div.innerHTML=`<div class="message-sent">
                                        <p>${message.text}</p>
                                        <span>${message.time}</span>
                                    </div>
                                    <div class="avatar-image chat-details">
                                        <img src="files/images/avatar2.png" alt="">
                                        <span><i class="fas fa-circle"></i></span>
                                    </div>`;
         }else{
            div.classList.add('user-sent-message');
            div.innerHTML=`<div class="avatar-image chat-details">
                                        <img src="files/images/avatar.jpg" alt="">
                                        <span><i class="fas fa-circle"></i></span>
                                    </div>
                                    <div class="message-sent">
                                        <p>${message.text}</p>
                                        <span>${message.time}</span>
                                    </div>`;
        }
        document.querySelector('.chat-messages').appendChild(div);

    }
    //Add room name to Dom
    function outputRoomName(room){
        roomName.innerText = room;
    }
        //Add Users to Dom
    function  outputUsers(users){

        userList.innerHTML=`
            ${users.map(user=> `<div class="row message-grid"><div class="avatar-image">
        <img src="files/images/avatar.jpg" alt="">
        <span><i class="fas fa-circle"></i></span>
        </div>
        <div class="user-chat">
        <h5>${username}</h5>
        <span>
        How are you?
        </span>
        </div>
        <div class="time-message text-right">
        <p>
        16:48
        </p>
        <span><i class="fas fa-check-circle"></i></span>
        </div></div>`).join('')}
        `;



        div.innerHTML=`
        <div class="row message-grid"><div class="avatar-image">
        <img src="files/images/avatar.jpg" alt="">
        <span><i class="fas fa-circle"></i></span>
        </div>
        <div class="user-chat">
        <h5>${username}</h5>
        <span>
        How are you?
        </span>
        </div>
        <div class="time-message text-right">
        <p>
        16:48
        </p>
        <span><i class="fas fa-check-circle"></i></span>
        </div></div>
        `;
        userList.appendChild(div);

    }