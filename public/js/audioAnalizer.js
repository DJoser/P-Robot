THREE.AudioAnalizer = function AudioAnalizer(callback) {

    // callback
    this.callback = callback;
    //audio
    this.audioContext;
    this.javascriptNode;
    this.sourceBuffer;
    this.analyser;

    this.setupAudioProcessing = function () {
        //get the audio context
        this.audioContext = new AudioContext();

        //create the javascript node0
        this.javascriptNode = this.audioContext.createScriptProcessor(2048, 1, 1);
        this.javascriptNode.connect(this.audioContext.destination);

        //create the source buffer
        this.sourceBuffer = this.audioContext.createBufferSource();

        //create the analyser node
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.3;
        this.analyser.fftSize = 512;

        //connect source to analyser
        this.sourceBuffer.connect(this.analyser);

        //analyser to speakers
        this.analyser.connect(this.javascriptNode);

        //connect source to analyser
        this.sourceBuffer.connect(this.audioContext.destination);

        var that = this;

        //this is where we animates the bars
        this.javascriptNode.onaudioprocess = function () {

            // get the average for the first channel
            var array = new Uint8Array(that.analyser.frequencyBinCount);
            that.analyser.getByteFrequencyData(array);

            //render the scene and update controls
            this.callback(array);

            var step = Math.round(array.length / this.numberOfBars);

            //Iterate through the bars and scale the z axis
            for (var i = 0; i < this.numberOfBars; i++) {
                var value = array[i * step] / 4;
                value = value < 1 ? 1 : value;
                this.bars[i].scale.z = value;
            }
        }.bind(this);

    };

//get the default audio from the server
    this.getAudio = function () {
        var request = new XMLHttpRequest();
        request.open("GET", "assets/HOME - Dream Head.mp3", true);
        request.responseType = "arraybuffer";
        request.send();
        var that = this;
        request.onload = function () {
            that.start(request.response);
        }
    };

//start the audio processing
    this.startBuffer = function (buffer) {
        console.log(buffer);
        this.audioContext.decodeAudioData(buffer, decodeAudioDataSuccess, decodeAudioDataFailed);
        var that = this;

        function decodeAudioDataSuccess(decodedBuffer) {
            that.sourceBuffer.buffer = decodedBuffer
            that.sourceBuffer.start(0);
        }

        function decodeAudioDataFailed() {
            debugger
        }
    };

    this.startAudio = function (audio) {
        // Our <audio> element will be the audio source.
        var source = this.audioContext.createMediaElementSource(audio);
        source.connect(this.analyser);
        source.connect(this.audioContext.destination);
    };
}

