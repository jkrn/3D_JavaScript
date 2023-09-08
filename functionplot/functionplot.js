// Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'

// Variables
var plane_size_x = 20;
var plane_size_y = 20;
var grid_size_x = 20;
var grid_size_y = 20;

// Plane values
var y_values = [[6.83544517e+00, 5.71687174e+00, 4.47860631e+00, 3.28424573e+00,
        2.25209793e+00, 1.44456051e+00, 8.71620405e-01, 5.04664976e-01,
        2.95260643e-01, 1.93788261e-01, 1.64302901e-01, 1.93788261e-01,
        2.95260643e-01, 5.04664976e-01, 8.71620405e-01, 1.44456051e+00,
        2.25209793e+00, 3.28424573e+00, 4.47860631e+00, 5.71687174e+00,
        6.83544517e+00],
       [5.71687174e+00, 4.32275165e+00, 2.96244971e+00, 1.80018727e+00,
        9.30189098e-01, 3.73238395e-01, 8.95854461e-02, 1.92525827e-03,
        2.10419211e-02, 6.80318023e-02, 8.98795293e-02, 6.80318023e-02,
        2.10419211e-02, 1.92525827e-03, 8.95854461e-02, 3.73238395e-01,
        9.30189098e-01, 1.80018727e+00, 2.96244971e+00, 4.32275165e+00,
        5.71687174e+00],
       [4.47860631e+00, 2.96244971e+00, 1.65529523e+00, 7.04731258e-01,
        1.64302901e-01, 4.23491061e-05, 1.14888804e-01, 3.81653156e-01,
        6.74643283e-01, 8.92880978e-01, 9.72790019e-01, 8.92880978e-01,
        6.74643283e-01, 3.81653156e-01, 1.14888804e-01, 4.23491061e-05,
        1.64302901e-01, 7.04731258e-01, 1.65529523e+00, 2.96244971e+00,
        4.47860631e+00],
       [3.28424573e+00, 1.80018727e+00, 7.04731258e-01, 1.12150081e-01,
        2.10419211e-02, 3.33474800e-01, 8.92880978e-01, 1.52769277e+00,
        2.08769798e+00, 2.46467699e+00, 2.59686709e+00, 2.46467699e+00,
        2.08769798e+00, 1.52769277e+00, 8.92880978e-01, 3.33474800e-01,
        2.10419211e-02, 1.12150081e-01, 7.04731258e-01, 1.80018727e+00,
        3.28424573e+00],
       [2.25209793e+00, 9.30189098e-01, 1.64302901e-01, 2.10419211e-02,
        4.33270982e-01, 1.23409041e+00, 2.21003299e+00, 3.15634629e+00,
        3.91726587e+00, 4.40017499e+00, 4.56448003e+00, 4.40017499e+00,
        3.91726587e+00, 3.15634629e+00, 2.21003299e+00, 1.23409041e+00,
        4.33270982e-01, 2.10419211e-02, 1.64302901e-01, 9.30189098e-01,
        2.25209793e+00],
       [1.44456051e+00, 3.73238395e-01, 4.23491061e-05, 3.33474800e-01,
        1.23409041e+00, 2.46467699e+00, 3.76026589e+00, 4.89677913e+00,
        5.73629641e+00, 6.23236231e+00, 6.39388858e+00, 6.23236231e+00,
        5.73629641e+00, 4.89677913e+00, 3.76026589e+00, 2.46467699e+00,
        1.23409041e+00, 3.33474800e-01, 4.23491061e-05, 3.73238395e-01,
        1.44456051e+00],
       [8.71620405e-01, 8.95854461e-02, 1.14888804e-01, 8.92880978e-01,
        2.21003299e+00, 3.76026589e+00, 5.23228697e+00, 6.39388858e+00,
        7.14699653e+00, 7.52790634e+00, 7.63718971e+00, 7.52790634e+00,
        7.14699653e+00, 6.39388858e+00, 5.23228697e+00, 3.76026589e+00,
        2.21003299e+00, 8.92880978e-01, 1.14888804e-01, 8.95854461e-02,
        8.71620405e-01],
       [5.04664976e-01, 1.92525827e-03, 3.81653156e-01, 1.52769277e+00,
        3.15634629e+00, 4.89677913e+00, 6.39388858e+00, 7.40900203e+00,
        7.89285300e+00, 7.99978607e+00, 7.98997995e+00, 7.99978607e+00,
        7.89285300e+00, 7.40900203e+00, 6.39388858e+00, 4.89677913e+00,
        3.15634629e+00, 1.52769277e+00, 3.81653156e-01, 1.92525827e-03,
        5.04664976e-01],
       [2.95260643e-01, 2.10419211e-02, 6.74643283e-01, 2.08769798e+00,
        3.91726587e+00, 5.73629641e+00, 7.14699653e+00, 7.89285300e+00,
        7.95106378e+00, 7.59696859e+00, 7.36588394e+00, 7.59696859e+00,
        7.95106378e+00, 7.89285300e+00, 7.14699653e+00, 5.73629641e+00,
        3.91726587e+00, 2.08769798e+00, 6.74643283e-01, 2.10419211e-02,
        2.95260643e-01],
       [1.93788261e-01, 6.80318023e-02, 8.92880978e-01, 2.46467699e+00,
        4.40017499e+00, 6.23236231e+00, 7.52790634e+00, 7.99978607e+00,
        7.59696859e+00, 6.59854776e+00, 5.91770215e+00, 6.59854776e+00,
        7.59696859e+00, 7.99978607e+00, 7.52790634e+00, 6.23236231e+00,
        4.40017499e+00, 2.46467699e+00, 8.92880978e-01, 6.80318023e-02,
        1.93788261e-01],
       [1.64302901e-01, 8.98795293e-02, 9.72790019e-01, 2.59686709e+00,
        4.56448003e+00, 6.39388858e+00, 7.63718971e+00, 7.98997995e+00,
        7.36588394e+00, 5.91770215e+00, 4.00000000e+00, 5.91770215e+00,
        7.36588394e+00, 7.98997995e+00, 7.63718971e+00, 6.39388858e+00,
        4.56448003e+00, 2.59686709e+00, 9.72790019e-01, 8.98795293e-02,
        1.64302901e-01],
       [1.93788261e-01, 6.80318023e-02, 8.92880978e-01, 2.46467699e+00,
        4.40017499e+00, 6.23236231e+00, 7.52790634e+00, 7.99978607e+00,
        7.59696859e+00, 6.59854776e+00, 5.91770215e+00, 6.59854776e+00,
        7.59696859e+00, 7.99978607e+00, 7.52790634e+00, 6.23236231e+00,
        4.40017499e+00, 2.46467699e+00, 8.92880978e-01, 6.80318023e-02,
        1.93788261e-01],
       [2.95260643e-01, 2.10419211e-02, 6.74643283e-01, 2.08769798e+00,
        3.91726587e+00, 5.73629641e+00, 7.14699653e+00, 7.89285300e+00,
        7.95106378e+00, 7.59696859e+00, 7.36588394e+00, 7.59696859e+00,
        7.95106378e+00, 7.89285300e+00, 7.14699653e+00, 5.73629641e+00,
        3.91726587e+00, 2.08769798e+00, 6.74643283e-01, 2.10419211e-02,
        2.95260643e-01],
       [5.04664976e-01, 1.92525827e-03, 3.81653156e-01, 1.52769277e+00,
        3.15634629e+00, 4.89677913e+00, 6.39388858e+00, 7.40900203e+00,
        7.89285300e+00, 7.99978607e+00, 7.98997995e+00, 7.99978607e+00,
        7.89285300e+00, 7.40900203e+00, 6.39388858e+00, 4.89677913e+00,
        3.15634629e+00, 1.52769277e+00, 3.81653156e-01, 1.92525827e-03,
        5.04664976e-01],
       [8.71620405e-01, 8.95854461e-02, 1.14888804e-01, 8.92880978e-01,
        2.21003299e+00, 3.76026589e+00, 5.23228697e+00, 6.39388858e+00,
        7.14699653e+00, 7.52790634e+00, 7.63718971e+00, 7.52790634e+00,
        7.14699653e+00, 6.39388858e+00, 5.23228697e+00, 3.76026589e+00,
        2.21003299e+00, 8.92880978e-01, 1.14888804e-01, 8.95854461e-02,
        8.71620405e-01],
       [1.44456051e+00, 3.73238395e-01, 4.23491061e-05, 3.33474800e-01,
        1.23409041e+00, 2.46467699e+00, 3.76026589e+00, 4.89677913e+00,
        5.73629641e+00, 6.23236231e+00, 6.39388858e+00, 6.23236231e+00,
        5.73629641e+00, 4.89677913e+00, 3.76026589e+00, 2.46467699e+00,
        1.23409041e+00, 3.33474800e-01, 4.23491061e-05, 3.73238395e-01,
        1.44456051e+00],
       [2.25209793e+00, 9.30189098e-01, 1.64302901e-01, 2.10419211e-02,
        4.33270982e-01, 1.23409041e+00, 2.21003299e+00, 3.15634629e+00,
        3.91726587e+00, 4.40017499e+00, 4.56448003e+00, 4.40017499e+00,
        3.91726587e+00, 3.15634629e+00, 2.21003299e+00, 1.23409041e+00,
        4.33270982e-01, 2.10419211e-02, 1.64302901e-01, 9.30189098e-01,
        2.25209793e+00],
       [3.28424573e+00, 1.80018727e+00, 7.04731258e-01, 1.12150081e-01,
        2.10419211e-02, 3.33474800e-01, 8.92880978e-01, 1.52769277e+00,
        2.08769798e+00, 2.46467699e+00, 2.59686709e+00, 2.46467699e+00,
        2.08769798e+00, 1.52769277e+00, 8.92880978e-01, 3.33474800e-01,
        2.10419211e-02, 1.12150081e-01, 7.04731258e-01, 1.80018727e+00,
        3.28424573e+00],
       [4.47860631e+00, 2.96244971e+00, 1.65529523e+00, 7.04731258e-01,
        1.64302901e-01, 4.23491061e-05, 1.14888804e-01, 3.81653156e-01,
        6.74643283e-01, 8.92880978e-01, 9.72790019e-01, 8.92880978e-01,
        6.74643283e-01, 3.81653156e-01, 1.14888804e-01, 4.23491061e-05,
        1.64302901e-01, 7.04731258e-01, 1.65529523e+00, 2.96244971e+00,
        4.47860631e+00],
       [5.71687174e+00, 4.32275165e+00, 2.96244971e+00, 1.80018727e+00,
        9.30189098e-01, 3.73238395e-01, 8.95854461e-02, 1.92525827e-03,
        2.10419211e-02, 6.80318023e-02, 8.98795293e-02, 6.80318023e-02,
        2.10419211e-02, 1.92525827e-03, 8.95854461e-02, 3.73238395e-01,
        9.30189098e-01, 1.80018727e+00, 2.96244971e+00, 4.32275165e+00,
        5.71687174e+00],
       [6.83544517e+00, 5.71687174e+00, 4.47860631e+00, 3.28424573e+00,
        2.25209793e+00, 1.44456051e+00, 8.71620405e-01, 5.04664976e-01,
        2.95260643e-01, 1.93788261e-01, 1.64302901e-01, 1.93788261e-01,
        2.95260643e-01, 5.04664976e-01, 8.71620405e-01, 1.44456051e+00,
        2.25209793e+00, 3.28424573e+00, 4.47860631e+00, 5.71687174e+00,
        6.83544517e+00]];

// Scene
const scene = new THREE.Scene();

// Axes Helper
const axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(10, 20, 20);
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

// Set up scene
var geometry = new THREE.PlaneGeometry(plane_size_x,plane_size_y,grid_size_x,grid_size_y);
geometry.attributes.position.needsUpdate = true;
var positions = geometry.attributes.position.array;
const vertexcolors = [];
for (let i = 0; i < positions.length; i += 3) {
    var v = new THREE.Vector3(positions[i],positions[i + 1],positions[i + 2]);
	var index = i/3;
	var row = Math.floor(index / (grid_size_y+1) );
	var col = Math.floor(index % (grid_size_x+1));
	var data_value = y_values[grid_size_y-row][col];
	positions[i] = v.x;
    positions[i + 1] = v.y;
    positions[i + 2] = v.z - data_value;
	var vertexcolor = new THREE.Color();
	vertexcolor.setHSL(data_value/12.0, 1.0, 0.5);
    vertexcolors.push(vertexcolor.r, vertexcolor.g, vertexcolor.b);
}
geometry.setAttribute('color', new THREE.Float32BufferAttribute(vertexcolors, 3));
var wireframe = new THREE.WireframeGeometry(geometry);
var line = new THREE.LineSegments(wireframe);
line.material.depthTest = true;
line.material.opacity = 1;
line.material.transparent = true;
var material = new THREE.MeshLambertMaterial( { color: 0xffffff, vertexColors: true, side: THREE.DoubleSide , transparent: true, opacity: 0.5 } );
var mesh = new THREE.Mesh( geometry, material );
mesh.rotation.x = Math.PI / 2;
mesh.position.set(0.5*plane_size_x,0,0.5*plane_size_y);
mesh.add(line);
scene.add(mesh);

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