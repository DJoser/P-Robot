THREE.Site = function Site() {
    //Rendering
    this.scene;
    this.camera;
    this.renderer;
    this.controls;
    this.material;

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
    //this.camera = new THREE.PerspectiveCamera(40, WIDTH / HEIGHT, 0.1, 20000);
    //this.camera.position.set(0, 45, 0);
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
    this.camera.position.z = 1000;
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
    //this.renderer.setClearColor(0x000000, 1);
    this.renderer.setClearColor( 0x000040 );

    //create a light and add it to the scene
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, 100);
    this.scene.add(light);

    //Add interation capability to the scene
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    var material = new THREE.SpriteMaterial( {
        map: new THREE.CanvasTexture( generateSprite() ),
        blending: THREE.AdditiveBlending
    } );

    for ( var i = 0; i < 1000; i++ ) {
        particle = new THREE.Sprite( material );
        initParticle( particle, i * 10 );
        this.scene.add( particle );
    }

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

    function initParticle(particle, delay ) {
        var particle = this instanceof THREE.Sprite ? this : particle;
        var delay = delay !== undefined ? delay : 0;
        particle.position.set( 0, 0, 0 );
        particle.scale.x = particle.scale.y = Math.random() * 32 + 16;
        new TWEEN.Tween( particle )
            .delay( delay )
            .to( {}, 10000 )
            .onComplete( initParticle )
            .start();
        new TWEEN.Tween( particle.position )
            .delay( delay )
            .to( { x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 2000 }, 10000 )
            .start();
        new TWEEN.Tween( particle.scale )
            .delay( delay )
            .to( { x: 0.01, y: 0.01 }, 10000 )
            .start();
    }

    function generateSprite() {
        var canvas = document.createElement( 'canvas' );
        canvas.width = 16;
        canvas.height = 16;
        var context = canvas.getContext( '2d' );
        var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
        gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
        gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
        gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
        gradient.addColorStop( 1, 'rgba(0,0,0,1)' );
        context.fillStyle = gradient;
        context.fillRect( 0, 0, canvas.width, canvas.height );
        return canvas;
    }
}

