importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');
const firebaseConfig = {
    apiKey: "AIzaSyAqo8trzy5iSmZak2gs0axG62JvBPpuTRY",
    authDomain: "vyzmo-bf2fb.firebaseapp.com",
    projectId: "vyzmo-bf2fb",
    storageBucket: "vyzmo-bf2fb.appspot.com",
    messagingSenderId: "753239092223",
    appId: "1:753239092223:web:eb51370469b51f560a15ca"
};
var firebaseapp= firebase.initializeApp(firebaseConfig);
var messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload){
console.info(payload);
});