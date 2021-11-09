//import { functions } from './functions.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

let functions = {
    randomMinMaxFloat : (min, max) => {
        let rand = Math.random() * (max - min) + min
        rand = Math.round(rand * 1e2) / 1e2
        return rand;
    },
    onWindowResize: (camera, renderer) => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      
        renderer.setSize( window.innerWidth, window.innerHeight )
    },
    onKeyDown: ( event ) => {

        switch ( event.code ) {
            case 'KeyD':
                player.right = true
            break;
            case 'KeyA':
                player.left = true
            break;
        }
    },
    onKeyUp: ( event ) => {

        switch ( event.code ) {
            case 'KeyD':
                player.right = false
            break;
            case 'KeyA':
                player.left = false
            break;
        }
    }
}

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer()
let stats = new Stats()
const controls = new OrbitControls( camera, renderer.domElement );
let player = {
    player:'',
    x: 0,
    y: 0.5,
    z: 0,
    left: false,
    right: false
};



function init() {
    document.getElementById('container').appendChild(renderer.domElement);
    document.getElementById('container').appendChild(stats.dom);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    camera.position.set( 0, 10, 20 );

    controls.update();

    

    // EVENTS

    document.addEventListener( 'keydown', functions.onKeyDown );
    document.addEventListener( 'keyup', functions.onKeyUp );

    // grid
    const gridHelper = new THREE.GridHelper( 1000, 200 );
    scene.add( gridHelper );


    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.6 );
    hemiLight.position.set( 0, 200, 0 );
    scene.add( hemiLight );
    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    dirLight.position.set( 0, 20, 10 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 18;
    dirLight.shadow.camera.bottom = - 10;
    dirLight.shadow.camera.left = - 12;
    dirLight.shadow.camera.right = 12;
    scene.add( dirLight );


    /*const geometryBox = new THREE.BoxGeometry(.1,.1,.1);
    const materialBox = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );

    let randI = functions.randomMinMaxFloat(1,5);

    let rrand;
    let masVertBlocks = [];
    let masHorBlocks = [];

    for (let i = -5; i<5; i+=0.1) {
        for (let j = 0; j<randI; j+=0.1) {
            const cube = new THREE.Mesh( geometryBox, materialBox );
            cube.position.x = i;
            cube.position.y = j;
            if (randI >= 1 & randI <=15) {
            rrand = functions.randomMinMaxFloat(randI-0.1,randI+0.1);
            }
            else if (randI > 15) {
            rrand = randI-0.1
            }
            else if (randI < 1) {
            rrand = randI+0.1
            }
            randI = rrand
            //console.log(randI)
            

            scene.add( cube );
        }
    
    }*/


    const geometryBox = new THREE.BoxGeometry(1,1,1);
    const materialBox = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );

    player.player = new THREE.Mesh( geometryBox, materialBox );
    player.player.position.set(player.x,player.y,player.z)

    scene.add(player.player)
    

}
init();

let movePlayer = (player) => {
    player.player.position.set(player.x,player.y,player.z)
    player.right == true ? player.x +=.1 : player.x = player.x
    player.left == true ? player.x -=.1 : player.x = player.x
}




function render() {
    renderer.render(scene, camera);
    stats.update();
    movePlayer(player)
    //console.log(controlsss)
}




function animate() {
    requestAnimationFrame(animate);
    render();
}
animate()