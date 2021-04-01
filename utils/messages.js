const moment =require('moment');

function formateMessage(username ,text){
    return {
        username,
        text,
        time :moment().format('h:mm:a'),
        status:'offline'

    }

}
module.exports = formateMessage;