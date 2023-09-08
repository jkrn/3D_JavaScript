// Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// Variables
var plane_size_x = 20;
var plane_size_y = 20;
var grid_size_x = 20;
var grid_size_y = 20;

// Scene
const scene = new THREE.Scene();

// load obj file
const loader = new OBJLoader();
loader.load( 'mesh.obj', (object) => { scene.add(object) } );

// Axes Helper
const axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0.5, 0.5, 0.5);
camera.lookAt(0, 0, 0);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xeeeeee, 1);
document.body.appendChild( renderer.domElement );

// Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Light
var light  = new THREE.PointLight(0xffffff, 7, 0, 0.5);
light.position.set( 0.5*plane_size_x, 18, 0.5*plane_size_y );
scene.add( light );

// Light Helper
//var pointLightHelper = new THREE.PointLightHelper( light, 4 );
//scene.add( pointLightHelper );

// Resize Window Function
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// Text positions
const matrices = [];
matrices[0] = new THREE.Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
matrices[1] = new THREE.Matrix4(1, 0, 0, 10, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
matrices[2] = new THREE.Matrix4(1, 0, 0, 20, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
matrices[3] = new THREE.Matrix4(1, 0, 0, 0, 0, 1, 0, 10, 0, 0, 1, 0, 0, 0, 0, 1);
matrices[4] = new THREE.Matrix4(1, 0, 0, 0, 0, 1, 0, 20, 0, 0, 1, 0, 0, 0, 0, 1);
matrices[5] = new THREE.Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 10, 0, 0, 0, 1);
matrices[6] = new THREE.Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 20, 0, 0, 0, 1);
const texts = [];
texts[0] = document.getElementById('text_0_0_0');
texts[1] = document.getElementById('text_1_0_0');
texts[2] = document.getElementById('text_2_0_0');
texts[3] = document.getElementById('text_0_1_0');
texts[4] = document.getElementById('text_0_2_0');
texts[5] = document.getElementById('text_0_0_1');
texts[6] = document.getElementById('text_0_0_2');
const canvas = document.querySelector('canvas');

// Animate Function
function animate() {
	for(let i=0; i<7; i++){
		var boxPosition = new THREE.Vector3();
		boxPosition.setFromMatrixPosition(matrices[i]);
		boxPosition.project(camera);
		var widthHalf = canvas.width / 2;
		var heightHalf = canvas.height / 2;
		boxPosition.x = (boxPosition.x * widthHalf)+widthHalf;
		boxPosition.y = - (boxPosition.y * heightHalf)+heightHalf;
		texts[i].style.top = boxPosition.y+'px';
		texts[i].style.left = boxPosition.x+'px';
	}
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	stats.update();
}
animate();