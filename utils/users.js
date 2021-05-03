
const groupUsers = [];
const groupUsersbysocket = [];

//Join user to chat

function userGroupJoin (id,username,room){
  /*  groupUsers[username]=id;*/
    const user ={ id,username ,room };
    groupUsers.push(user);
    return user;

}
// get current user
function getCurrentGroupUser(id){
    return groupUsers.find(user => user.id === id);

}
//user leaves chat
function  userGroupLeave(id){
    const index =groupUsers.findIndex(user => user.id === id);
    if(index !== -1){
        return groupUsers.splice(index,1)[0];
    }
}
//Get room users


function getGroupRoomUsers(room){
    return groupUsers.filter(user =>user.room === room);
}
module.exports = {
    userGroupJoin,
    getCurrentGroupUser,
    userGroupLeave,
    getGroupRoomUsers
}