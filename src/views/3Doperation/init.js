import {OrbitControls} from '/11/build/jsm/controls/OrbitControls.js'
import * as THREE from '/11/build/three.module.js';
import { CSS2DRenderer} from '/11/build/jsm/renderers/CSS2DRenderer.js';
import {showEdges, screenToWorld ,addLabel,render,getIntersects,sprites} from './utils.js'
import {objLoader} from './loader.js'
import { STLLoader } from '/11/build/jsm/loaders/STLLoader.js';
import { GUI } from '/11/build/jsm/libs/dat.gui.module.js';
import { modelUrl } from '/src/config'
/* 场景 */
export var scene = new THREE.Scene();
/* 相机 */
export var camera = new THREE.PerspectiveCamera(35, window.dom.clientWidth / window.dom.clientHeight,1, 15000);
camera.position.set(-300, 0, -3000 );

const cameraTarget = new THREE.Vector3( -100, -50, -400);
camera.lookAt( cameraTarget );
scene.add(camera)
/* 渲染器 */
export var renderer = new THREE.WebGLRenderer({antialias: true,alpha:true});
renderer.setSize(window.dom.clientWidth, window.dom.clientHeight);
window.dom.appendChild(renderer.domElement);
export var labelRenderer = new CSS2DRenderer();
labelRenderer.setSize( window.dom.clientWidth, window.dom.clientHeight );
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = 0;
window.dom.appendChild( labelRenderer.domElement );
renderer.localClippingEnabled = false;
renderer.setClearColor( 0xAAC8E6 );
renderer.sortObjects = false;
/* 灯光 */
var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);
export var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(300, 600, 400);
scene.add(directionalLight);
/* 控制器 */
// export var controls
export var controls = new OrbitControls(camera, labelRenderer.domElement);
export var meshes =[]
export function changeColor(color){
	renderer.setClearColor( color );
}
export async function addModel(){
	// const modelUrl = 'http://111.202.164.164:9080/hv-visio/assets/htdesign/objs/%E6%B0%B4%E5%8E%82/%E9%BE%99%E5%B1%B1%E6%B0%B4%E5%8E%82.obj'
	// const manager = new THREE.LoadingManager();
	// const loader = objLoader;
	// 			loader.load(modelUrl, group => {
	// 				scene.add(group)
	// 			})
	console.log(111,STLLoader)
	modelUrl.forEach(url => {
		const loader = new STLLoader();
		loader.load( url, function ( geometry ) {
			console.log("111")
			const material = new THREE.MeshPhongMaterial( { transparent:true,color: 0xff9c7c, specular: 0x494949, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			scene.add( mesh );
			meshes.push(mesh)
			console.log(mesh)
		} );
	})
}
// function onWindowResize() {

// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();

// 	renderer.setSize( window.innerWidth, window.innerHeight );

// }
// window.addEventListener( 'resize', onWindowResize );