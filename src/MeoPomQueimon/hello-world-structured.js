var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls( camera, renderer.domElement );
var light = new THREE.PointLight( 0xffffff, 1, 100, 1 );
light.position.set( 0, 10, -10 );
scene.add( light );
light.castShadow = true;

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
grid.position.y = -3.5;
scene.add(grid);


camera.position.z = 10;
camera.rotation.x = - (Math.PI / 8);
camera.position.y = 4;



var sentido = [x = 1, y = 1, z = 1];
var cubes = [
    {nome: "Padilha", type: 0, diameter: 1, state: 1, geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1], timerPadilha: 0, sentidoPadilha: 1},
    {nome: "Marco", type: 0, diameter: 1, state: 1, geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Edson", type: 0, diameter: 1, state: 1, geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Caimi", type: 0, diameter: 1, state: 1, geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Braulio", type: 0, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Bins", type: 0, diameter: 1,state: 1, geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Denio", type: 0, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Emilio", type: 0, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Grazi", type: 0, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Guilherme", type: 0, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Neri", type: 0, diameter: 1, state: 1, geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Fernando", type: 0, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Cleisson", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Luandro", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Marcio", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Nicolas", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Vinicius", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Negrão", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Vitor", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "TodesCattle", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Philipe", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Otávio", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Rifam", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Rodrigo", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},
    {nome: "Willian", type: 1, diameter: 1,state: 1,geometry: new THREE.BoxGeometry(1, 1, 1), cube: null, sentido: [1,1,1]},

];
var aliveTeatchers = 0;
var aliveStudents = 0;

for(var i = 0; i < cubes.length; i++){
    if(cubes[i].type == 0)
        aliveTeatchers++;
    else aliveStudents++;
}

var maxX = 5; 
var maxY = 5;
var maxZ = 5;
var minX = -5;
var minY = -5;
var minZ = -5;


var textures = [
    'img/padilha.webp',
    'img/marco1.webp',
    'img/edson.webp',
    'img/caimi.webp',
    'img/braulio.webp',
    'img/bins1.webp',
    'img/denio4.webp',
    'img/emilio.webp',
    'img/grazi.webp',
    'img/guilherme.webp',
    'img/neri.webp',
    'img/fernando5.webp',
    'img/cleisson1.webp',
    'img/luandro.webp',
    'img/marcio.webp',
    'img/nicolas5.webp',
    'img/vini.webp',
    'img/negrao.webp',
    'img/vitao.webp',
    'img/todescato.webp',
    'img/philipe.webp',
    'img/otavio.webp',
    'img/rifam.webp',
    'img/rodrigo.webp',
    'img/willian.webp'
];

for(var i = 0; i < cubes.length; i++) {
    var imagem = new THREE.TextureLoader().load(textures[i]);
    var material = new THREE.MeshBasicMaterial( {map: imagem} );
    var cube = new THREE.Mesh(cubes[i].geometry, material);
        cube.position.x = Math.floor(Math.random() * 9)-3; 
        cube.position.y = Math.floor(Math.random() * 6)-3; 
        cube.position.z = Math.floor(Math.random() * 6)-3; 
    cubes[i].cube = cube;
    scene.add(cube);
    cubes[i].cube.receiveShadow = true;
    cubes[i].cube.castShadow = true;
}

var animate = function() {
    requestAnimationFrame(animate);
    
    animatecubes();

    animatePadilha();
    controls.update();

    renderer.render(scene, camera);
};

animatecubes = function(){
    for(var i = 0; i < cubes.length; i++) {
        // cubes[i].cube.position.x += (0.01 * ((i+1)/10)) * cubes[i].sentido[0];
        // cubes[i].cube.position.y += (0.01 * ((i+1)/10)) * cubes[i].sentido[1];
        // cubes[i].cube.position.z += (0.01 * ((i+1)/10)) * cubes[i].sentido[2];
        cubes[i].cube.position.x += (0.01) * cubes[i].sentido[0];
        cubes[i].cube.position.y += (0.01) * cubes[i].sentido[1];
        cubes[i].cube.position.z += (0.01) * cubes[i].sentido[2];
        if(cubes[i].cube.position.x >= maxX){
            cubes[i].sentido[0] *= -1;
            cubes[i].cube.position.x += 0.01 * cubes[i].sentido[0];
        }
        if(cubes[i].cube.position.z >= maxZ){
            cubes[i].sentido[2] *= -1;
            cubes[i].cube.position.x += 0.01 * cubes[i].sentido[2];
        }
        if(cubes[i].cube.position.y >= maxY){
            cubes[i].sentido[1] *= -1;
            cubes[i].cube.position.x += 0.01 * cubes[i].sentido[1];
        }
        if(cubes[i].cube.position.x <= minX){
            cubes[i].sentido[0] *= -1;
            cubes[i].cube.position.x += 0.01 * cubes[i].sentido[0];
        }
        if(cubes[i].cube.position.z <= minZ){
            cubes[i].sentido[2] *= -1;
            cubes[i].cube.position.x += 0.01 * cubes[i].sentido[2];
        }
        if(cubes[i].cube.position.y <= minY){
            cubes[i].sentido[1] *= -1;
            cubes[i].cube.position.x += 0.01 * cubes[i].sentido[1];
        }
        if(maxX >= 1){
            maxX -=0.00001;
            maxY -=0.00001;
            maxZ -=0.00001;
            minX +=0.00001;
            minY +=0.00001;
            minZ +=0.00001;
        }
        for(var j = 0; j < cubes.length; j++){ // FOR COLLISIONS */-/* PARA COLISÕES
            if(i != j){
                var distance = Math.sqrt(((cubes[j].cube.position.x-cubes[i].cube.position.x)**2) + 
                                         ((cubes[j].cube.position.y-cubes[i].cube.position.y)**2) + 
                                         ((cubes[j].cube.position.z-cubes[i].cube.position.z)**2));
                if(cubes[i].state == 1 && cubes[j].state == 1){
                    if(distance <= (cubes[j].diameter/2 + cubes[i].diameter/2 )){ // Se colidiu
                        // console.log('Hit', i, ' + ', j);
                        cubes[i].sentido[0]*=-1;
                        cubes[i].sentido[1]*=-1;
                        cubes[i].sentido[2]*=-1;
                        cubes[j].sentido[0]*=-1;
                        cubes[j].sentido[1]*=-1;
                        cubes[j].sentido[2]*=-1;
                        cubes[i].cube.position.x += 0.01 * cubes[i].sentido[0];
                        cubes[i].cube.position.y += 0.01 * cubes[i].sentido[1];
                        cubes[i].cube.position.z += 0.01 * cubes[i].sentido[2];

                        cubes[j].cube.position.x += 0.01 * cubes[j].sentido[0];
                        cubes[j].cube.position.y += 0.01 * cubes[j].sentido[1];
                        cubes[j].cube.position.z += 0.01 * cubes[j].sentido[2];


                        if((cubes[i].type == 1 && cubes[j].type == 0) || (cubes[i].type == 0 && cubes[j].type == 1 )){
                            if(cubes[i].type == 1 ){
                                console.log( cubes[i].nome ,' está reprovado com o ', cubes[j].nome);
                                scene.remove(cubes[i].cube);
                                scene.remove(cubes[j].cube); 
                                cubes[i].state = 0;
                                cubes[j].state = 0;
                                aliveStudents--;
                                aliveTeatchers--;
                                if(aliveStudents == 1){
                                    for(var k = 0; k<cubes.length;k++){
                                        if(cubes[k].state == 1)
                                            console.log(cubes[k].nome, ' se formou na faculdade');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    }
}

animatePadilha = function(){
    cubes[0].timerPadilha += 0.005 * cubes[0].sentidoPadilha;
    if( cubes[0].timerPadilha >= 1){
        scene.remove(cubes[0].cube); 
        cubes[0].sentidoPadilha *=-1;
    }
    if(cubes[0].timerPadilha <= 0){
        scene.add(cubes[0].cube)
        cubes[0].sentidoPadilha *=-1;
    }
}

animate();
var select = 0;
function onKeyDown(event) {
    var keyCode = event.which;
    var speed = 0.1;
    for(var i = 0; i < cubes.length; i++) {
        console.log('keyCode', keyCode);
        if(keyCode >= 48 && keyCode <= 57){
            select = keyCode - 48;
        }
        if (keyCode == 87) {
            cubes[select].cube.position.y += speed;
        } else if (keyCode == 83) {
            cubes[select].cube.position.y -= speed;
        } else if (keyCode == 65) {
            cubes[select].cube.position.x -= speed;
        } else if (keyCode == 68) {
            cubes[select].cube.position.x += speed;
        } else if (keyCode == 81) {
            cubes[select].cube.position.z -= speed;
        } else if (keyCode == 69) {
            cubes[select].cube.position.z += speed;
        } else if (keyCode == 32) {
            cubes[select].cube.position.set(0, 0, 0);
        }
        console.log('Key: ', select);
    }
};
document.addEventListener("keydown", onKeyDown, false);