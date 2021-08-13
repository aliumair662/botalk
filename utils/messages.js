const moment =require('moment');

function formateMessage(username ,text){
    var d = new Date();
    var n = d.toISOString();
    return {
        username,
        text,
        //time :moment().format('h:mm:a'),
        time :n,
        status:'offline'

    }

}
module.exports = formateMessage;