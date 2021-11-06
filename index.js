//import { functions } from './functions.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer()
let stats = new Stats()
const controls = new OrbitControls( camera, renderer.domElement );



function init() {
    document.getElementById('container').appendChild(renderer.domElement);
    document.getElementById('container').appendChild(stats.dom);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    camera.position.set( 0, 7, 12 );
    controls.update();

    // grid
    const gridHelper = new THREE.GridHelper( 1000, 20 );
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
}



function render() {
    init();
    renderer.render(scene, camera);
    stats.update();
}




function animate() {
    requestAnimationFrame(animate);
    render();
}
animate()