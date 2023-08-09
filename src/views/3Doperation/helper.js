import {scene,camera} from './init.js'
import * as THREE from '/11/build/three.module.js';

export function drawStraightLine(origin,dstVector,material){
	var geometry = new THREE.BufferGeometry().setFromPoints( [origin,dstVector] );
	var line = new THREE.Line( geometry, material );
	scene.add( line );
}