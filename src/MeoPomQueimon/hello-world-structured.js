
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var texture = new THREE.TextureLoader().load( './padilha.webp' );
var geometry = new THREE.PlaneBufferGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {map: texture} );
var padilha = new THREE.Mesh( geometry, material );

camera.position.z = 5;

var sentidox = 1;
var sentidoy = 1;
var timerPadilha = 0;
var sentidoPadilha = 1;

var animate = function() {
    requestAnimationFrame(animate);

    timerPadilha += 0.01 * sentidoPadilha;

    if(timerPadilha >= 1){
        scene.remove(padilha); 
        sentidoPadilha *=-1;
    }
    if(timerPadilha <= 0){
        scene.add(padilha)
        sentidoPadilha *=-1;
    }


    if(padilha.position.y >=3){
        sentidoy *=-1;
        padilha.position.y += 0.01*sentidoy;
    }
    if(padilha.position.x >=3){
        sentidox *=-1;
        padilha.position.x += 0.01*sentidox;
    }
    if(padilha.position.x <=-3){
        sentidox *=-1;
        padilha.position.x += 0.01*sentidox;
    }
    if(padilha.position.y <=-3){
        sentidoy *=-1;
        padilha.position.y += 0.01*sentidoy;
    }
        padilha.position.x += 0.01 * sentidox;
        padilha.position.y += 0.01 * sentidoy;
    renderer.render(scene, camera);
};


animate();

function onKeyDown(event) {
    var keyCode = event.which;
    var speed = 0.1;

    console.log('keyCode', keyCode);

    if (keyCode == 87) {
        padilha.position.y += speed;
    } else if (keyCode == 83) {
        padilha.position.y -= speed;
    } else if (keyCode == 65) {
        padilha.position.x -= speed;
    } else if (keyCode == 68) {
        padilha.position.x += speed;
    } else if (keyCode == 32) {
        padilha.position.set(0, 0, 0);
    }
};

document.addEventListener("keydown", onKeyDown, false);
