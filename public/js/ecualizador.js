function Ecualizador(scene,numberOfBars = 60 ) {
    //constants
    this.numberOfBars = numberOfBars;

    //bars
    this.bars = new Array();
    this.boxSize = 20;
    this.scene  = scene;

    this.audioProcessing = function (array) {
        /*var step = Math.round(array.length / this.numberOfBars);

        //Iterate through the bars and scale the z axis
        for (var i = 0; i < this.numberOfBars; i++) {
            var value = array[i * step] / 4;
            value = value < 1 ? 1 : value;
            this.bars[i].scale.y = value;
        }*/
    };

    this.initSphere = function() {
        var separation = 100, amountX = 50, amountY = 50,particles, particle;

        // particles
        var PI2 = Math.PI * 2;
        /*var material = new THREE.SpriteCanvasMaterial({
            color: 0xffffff,
            program: function (context) {
                context.beginPath();
                context.arc(0, 0, 0.5, 0, PI2, true);
                context.fill();
            }
        });*/
        var material = new THREE.MeshBasicMaterial({
            color: THREE.getRandomColor()
        });


        for (var i = 0; i < 1000; i++) {
            particle = new THREE.Sprite(material);
            particle.position.x = Math.random() * 2 - 1;
            particle.position.y = Math.random() * 2 - 1;
            particle.position.z = Math.random() * 2 - 1;
            particle.position.normalize();
            particle.position.multiplyScalar(Math.random() * 10 + 450);
            particle.scale.multiplyScalar(2);
            this.scene.add(particle);
        }
        // lines
        for (var i = 0; i < 300; i++) {
            var geometry = new THREE.Geometry();
            var vertex = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
            vertex.normalize();
            vertex.multiplyScalar(450);
            geometry.vertices.push(vertex);
            var vertex2 = vertex.clone();
            vertex2.multiplyScalar(Math.random() * 0.3 + 1);
            geometry.vertices.push(vertex2);
            var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xffffff, opacity: Math.random()}));
            this.scene.add(line);
        }
    }

    this.initCubes = function () {
        //iterate and create bars
        for (var i = 0; i < this.numberOfBars; i++) {


            //create a bar
            var barGeometry = new THREE.BoxGeometry(this.boxSize,this.boxSize,this.boxSize);

            //create a material
            var material = new THREE.MeshBasicMaterial({
                color: THREE.getRandomColor()
            });

            //create the geometry and set the initial position
            this.bars[i] = new THREE.Mesh(barGeometry, material);
            this.bars[i].position.set((i * this.boxSize) - ((this.numberOfBars * this.boxSize)/2), 0, 0);

            //add the created bar to the scene
            scene.add(this.bars[i]);
        }
    }


}



