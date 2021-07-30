importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');
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
messaging.setBackgroundMessageHandler(function (payload){
console.info(payload);
});