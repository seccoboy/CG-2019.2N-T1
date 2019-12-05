var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light = new THREE.PointLight( 0xffffff, 1, 100, 1 );
light.position.set( 0, 10, -10 );
scene.add( light );
light.castShadow = true;

// var padilhaTexture = new THREE.TextureLoader().load( './padilha.webp' );
// var padilhaGeometry = new THREE.BoxGeometry( 1, 1, 1 );
// var padilhaMaterial = new THREE.MeshBasicMaterial( {map: padilhaTexture} );
// var padilha = new THREE.Mesh( padilhaGeometry, padilhaMaterial );
// padilha.receiveShadow = true;


// var marcoTexture = new THREE.TextureLoader().load( './marco.jpg' );
// var marcoGeometry = new THREE.BoxGeometry( 1, 1, 1 );
// var marcoMaterial = new THREE.MeshBasicMaterial( {map: marcoTexture} );
// var marco = new THREE.Mesh( marcoGeometry, marcoMaterial );
// marco.receiveShadow = true;

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


var sentido = [x = 1, y = 1, z = 1];
var profes = [
    {nome: "Padilha", geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido, timerPadilha: 0, sentidoPadilha: 1},
    {nome: "Marco", geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido},
    {nome: "Edson", geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido},

];
var textures = [
    './padilha.webp',
    './marco.jpg',
    './edson.webp'
];

for(var i = 0; i < profes.length; i++) {
    var imagem = new THREE.TextureLoader().load(textures[i]);
    var material = new THREE.MeshBasicMaterial( {map: imagem} );
    var cube = new THREE.Mesh(profes[i].geometry, material);
    cube.position.x = i * 2;
    profes[i].cube = cube;
    scene.add(cube);
}



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
    animateProfes();
    animatePadilha();
    renderer.render(scene, camera);
};

animateProfes = function(){
    for(var i = 0; i < profes.length; i++) {
        profes[i].cube.position.x += 0.01 * profes[i].sentido[0];
        profes[i].cube.position.y += 0.01 * profes[i].sentido[1];
        profes[i].cube.position.z += 0.01 * profes[i].sentido[2];
        if(profes[i].cube.position.x >= 3){
            profes[i].sentido[0] *= -1;
            profes[i].cube.position.x += 0.01 * profes[i].sentido[0];
        }
        if(profes[i].cube.position.z >= 3){
            profes[i].sentido[2] *= -1;
            profes[i].cube.position.x += 0.01 * profes[i].sentido[2];
        }
        if(profes[i].cube.position.y >= 3){
            profes[i].sentido[1] *= -1;
            profes[i].cube.position.x += 0.01 * profes[i].sentido[1];
        }
        if(profes[i].cube.position.x <= -3){
            profes[i].sentido[0] *= -1;
            profes[i].cube.position.x += 0.01 * profes[i].sentido[0];
        }
        if(profes[i].cube.position.z <= -3){
            profes[i].sentido[2] *= -1;
            profes[i].cube.position.x += 0.01 * profes[i].sentido[2];
        }
        if(profes[i].cube.position.y <= -3){
            profes[i].sentido[1] *= -1;
            profes[i].cube.position.x += 0.01 * profes[i].sentido[1];
        }
    }
}


animatePadilha = function(){
    profes[0].timerPadilha += 0.01 * profes[0].sentidoPadilha;
    if( profes[0].timerPadilha >= 1){
        scene.remove(profes[0].cube); 
        profes[0].sentidoPadilha *=-1;
    }
    if(profes[0].timerPadilha <= 0){
        scene.add(profes[0].cube)
        profes[0].sentidoPadilha *=-1;
    }
}

animate();
function onKeyDown(event) {
    var keyCode = event.which;
    var speed = 0.1;
    console.log('keyCode', keyCode);
    if (keyCode == 87) {
        // padilha.position.y += speed;
    } else if (keyCode == 83) {
        // padilha.position.y -= speed;
    } else if (keyCode == 65) {
        // padilha.position.x -= speed;
    } else if (keyCode == 68) {
        // padilha.position.x += speed;
    } else if (keyCode == 32) {
        // padilha.position.set(0, 0, 0);
    }
    else if (keyCode == 81) {
        // padilha.position.z -= speed;
    }
    else if (keyCode == 69) {
        // padilha.position.z += speed;
    }

};
document.addEventListener("keydown", onKeyDown, false);