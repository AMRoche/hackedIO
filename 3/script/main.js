var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 1000);
var cubes = [];
var renderer = new THREE.WebGLRenderer();
renderer.setSize(646, 366);

document.body.appendChild(renderer.domElement);
cubes.push([new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
	color : 0xff0000
})), {
	x : 0,
	y : 0,
	z : 0
}]);
cubes.push([new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
	color : 0x00ff00
})), {
	x : utils.cubeSize,
	y : utils.cubeSize,
	z : 0
}]);
cubes.push([new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
	color : 0x0000ff
})), {
	x : utils.cubeSize,
	y : 0,
	z : 0
}]);
cubes.push([new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
	color : 0xff00ff
})), {
	x : 0,
	y : utils.cubeSize,
	z : 0
}]);

cubes.push([new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
	color : 0xff0000
})), {
	x : 0,
	y : 0,
	z : utils.cubeSize
}]);
cubes.push([new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
	color : 0x00ff00
})), {
	x : utils.cubeSize,
	y : utils.cubeSize,
	z : utils.cubeSize
}]);
cubes.push([new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
	color : 0x0000ff
})), {
	x : utils.cubeSize,
	y : 0,
	z : utils.cubeSize
}]);
cubes.push([new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
	color : 0xff00ff
})), {
	x : 0,
	y : utils.cubeSize,
	z : utils.cubeSize
}]);

for (var i in cubes) {
	var zed = cubes[i][0];
	zed.position = cubes[i][1];
	scene.add(cubes[i][0]);
}
// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position = {x:utils.cubeSize/2,y:utils.cubeSize*1.2,z:utils.cubeSize/2};

// add to the scene
scene.add(pointLight);

camera.position = {
	x : 0,
	y : 0,
	z : 20
};
console.log(scene);
function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
document.onkeydown = checkKeycode
function checkKeycode(e) {
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
if(keycode == 40){//down
camera.position.y += 0.7;
}
if(keycode == 37){//left
camera.rotation.y += 0.01;
}
if(keycode == 39){//right
camera.rotation.y -= 0.01;
}
if(keycode == 38){//up
camera.position.y -= 0.7;
}
}
render(); 