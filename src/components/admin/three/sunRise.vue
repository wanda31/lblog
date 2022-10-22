<template>
  <div id="content-wrap">
    <SideBar></SideBar>
    <div id="container" >

    </div>
    <!-- <div id="info">
    	<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - webgl ocean
    </div> -->

  </div>
</template>

<script>

  import * as THREE from 'three/build/three.module.js';

  import Stats from 'three/examples/jsm/libs/stats.module.js';

  import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { Water } from 'three/examples/jsm/objects/Water.js';
  import { Sky } from 'three/examples/jsm/objects/Sky.js';
  import SideBar from '../sideBar.vue'
 var container, stats;
 var camera, scene, renderer, light;
 var controls, water, sphere;

 // init();
 // animate();

 function init() {

 	container = document.getElementById( 'container' );

 	//

 	renderer = new THREE.WebGLRenderer();
 	renderer.setPixelRatio( window.devicePixelRatio );
 	renderer.setSize( window.innerWidth, window.innerHeight );
 	container.appendChild( renderer.domElement );

 	//

 	scene = new THREE.Scene();

 	//

 	camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
 	camera.position.set( 30, 30, 100 );

 	//

 	light = new THREE.DirectionalLight( 0xffffff, 0.8 );
 	scene.add( light );

 	// Water

 	var waterGeometry = new THREE.PlaneBufferGeometry( 10000, 10000 );
// 加载一个纹理，设置包装模式为重复。
var texture = new THREE.TextureLoader().load( "textures/water.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
 	water = new Water(
 		waterGeometry,
 		{
 			textureWidth: 512,
 			textureHeight: 512,
 			waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

 				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

 			} ),
 			alpha: 1.0,
 			sunDirection: light.position.clone().normalize(),
 			sunColor: 0xffffff,
 			waterColor: 0x001e0f,
 			distortionScale: 3.7,
 			fog: scene.fog !== undefined
 		}
 	);
console.log(water);
 	water.rotation.x = - Math.PI / 2;

 	scene.add( water );

 	// Skybox

 	var sky = new Sky();

 	var uniforms = sky.material.uniforms;

 	uniforms[ 'turbidity' ].value = 10;
 	uniforms[ 'rayleigh' ].value = 2;
 	uniforms[ 'luminance' ].value = 1;
 	uniforms[ 'mieCoefficient' ].value = 0.005;
 	uniforms[ 'mieDirectionalG' ].value = 0.8;

 	var parameters = {
 		distance: 400,
 		inclination: 0.49,
 		azimuth: 0.205
 	};
  // var cubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
  // console.log(cubeCamera);
  // 				cubeCamera.renderTarget.texture.generateMipmaps = true;
  // 				cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipmapLinearFilter;

  // 				scene.background = cubeCamera.renderTarget;

 	var cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 512, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
 	console.log(cubeRenderTarget);

  var cubeCamera = new THREE.CubeCamera( 0.1, 1, cubeRenderTarget );

 	scene.background = cubeRenderTarget;

 	function updateSun() {

 		var theta = Math.PI * ( parameters.inclination - 0.5 );
 		var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

 		light.position.x = parameters.distance * Math.cos( phi );
 		light.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
 		light.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

 		sky.material.uniforms[ 'sunPosition' ].value = light.position.copy( light.position );
 		water.material.uniforms[ 'sunDirection' ].value.copy( light.position ).normalize();

 		cubeCamera.update( renderer, sky );

 	}

 	updateSun();

 	//

 	var geometry = new THREE.IcosahedronBufferGeometry( 20, 1 );
 	var count = geometry.attributes.position.count;

 	var colors = [];
 	var color = new THREE.Color();

 	for ( var i = 0; i < count; i += 3 ) {

 		color.setHex( Math.random() * 0xffffff );

 		colors.push( color.r, color.g, color.b );
 		colors.push( color.r, color.g, color.b );
 		colors.push( color.r, color.g, color.b );

 	}

 	geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

 	var material = new THREE.MeshStandardMaterial( {
 		vertexColors: THREE.VertexColors,
 		roughness: 0.0,
 		flatShading: true,
 		envMap: cubeCamera.renderTarget.texture,
 		side: THREE.DoubleSide
 	} );

 	sphere = new THREE.Mesh( geometry, material );
 	scene.add( sphere );

 	//

 	controls = new OrbitControls( camera, renderer.domElement );
 	controls.maxPolarAngle = Math.PI * 0.495;
 	controls.target.set( 0, 10, 0 );
 	controls.minDistance = 40.0;
 	controls.maxDistance = 200.0;
 	controls.update();

 	//

 	stats = new Stats();
 	container.appendChild( stats.dom );

 	// GUI

 	// var gui = new GUI();

 	// var folder = gui.addFolder( 'Sky' );
 	// folder.add( parameters, 'inclination', 0, 0.5, 0.0001 ).onChange( updateSun );
 	// folder.add( parameters, 'azimuth', 0, 1, 0.0001 ).onChange( updateSun );
 	// folder.open();

 	// var uniforms1 = water.material.uniforms;

 	// var folder1 = gui.addFolder( 'Water' );
 	// folder1.add( uniforms1.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
 	// folder1.add( uniforms1.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
 	// folder1.add( uniforms1.alpha, 'value', 0.9, 1, .001 ).name( 'alpha' );

 	// folder1.open();

 	//

 	window.addEventListener( 'resize', onWindowResize, false );

 }

 function onWindowResize() {

 	camera.aspect = window.innerWidth / window.innerHeight;
 	camera.updateProjectionMatrix();

 	renderer.setSize( window.innerWidth, window.innerHeight );

 }

 function animate() {

 	requestAnimationFrame( animate );
 	render();
 	stats.update();

 }

 function render() {

 	var time = performance.now() * 0.001;

 	sphere.position.y = Math.sin( time ) * 20 + 5;
 	sphere.rotation.x = time * 0.5;
 	sphere.rotation.z = time * 0.51;

 	water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

 	renderer.render( scene, camera );

 }



export default {

  components: {
    THREE,Stats,GUI,OrbitControls,Water,Sky,SideBar
  },
  data() {
    return {
      // scene:null,//场景
      // camera:null,//相机
      // renderer:null,//渲染器
      // container:null,
      // water:null,
      // sky:null,
      // value:null

    }
  },
  mounted: function () {
    //console.log(esLocale);
     init();
     animate();
  },



}



</script>

<style scoped>
  body {
  	margin: 0;
  	background-color: #000;
  	color: #fff;
  	font-family: Monospace;
  	font-size: 13px;
  	line-height: 24px;
  	overscroll-behavior: none;
  }

  a {
  	color: #ff0;
  	text-decoration: none;
  }

  a:hover {
  	text-decoration: underline;
  }

  button {
  	cursor: pointer;
  	text-transform: uppercase;
  }

  canvas {
  	display: block;
  }

  #info {
  	position: absolute;
  	top: 0px;
  	width: 100%;
  	padding: 10px;
  	box-sizing: border-box;
  	text-align: center;
  	-moz-user-select: none;
  	-webkit-user-select: none;
  	-ms-user-select: none;
  	user-select: none;
  	pointer-events: none;
  	z-index: 1; /* TODO Solve this in HTML */
  }

  a, button, input, select {
  	pointer-events: auto;
  }

  .dg.ac {
  	-moz-user-select: none;
  	-webkit-user-select: none;
  	-ms-user-select: none;
  	user-select: none;
  	z-index: 2 !important; /* TODO Solve this in HTML */
  }

  #overlay {
  	position: absolute;
  	z-index: 2;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	background: rgba(0,0,0,0.7);
  }

  	#overlay button {
  		background: #ffffff;
  		border: 0;
  		color: #000000;
  		padding: 16px 20px;
  		text-transform: uppercase;
  		cursor: pointer;
  	}

  #notSupported {
  	width: 50%;
  	margin: auto;
  	background-color: #f00;
  	margin-top: 20px;
  	padding: 10px;
  }
</style>
