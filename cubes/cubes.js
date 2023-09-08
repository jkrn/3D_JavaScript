// Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'

// Scene
const scene = new THREE.Scene();

// Axes Helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 5, 5);
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
var light  = new THREE.PointLight(0xffffff, 4, 0, 1);
light.position.set( 0.75, 3, 3 );
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
	render();
}

// Texture
const texture = new THREE.TextureLoader().load('texture.png');

// Set up scene
const cube_size = 1;
const num_cubes_x = 4;
const num_cubes_z = 4;

var yArray = [
[0.4, 0.5, 0.5, 1.2], 
[0.2, 0.3, 0.9, 1.1],
[0.3, 0.4, 0.8, 1.0],
[0.6, 0.5, 0.7, 0.9]
];

const geometry = new THREE.BoxGeometry( cube_size, cube_size, cube_size );
const materials = [];
const meshes = [];

var i = 0;
for (let x = 0; x < num_cubes_x; x++) {
	for (let z = 0; z < num_cubes_z; z++) {
		materials[i] = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		materials[i].map = texture;
		var current_mesh = new THREE.Mesh( geometry, materials[i] );
		var scale_y = yArray[z][x];
		current_mesh.scale.set(1,scale_y,1);
		current_mesh.position.set(x*cube_size + 0.5*cube_size, 0.5*scale_y*cube_size, z*cube_size + 0.5*cube_size );
		meshes[i] = current_mesh;
		scene.add( meshes[i] );
		i++;
	}
}

// Animate Function
function animate() {
	requestAnimationFrame( animate );
	meshes.forEach((m) => {
		m.rotation.x += 0.00;
	});
	renderer.render( scene, camera );
	stats.update();
}
animate();