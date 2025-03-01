// First lets hide the message
// document.getElementById("alert").style.display = "none";

// Next, declare the options that will passed into the recording constructor
const options = {
	controls: true,
	bigPlayButton: false,
	aspectRatio: '16:3',
	fluid: true, // this ensures that it's responsive
	plugins: {
		wavesurfer: {
			backend: "WebAudio",
			waveColor: "#f7fff7", // change the wave color here. Background color was set in the css above
			progressColor: "#ffe66d",
			displayMilliseconds: true,
			debug: true,
			cursorWidth: 1,
			hideScrollbar: true,
			plugins: [
				// enable microphone plugin
				WaveSurfer.microphone.create({
					bufferSize: 4096,
					numberOfInputChannels: 1,
					numberOfOutputChannels: 1,
					constraints: {
					video: false,
					audio: true,
					},
				}),
			],
		},
		record: {
			audio: true, // only audio is turned on
			video: false, // you can turn this on as well if you prefer video recording.
			maxLength: 180, // how long do you want the recording?
			displayMilliseconds: true,
			debug: true,
		},
	},
};

// apply audio workarounds for certain browsers
applyAudioWorkaround();

var player = videojs('audio_recorder', options, function() {
	// print version information at startup
	var msg = 'Using video.js ' + videojs.VERSION +
			' with videojs-record ' + videojs.getPluginVersion('record') +
			', videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
			', wavesurfer.js ' + WaveSurfer.VERSION + ' and recordrtc ' +
			RecordRTC.version;
	
	videojs.log(msg);
});

// error handling
player.on("deviceError", function () {
	console.log("device error:", player.deviceErrorCode);
});

player.on("error", function (element, error) {
	console.error(error);
});

// user clicked the record button and started recording
player.on("startRecord", function () {
	console.log("started recording!");
});

// user completed recording and stream is available
player.on("finishRecord", function () {
	const audioFile = player.recordedData;
	console.log("finished recording: ", audioFile);
	$("#submit").prop("disabled", false);
});

// update level slider on input
$("#id_m_slider").on("input", function() {
	$("#ex6SliderVal").text(document.getElementById("id_m_slider").value);
});

// Give event listener to the submit button
$("#submit").on("click", function (event) {
	event.preventDefault();
	let btn = $(this);
	//   change the button text and disable it
	btn.html("Submitting...").prop("disabled", true).addClass("disable-btn");
	//   create a new File with the recordedData and its name
	const recordedFile = new File([player.recordedData], `recorded_audio.webm`);
	//   initializes an empty FormData
	let form = document.getElementById("id_utterance_detail_form")
	let data = new FormData(form);
	//   appends the recorded file and language value
	console.log(recordedFile);
	data.append("recorded_audio", recordedFile);

	//   post url endpoint
	const url = ""

	$.ajax({
		url: url,
		method: "POST",
		data: data,
		dataType: "json",
		success: function (response) {
			console.log('success function')
			if (response.success) {
				console.log('success!');
				window.location.href = `${response.url}`;
			} 
			else {
				console.log('Failed!');
				btn.html("Error").prop("disabled", false);
			}
		},
		error: function (error) {
			console.error("ERROR: ", error);
		},
		cache: false,
		processData: false,
		contentType: false,
	});
});
