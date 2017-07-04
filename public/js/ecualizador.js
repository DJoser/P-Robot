function Ecualizador(scene,numberOfBars = 60 ) {
    //constants
    this.numberOfBars = numberOfBars;

    //bars
    this.bars = new Array();

    //iterate and create bars
    for (var i = 0; i < this.numberOfBars; i++) {

        //create a bar
        var barGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

        //create a material
        var material = new THREE.MeshBasicMaterial({
            color: THREE.getRandomColor()
        });

        //create the geometry and set the initial position
        this.bars[i] = new THREE.Mesh(barGeometry, material);
        this.bars[i].position.set(i - this.numberOfBars/2, 0, 0);

        //add the created bar to the scene
        scene.add(this.bars[i]);
    }

    this.audioProcessing = function (array) {
        var step = Math.round(array.length / this.numberOfBars);

        //Iterate through the bars and scale the z axis
        for (var i = 0; i < this.numberOfBars; i++) {
            var value = array[i * step] / 4;
            value = value < 1 ? 1 : value;
            this.bars[i].scale.z = value;
        }
    };


}



