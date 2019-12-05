
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);



var light = new THREE.PointLight( 0xffffff, 2, 100, 1 );

light.position.set( 10, 10, 10 );

scene.add( light );

light.castShadow = true;





var padilhaTexture = new THREE.TextureLoader().load( './padilha.webp' );

var padilhaGeometry = new THREE.BoxGeometry( 1, 1, 1 );

var padilhaMaterial = new THREE.MeshBasicMaterial( {map: padilhaTexture} );

var padilha = new THREE.Mesh( padilhaGeometry, padilhaMaterial );

padilha.receiveShadow = true;



var ground = new THREE.Mesh (new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial ({color: 0x999900, depthWrite: false}));

ground.rotation.x = - Math.PI / 2;

ground.position.y = -1;

ground.receiveShadow = true;

scene.add(ground)



camera.position.z = 10;

camera.rotation.x = - (Math.PI / 8);

camera.position.y = 2;



var sentidox = 1;

var sentidoy = 1;

var sentidoz = 1;

var timerPadilha = 0;

var sentidoPadilha = 1;







var animate = function() {

    

    requestAnimationFrame(animate);

    animatePadilha();

    

    renderer.render(scene, camera);



};



animatePadilha = function(){

    timerPadilha += 0.01 * sentidoPadilha;



    if(timerPadilha >= 1){

        // scene.remove(padilha); 

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

    if(padilha.position.z <=-3){

        sentidoz *=-1;

        padilha.position.z += 0.01*sentidox;

    }

    if(padilha.position.z >= 3){

        sentidoz *=-1;

        padilha.position.z += 0.01*sentidoy;

    }

        padilha.position.x += 0.01 * sentidox;

        padilha.position.y += 0.01 * sentidoy;

        padilha.position.z += 0.01 * sentidoz;

  



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