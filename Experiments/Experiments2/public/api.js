let video = null,
	audio = null,
	mixedStream = null,
	chunks = [],
	recorder = null,

function setStream () {
	setupStream();
	if(video == null) {
		console.error('Error, no video recording device selected');
	}
	else {
		console.log('Video Recording Device Connected: ');
	}
}

function startRecVideo () {
	if(video == null) {
		console.error('Error, no video recording device connected, trying to initialize');
		setupStream();
	}
	if(video == null) {
		console.error('Error, no video recording device connected, trying to initialize');
	}
	else {
		startRecording();
	}
}

function stopRecording () {
	stopRecording();
}


	