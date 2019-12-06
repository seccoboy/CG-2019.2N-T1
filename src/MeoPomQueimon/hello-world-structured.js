var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light = new THREE.PointLight( 0xffffff, 1, 100, 1 );
light.position.set( 0, 10, -10 );
scene.add( light );
light.castShadow = true;

// var testCube = new THREE.Mesh( 
//         new THREE.BoxGeometry(9,9,9),
//         new THREE.MeshBasicMaterial({color:0x00ffff, depthWrite: true}));
// scene.add(testCube);
// var testCube;




var ground = new THREE.Mesh (new THREE.PlaneBufferGeometry(2000, 2000), 
                             new THREE.MeshPhongMaterial({color:0xff00ff, 
                             depthWrite: false}));
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
    {nome: "Padilha", geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1], timerPadilha: 0, sentidoPadilha: 1},
    {nome: "Marco", geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Edson", geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Caimi", geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},

];
var textures = [
    './padilha.webp',
    './marco.jpg',
    './edson.webp',
    './caimi.webp',
    './caimi1.webp',
    './caimi2webp',
    './caimi3webp'
];

for(var i = 0; i < profes.length; i++) {
    var imagem = new THREE.TextureLoader().load(textures[i]);
    var material = new THREE.MeshBasicMaterial( {map: imagem} );
    var cube = new THREE.Mesh(profes[i].geometry, material);
    cube.position.x = i * 2;
    profes[i].cube = cube;
    scene.add(cube);
    profes[i].cube.receiveShadow = true;
}

var animate = function() {
    requestAnimationFrame(animate);
    
    animateProfes();
    animatePadilha();

    renderer.render(scene, camera);
};

animateProfes = function(){
    for(var i = 0; i < profes.length; i++) {
        profes[i].cube.position.x += (0.01 * ((i+1)/10)) * profes[i].sentido[0];
        profes[i].cube.position.y += (0.01 * ((i+1)/10)) * profes[i].sentido[1];
        profes[i].cube.position.z += (0.01 * ((i+1)/10)) * profes[i].sentido[2];
       
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
    for(var i = 0; i < profes.length; i++) {
        console.log('keyCode', keyCode);
        if (keyCode == 87) {
            profes[i].cube.position.y += speed;
        } else if (keyCode == 83) {
            profes[i].cube.position.y -= speed;
        } else if (keyCode == 65) {
            profes[i].cube.position.x -= speed;
        } else if (keyCode == 68) {
            profes[i].cube.position.x += speed;
        } else if (keyCode == 81) {
            profes[i].cube.position.z -= speed;
        } else if (keyCode == 69) {
            profes[i].cube.position.z += speed;
        } else if (keyCode == 32) {
            profes[i].cube.position.set(0, 0, 0);
        }
    }
};
document.addEventListener("keydown", onKeyDown, false);