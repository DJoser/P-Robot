THREE.Site = function Site() {
    //Rendering
    this.scene;
    this.camera;
    this.renderer;
    this.controls;

    //generate a ThreeJS Scene
    this.scene = new THREE.Scene();

    //get the width and height
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    //get the renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(WIDTH, HEIGHT);

    //append the rederer to the body
    document.body.appendChild(this.renderer.domElement);

    //create and add camera
    this.camera = new THREE.PerspectiveCamera(40, WIDTH / HEIGHT, 0.1, 20000);
    this.camera.position.set(0, 45, 0);
    this.scene.add(this.camera);

    var that = this;

    //update renderer size, aspect ratio and projection matrix on resize
    window.addEventListener('resize', function () {

        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;

        that.renderer.setSize(WIDTH, HEIGHT);

        that.camera.aspect = WIDTH / HEIGHT;
        that.camera.updateProjectionMatrix();

    });

    //background color of the scene
    this.renderer.setClearColor(0x000000, 1);

    //create a light and add it to the scene
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, 100);
    this.scene.add(light);

    //Add interation capability to the scene
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    // Helpers para ayudar a diseñar la escena
    var axisHelper = new THREE.AxisHelper(5);
    this.scene.add(axisHelper);

    var size = 100;
    var divisions = 100;

    var gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    //var helper = new THREE.CameraHelper( this.camera );
    //this.scene.add( helper );

    // instantiate a loader
    var loader = new THREE.ColladaLoader();

    loader.load(
        // resource URL
        'assets/models/skeleton/skelet.dae',
        // Function when resource is loaded
        function (collada) {
            this.scene.add(collada.scene);
        }.bind(this),
        // Function called when download progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        }
    );


    this.update = function () {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    };
}

