var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light = new THREE.PointLight( 0xffffff, 1, 100, 1 );
light.position.set( 0, 10, -10 );
scene.add( light );
light.castShadow = true;

var padilhaTexture = new THREE.TextureLoader().load( './padilha.webp' );
var padilhaGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var padilhaMaterial = new THREE.MeshBasicMaterial( {map: padilhaTexture} );
var padilha = new THREE.Mesh( padilhaGeometry, padilhaMaterial );
padilha.receiveShadow = true;


var marcoTexture = new THREE.TextureLoader().load( './marco.jpg' );
var marcoGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var marcoMaterial = new THREE.MeshBasicMaterial( {map: marcoTexture} );
var marco = new THREE.Mesh( marcoGeometry, marcoMaterial );
marco.receiveShadow = true;

// var ground = new THREE.Mesh (new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./ground.jfif')}));
var ground = new THREE.Mesh (new THREE.PlaneBufferGeometry(2000, 2000), 
                             new THREE.MeshPhongMaterial({color:0xff00ff, 
                             depthWrite: true}));
ground.rotation.x = - Math.PI / 2;
ground.position.y = -3.5;
ground.receiveShadow = true;
scene.add(ground)

var grid = new THREE.GridHelper (2000, 3500, 0x000000, 0x000000);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);


camera.position.z = 10;
camera.rotation.x = - (Math.PI / 8);
camera.position.y = 4;

var sentidoXpadilha = 1;
var sentidoYpadilha = 1;
var sentidoZpadilha = 1;
var timerPadilha = 0;
var sentidoPadilha = 1;

var sentidoMarco = 1;
var sentidoXmarco = 1;
var sentidoYmarco = 1;
var sentidoZmarco = 1;

var animate = function() {
    requestAnimationFrame(animate);
    animatePadilha();
    animateMarco();
    // colisions();
    renderer.render(scene, camera);
};

// colisions = function(){
//     if(marco.position.x == padilha.position.x || 
//        marco.position.y == padilha.position.y ||
//        marco.position.z == padilha.position.z ){
//         sentidoXmarco *= -1;        
//         sentidoYmarco *= -1;        
//         sentidoZmarco *= -1;        
//     }
// }


animateMarco = function(){
    velMarco = 0.05;
    scene.add(marco)
    if(marco.position.y >=3){
        sentidoYmarco *=-1;
        marco.position.y += 0.01*sentidoYmarco;
    }
    if(marco.position.x >=3){
        sentidoXmarco *=-1;
        marco.position.x += 0.01*sentidoXmarco;
    }
    if(marco.position.x <=-3){
        sentidoXmarco *=-1;
        marco.position.x += 0.01*sentidoXmarco;
    }
    if(marco.position.y <=-3){
        sentidoYmarco *=-1;
        marco.position.y += 0.01*sentidoYmarco;
    }
    if(marco.position.z <=-3){
        sentidoZmarco *=-1;
        marco.position.z += 0.01*sentidoXmarco;
    }
    if(marco.position.z >= 3){
        sentidoZmarco *=-1;
        marco.position.z += 0.01*sentidoYmarco;
    }
    marco.position.x += (velMarco+0.05) * sentidoXmarco;
    marco.position.y += velMarco * sentidoYmarco;
    marco.position.z += velMarco * sentidoZmarco;

}

animatePadilha = function(){
    velPadilha = 0.05;
    timerPadilha += 0.1 * sentidoPadilha;
    if(timerPadilha >= 1){
        // scene.remove(padilha); 
        sentidoPadilha *=-1;
    }
    if(timerPadilha <= 0){
        scene.add(padilha)
        sentidoPadilha *=-1;
    }
    if(padilha.position.y >=3){
        sentidoYpadilha *=-1;
        padilha.position.y += 0.01*sentidoYpadilha;
    }

    if(padilha.position.x >=3){
        sentidoXpadilha *=-1;
        padilha.position.x += 0.01*sentidoXpadilha;
    }
    if(padilha.position.x <=-3){
        sentidoXpadilha *=-1;
        padilha.position.x += 0.01*sentidoXpadilha;
    }
    if(padilha.position.y <=-3){
        sentidoYpadilha *=-1;
        padilha.position.y += 0.01*sentidoYpadilha;
    }
    if(padilha.position.z <=-3){
        sentidoZpadilha *=-1;
        padilha.position.z += 0.01*sentidoXpadilha;
    }
    if(padilha.position.z >= 3){
        sentidoZpadilha *=-1;
        padilha.position.z += 0.01*sentidoYpadilha;
    }
        padilha.position.x += velPadilha * sentidoXpadilha;
        padilha.position.y += velPadilha * sentidoYpadilha;
        padilha.position.z += velPadilha * sentidoZpadilha;
 
}
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
    else if (keyCode == 81) {
        padilha.position.z -= speed;
    }
    else if (keyCode == 69) {
        padilha.position.z += speed;
    }

};
document.addEventListener("keydown", onKeyDown, false);