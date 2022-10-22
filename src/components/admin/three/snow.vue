<template>
  <div id="content-wrap">
    <SideBar></SideBar>
    <div id="info">

    </div>
    <div id="append" style="width: auto;z-index:10"></div>
  </div>

</template>

<script>
  import * as THREE from 'three/build/three.module.js';
  import Stats from 'three/examples/jsm/libs/stats.module.js';
  // import Detector from 'three/examples/jsm/libs/Detector.js'
  import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
  // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
  import SideBar from '../sideBar.vue'
  						var container, stats;
  						var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, color, sprite, size;
  						var mouseX = 0, mouseY = 0;

  						var windowHalfX = window.innerWidth / 2;
  						var windowHalfY = window.innerHeight / 2;

  						// init();
  						// animate();

  						function init() {

  							container = document.createElement( 'div' );

  							document.getElementById("append").appendChild( container );
                // document.getElementById("append").style.width="1000px";
                // document.getElementById("append").style.z-index=1

  							camera = new THREE.PerspectiveCamera( 75, window.innerWidth/2 / window.innerHeight/2, 1, 2000 );
  							camera.position.z = 10;

  							scene = new THREE.Scene();
  							scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );

  							geometry = new THREE.Geometry();

  							var textureLoader = new THREE.TextureLoader();

  							var sprite1 = textureLoader.load( "textures/sprites/snowflake1.png" );
  							var sprite2 = textureLoader.load( "textures/sprites/snowflake2.png" );
  							var sprite3 = textureLoader.load( "textures/sprites/snowflake3.png" );
  							var sprite4 = textureLoader.load( "textures/sprites/snowflake4.png" );
  							var sprite5 = textureLoader.load( "textures/sprites/snowflake5.png" );

  							for ( i = 0; i < 10000; i ++ ) {

  								var vertex = new THREE.Vector3();
  								vertex.x = Math.random() * 2000 - 1000;
  								vertex.y = Math.random() * 2000 - 1000;
  								vertex.z = Math.random() * 2000 - 1000;

  								geometry.vertices.push( vertex );

  							}

  							parameters = [
  								[ [1.0, 0.2, 0.5], sprite2, 20 ],
  								[ [0.95, 0.1, 0.5], sprite3, 15 ],
  								[ [0.90, 0.05, 0.5], sprite1, 10 ],
  								[ [0.85, 0, 0.5], sprite5, 8 ],
  								[ [0.80, 0, 0.5], sprite4, 5 ]
  							];

  							for ( i = 0; i < parameters.length; i ++ ) {

  								color  = parameters[i][0];
  								sprite = parameters[i][1];
  								size   = parameters[i][2];

  								materials[i] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
  								materials[i].color.setHSL( color[0], color[1], color[2] );

  								particles = new THREE.Points( geometry, materials[i] );

  								particles.rotation.x = Math.random() * 6;
  								particles.rotation.y = Math.random() * 6;
  								particles.rotation.z = Math.random() * 6;

  								scene.add( particles );

  							}

  							renderer = new THREE.WebGLRenderer();
  							renderer.setPixelRatio( window.devicePixelRatio );
                console.log(document.getElementById("append"));
  							renderer.setSize( window.innerWidth, window.innerHeight );
  							container.appendChild( renderer.domElement );

  							stats = new Stats();
  							container.appendChild( stats.dom );
                   // materials.needsUpdate = true;
                   // materials.map = true;
                var gui = new GUI();

                				var params = {
                					texture: true
                				};

                				gui.add( params, 'texture' ).onChange( function ( value ) {

                					for ( var i = 0; i < materials.length; i ++ ) {
                            console.log(parameters[ i ][ 1 ]);
                						materials[ i ].map = ( value === true ) ? parameters[ i ][ 1 ] : null;
                						materials[ i ].needsUpdate = true;

                					}

                				} );

                				gui.open();

  							document.addEventListener( 'mousemove', onDocumentMouseMove, false  );
  							document.addEventListener( 'touchstart', onDocumentTouchStart, false  );
  							document.addEventListener( 'touchmove', onDocumentTouchMove, false  );

  							//

  							window.addEventListener( 'resize', onWindowResize, false  );

  						}

  						function onWindowResize() {

  							windowHalfX = window.innerWidth / 2;
  							windowHalfY = window.innerHeight / 2;

  							camera.aspect = window.innerWidth / window.innerHeight;
  							camera.updateProjectionMatrix();

  							renderer.setSize( window.innerWidth, window.innerHeight);

  						}

  						function onDocumentMouseMove( event ) {

  							mouseX = event.clientX - windowHalfX;
  							mouseY = event.clientY - windowHalfY;

  						}

  						function onDocumentTouchStart( event ) {

  							if ( event.touches.length === 1 ) {

  								event.preventDefault();

  								mouseX = event.touches[ 0 ].pageX - windowHalfX;
  								mouseY = event.touches[ 0 ].pageY - windowHalfY;

  							}

  						}

  						function onDocumentTouchMove( event ) {

  							if ( event.touches.length === 1 ) {

  								event.preventDefault();

  								mouseX = event.touches[ 0 ].pageX - windowHalfX;
  								mouseY = event.touches[ 0 ].pageY - windowHalfY;

  							}

  						}

  						//

  						function animate() {

  							requestAnimationFrame( animate );

  							render();
  							stats.update();

  						}

  						function render() {

  							var time = Date.now() * 0.00005;

  							camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  							camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

  							camera.lookAt( scene.position );

  							for ( i = 0; i < scene.children.length; i ++ ) {

  								var object = scene.children[ i ];

  								if ( object instanceof THREE.Points ) {

  									object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

  								}

  							}

  							for ( i = 0; i < materials.length; i ++ ) {

  								color = parameters[i][0];

  								h = ( 360 * ( color[0] + time ) % 360 ) / 360;
  								materials[i].color.setHSL( h, color[1], color[2] );

  							}

  							renderer.render( scene, camera );

  						}


export default {

  components: {
    THREE,Stats,GUI,SideBar
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
  #content-wrap{
    height:100%;
    width:100%;
  }

  #info {
  	position: absolute;
  	top: 0px;
  	width: 60%;
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
