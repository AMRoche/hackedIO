var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 1000);
var cubes = [];
var renderer = new THREE.CanvasRenderer({
	canvas : utils.getById("imgCan")
});
utils.getById("targeting").style.display = "block";
var timestamp = new Date().getTime();
var vel = [0,0,0]; //x,y,z
var yaw, pitch, roll;
renderer.setSize(640, 360);
camera.useQuarternian = true;
console.log(timestamp);
document.body.appendChild(renderer.domElement);

cubes.push([new THREE.Mesh(new THREE.CubeGeometry(utils.cubeSize / 10, utils.cubeSize / 10, utils.cubeSize / 10), new THREE.MeshLambertMaterial({
	color : 0x00ff00
})), {
	x : utils.cubeSize,
	y : 0,
	z : 0
}]);
cubes.push([new THREE.Mesh(new THREE.CubeGeometry(utils.cubeSize / 10, utils.cubeSize / 10, utils.cubeSize / 10), new THREE.MeshLambertMaterial({
	color : 0xff00ff
})), {
	x : 0,
	y : 0,
	z : 0
}]);

cubes.push([new THREE.Mesh(new THREE.CubeGeometry(utils.cubeSize / 10, utils.cubeSize / 10, utils.cubeSize / 10), new THREE.MeshLambertMaterial({
	color : 0x0000ff
})), {
	x : utils.cubeSize,
	y : 0,
	z : utils.cubeSize
}]);
cubes.push([new THREE.Mesh(new THREE.CubeGeometry(utils.cubeSize / 10, utils.cubeSize / 10, utils.cubeSize / 10), new THREE.MeshLambertMaterial({
	color : 0xff0000
})), {
	x : 0,
	y : 0,
	z : utils.cubeSize
}]);

for (var i in cubes) {
	var zed = cubes[i][0];
	zed.position = cubes[i][1];
	scene.add(cubes[i][0]);
}
// create a point light
var pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position = {
	x : utils.cubeSize / 2,
	y : utils.cubeSize * 1.2,
	z : utils.cubeSize / 2
};

// add to the scene
scene.add(pointLight);

camera.position = {
	x : utils.cubeSize / 2,
	y : 0,
	z : utils.cubeSize / 2
};
function render() {
	parseVals();
	//checkVel();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

function parseVals() {
	pitch = parseInt(utils.getById("frontBackDegrees").innerHTML, 10);
	roll = parseInt(utils.getById("leftRightDegrees").innerHTML, 10);
	yaw = parseInt(utils.getById("clockwiseDegrees").innerHTML, 10);
	if (pitch < 0) {
		pitch = 360 + pitch
	}
	if (roll < 0) {
		roll = 360 + roll
	}
	if (yaw < 0) {
		yaw = 360 + yaw
	}
	
	camera.rotation.y = (360 - yaw) / 57.2957795;
	camera.rotation.z = (roll * -1) / 57.2957795;
} 
//window.setInterval(checkVel,250);

function checkVel(){
	vel = [parseInt(utils.getById("xVelocity").innerHTML,10)/(timestamp - new Date().getTime()),parseInt(utils.getById("yVelocity").innerHTML,10)/(timestamp - new Date().getTime()),parseInt(utils.getById("zVelocity").innerHTML/(timestamp - new Date().getTime()),10)];
	console.log(vel);
	console.log(camera.position.x);
	console.log(camera.position.y);
	console.log(camera.position.z);
	camera.position.x += vel[2];
	camera.position.y += vel[1];
	camera.position.z += vel[0];
	
	if(camera.position.x > utils.cubeSize || camera.position.x < 0){}
	if(camera.position.y > utils.cubeSize|| camera.position.x < 0){}
	if(camera.position.z > utils.cubeSize|| camera.position.x < 0){}
	
}
render(); 
document.addEventListener("keypress",
function(event) {
      if (event.which == 13 || event.keyCode == 13) {
           if(fire() == true){
           	console.log("BANG");	
           }
           else{
           	console.log("MISS");
          }
          return false;
       }
    return true;
});

function fire(){
	//grab the context from your destination canvas
//call its drawImage() function passing it the source canvas directly
var context = document.getElementById("imgCan").getContext('2d');
var imgd = context.getImageData(300, 160, 40, 40);
var pix = imgd.data;

var r = 0;
var g = 0;
var b = 0;
// Loop over each pixel and invert the color.
for (var i = 0, n = pix.length; i < n; i += 4) {
    r  +=  pix[i]; // red
    g  +=  pix[i+1]; // green
    b  +=  pix[i+2]; // blue
    // i+3 is alpha (the fourth element)
}
r = r/(pix.length/4);
g = g/(pix.length/4);
b = b/(pix.length/4);
console.log(r+","+g+","+b);
var colours = [[0,80,0],[80,0,80],[0,0,80],[80,0,0]];
for(var i in colours){
	var diff =	Math.pow((r-colours[i][0]),2) +Math.pow((g-colours[i][1]),2)+Math.pow((b-colours[i][2]),2)
	if((Math.sqrt(diff))< 20){
		scene.remove(cubes[i][0]);
		window.setTimeout(function(){
		var zed = cubes[i][0];
	zed.position = cubes[i][1];
	scene.add(cubes[i][0]);
		},10000);
		return true;
	}
}
}


