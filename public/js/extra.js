var audio = document.querySelector('audio');

function captureMicrophone(callback) {
    //btnReleaseMicrophone.disabled = false;

    if(microphone) {
        callback(microphone);
        return;
    }

    if(typeof navigator.mediaDevices === 'undefined' || !navigator.mediaDevices.getUserMedia) {
        alert('This browser does not supports WebRTC getUserMedia API.');

        if(!!navigator.getUserMedia) {
            alert('This browser seems supporting deprecated getUserMedia API.');
        }
    }

    navigator.mediaDevices.getUserMedia({
        audio: isEdge ? true : {
            echoCancellation: false
        }
    }).then(function(mic) {
        callback(mic);
    }).catch(function(error) {
        alert('Unable to capture your microphone. Please check console logs.');
        console.error(error);
    });
}

/*
function replaceAudio(src) {
    var newAudio = document.createElement('audio');
    newAudio.controls = true;
    newAudio.autoplay = true;

    if(src) {
        newAudio.src = src;
    }

    var parentNode = audio.parentNode;
    parentNode.innerHTML = '';
    parentNode.appendChild(newAudio);

    audio = newAudio;
}
*/

function stopRecordingCallback() {
    typeMessageBar.style.display='flex';
    voiceMessageRecordingBar.style.display='none';
    recordingInterval=false;
    var blob = recorder.getBlob();
    recorder.getDataURL(function(dataURI) {
        uploadVoiceClip(dataURI);
    });
    btnStartRecording.disabled = false;
//Start uploading voice clip
    /*replaceAudio(URL.createObjectURL(recorder.getBlob()));
    setTimeout(function() {
        if(!audio.paused) return;

        setTimeout(function() {
            if(!audio.paused) return;
            audio.play();
        }, 1000);

        audio.play();
    }, 300);

    audio.play();

    btnDownloadRecording.disabled = false;

    if(isSafari) {
        click(btnReleaseMicrophone);
    }*/

}

var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

var recorder; // globally accessible
var microphone;

var btnStartRecording = document.getElementById('btn-start-recording');
var btnStopRecording = document.getElementById('btn-stop-recording');
var btnCancelRecording = document.getElementById('btn-cancel-recording');
var voiceMessageRecordingBar = document.getElementById('voice-message-recording-bar');
var typeMessageBar = document.getElementById('type-message-box');
var recordingCountdown = document.getElementById('recording-countdown');
var recordingProgress = document.getElementById('voice-recording-progress-bar');
var maxAudioLength=2 * 1000 * 60;
var recordingInterval=false;
var recordingStarted;
var progressBarWidth=0;
//var btnReleaseMicrophone = document.querySelector('#btn-release-microphone');
//var btnDownloadRecording = document.getElementById('btn-download-recording');

btnStartRecording.onclick = function(e) {
    e.preventDefault();
    this.disabled = true;
    this.style.border = '';
    this.style.fontSize = '';

    if (!microphone) {
        captureMicrophone(function(mic) {
            microphone = mic;

            if(isSafari) {
                //replaceAudio();

                //audio.muted = true;
                //audio.srcObject = microphone;

                btnStartRecording.disabled = false;
                btnStartRecording.style.border = '1px solid red';
                btnStartRecording.style.fontSize = '150%';

                alert('Please click startRecording button again. First time we tried to access your microphone. Now we will record it.');
                return;
            }

            click(btnStartRecording);
        });
        return;
    }

    //replaceAudio();

   // audio.muted = true;
   // audio.srcObject = microphone;

    var options = {
        type: 'audio',
        numberOfAudioChannels: isEdge ? 1 : 2,
        checkForInactiveTracks: true,
        bufferSize: 16384,

    };

    if(isSafari || isEdge) {
        options.recorderType = StereoAudioRecorder;
    }

    if(navigator.platform && navigator.platform.toString().toLowerCase().indexOf('win') === -1) {
        options.sampleRate = 48000; // or 44100 or remove this line for default
    }

    if(isSafari) {
        options.sampleRate = 44100;
        options.bufferSize = 4096;
        options.numberOfAudioChannels = 2;
    }

    if(recorder) {
        recorder.destroy();
        recorder = null;
    }

    recorder = RecordRTC(microphone, options);
    recorder.setRecordingDuration(maxAudioLength,stopRecordingCallback);
    recorder.startRecording();
    typeMessageBar.style.display='none';
    voiceMessageRecordingBar.style.display='flex';
    btnStopRecording.disabled = false;
    recordingCountdown.innerHTML='';
    recordingProgress.style.width='0%';
    recordingStarted=new Date().getTime();
    recordingInterval=true;
    showCounter();
    //btnDownloadRecording.disabled = true;


};

btnStopRecording.onclick = function(e) {
    e.preventDefault();
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
};
btnCancelRecording.onclick = function(e) {
    e.preventDefault();
    recorder.clearRecordedData();
    typeMessageBar.style.display='flex';
    voiceMessageRecordingBar.style.display='none';
    recordingInterval=false;


};

/*btnReleaseMicrophone.onclick = function() {
    this.disabled = true;
    btnStartRecording.disabled = false;

    if(microphone) {
        microphone.stop();
        microphone = null;
    }

    if(recorder) {
        // click(btnStopRecording);
    }
};*/

/*btnDownloadRecording.onclick = function() {
    this.disabled = true;
    if(!recorder || !recorder.getBlob()) return;

    if(isSafari) {
        recorder.getDataURL(function(dataURL) {
            SaveToDisk(dataURL, getFileName('mp3'));
        });
        return;
    }

    var blob = recorder.getBlob();
    var file = new File([blob], getFileName('mp3'), {
        type: 'audio/mp3'
    });
    invokeSaveAsDialog(file);
};*/

function click(el) {
    el.disabled = false; // make sure that element is not disabled
    var evt = document.createEvent('Event');
    evt.initEvent('click', true, true);
    el.dispatchEvent(evt);
}

function getRandomString() {
    if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
        var a = window.crypto.getRandomValues(new Uint32Array(3)),
            token = '';
        for (var i = 0, l = a.length; i < l; i++) {
            token += a[i].toString(36);
        }
        return token;
    } else {
        return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
    }
}

function getFileName(fileExtension) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    return sender+'-' + year + month + date + '-' + getRandomString() + '.' + fileExtension;
}
function calculateTimeDuration(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    if(hr <= 0) {
        return min + ':' + sec;
    }

    return hr + ':' + min + ':' + sec;
}
function showCounter() {
    if(!recordingInterval) {
        recordingCountdown.innerHTML = '';
        progressBarWidth=0;
        recordingProgress.style.width=progressBarWidth+'%';
        return;
    }
    recordingCountdown.innerHTML = calculateTimeDuration((new Date().getTime() - recordingStarted) / 1000);
    setTimeout(showCounter, 1000);
    progressBarWidth++;
    recordingProgress.style.width=progressBarWidth+'%';
}
/*
function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.download = fileName || 'unknown';
        save.style = 'display:none;opacity:0;color:transparent;';
        (document.body || document.documentElement).appendChild(save);

        if (typeof save.click === 'function') {
            save.click();
        } else {
            save.target = '_blank';
            var event = document.createEvent('Event');
            event.initEvent('click', true, true);
            save.dispatchEvent(event);
        }

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}*/

function uploadVoiceClip(dataURI){
    $.ajax({
        url: document.location.origin+"/upload-voice-clip",
        method:"POST",
        data:{
            file:dataURI,
            name:getFileName('mp3')
        },
        success: function(result){
            if(result){
                var result=JSON.parse(result);
                var message='<audio controls><source src="'+result.file_path+'" type="audio/mpeg"></audio>';
                socket.emit('sendMessage',{
                    sender:sender,
                    receiver:receiver,
                    groupid:groupid,
                    message:message,
                    is_file:1,
                    file_type:'audio',
                    file_path:result.file_path
                });

            }
        }});

}
function uploadCaptureSnapshot(dataBases64){
    $.ajax({
        url: document.location.origin+"/upload-capture-image",
        method:"POST",
        data:{
            file:dataBases64,
            name:getFileName('png')
        },
        success: function(result){
            if(result){
                var result=JSON.parse(result);
                var message='<img class="upload_image" src="'+result.file_path+'">';
                socket.emit('sendMessage',{
                    sender:sender,
                    receiver:receiver,
                    message:message,
                    is_file:1,
                    file_type:'image',
                    file_path:result.file_path
                });

            }
        }});

}