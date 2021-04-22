// The buttons to start & stop stream and to capture the image
var btnStart = document.getElementById( "btn-start-video-streaming" );
var btnStop = document.getElementById( "btn-stop-video-streaming" );
var btnCapture = document.getElementById( "btn-capture-image" );
var btnSendCapture = document.getElementById( "btn-send-capture-image" );

// The stream & capture
var stream = document.getElementById( "stream" );
var capture = document.getElementById( "capture" );
var snapshot = document.getElementById( "snapshot" );

// The video stream
var cameraStream = null;
var imageSrc = null;
var ctx=null;
// Attach listeners
btnStart.addEventListener( "click", startStreaming );
btnStop.addEventListener( "click", stopStreaming );
btnCapture.addEventListener( "click", captureSnapshot );
btnSendCapture.addEventListener( "click", sendCaptureSnapshot );

// Start Streaming
function startStreaming() {

    var mediaSupport = 'mediaDevices' in navigator;

    if( mediaSupport && null == cameraStream ) {

        navigator.mediaDevices.getUserMedia( { video: true } )
            .then( function( mediaStream ) {

                cameraStream = mediaStream;

                stream.srcObject = mediaStream;

                stream.play();
            })
            .catch( function( err ) {

                console.log( "Unable to access camera: " + err );
            });
    }
    else {

        alert( 'Your browser does not support media devices.' );

        return;
    }
}

// Stop Streaming
function stopStreaming() {

    if( null != cameraStream ) {

        var track = cameraStream.getTracks()[ 0 ];

        track.stop();
        stream.load();

        cameraStream = null;
    }
}

function captureSnapshot() {

    if( null != cameraStream ) {

        ctx = capture.getContext( '2d' );
        var img = new Image();

        ctx.drawImage( stream, 0, 0, capture.width, capture.height );

        img.src		= capture.toDataURL( "image/png" );
        imageSrc = capture.toDataURL( "image/png" );
        img.width	= 240;

        snapshot.innerHTML = '';

        //snapshot.appendChild( img );
        btnCapture.style.display='none';
        btnSendCapture.style.display='block';
    }
}
function sendCaptureSnapshot(){
    if(imageSrc!= null){
        uploadCaptureSnapshot(imageSrc);
        btnCapture.style.display='block';
        btnSendCapture.style.display='none';
        ctx.clearRect(0, 0, capture.width, capture.height);
        stopStreaming();
    }
}
$("#imagemodal").on("hidden.bs.modal", function () {
    stopStreaming();
});