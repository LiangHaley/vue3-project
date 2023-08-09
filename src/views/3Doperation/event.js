import * as THREE from '/11/build/three.module.js';
import {getIntersects, addLabel, getDstVector, rayToLine, render, addSignure, addNumberSignature} from './utils.js'
import {scene, camera,   meshes, renderer, controls} from './init.js'
import {drawStraightLine} from './helper.js'
let pointsArray = [];

/*开启点线测距*/
export function line_startMessure(){
	window.addEventListener('mousedown', line_mousedown, false);
}
/*注销点线测距*/
export function line_endMessure(){
	window.removeEventListener('mousedown', line_mousedown, false);
}
/*开启点点测距*/
export function startMessure(){
	window.addEventListener('mousedown', onMouseDown, false);
}
/*注销点点测距*/
export function endMessure(){
	window.removeEventListener('mousedown', onMouseDown, false);
}
/*开启标记*/
export function sign(){
	window.addEventListener('mousedown', addSignure, false);
}
/*关闭标记*/
export function unSign(){
	window.removeEventListener('mousedown', addSignure, false);
}
/*开启序号标记*/
export function signSequence(){
	window.addEventListener('mousedown', addNumberSignature, false);
}
/*关闭序号标记*/
export function unSignSequence(){
	window.removeEventListener('mousedown', addNumberSignature, false);
}
/* 窗口自动适应 */
export function onWindowResize() {
	camera.aspect = window.dom.clientWidth / window.dom.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.dom.clientWidth, window.dom.clientHeight);
}
/* 改变六视图 */
export function changeVisual(index,position) {
	var dis = 300
	var modelPosition = model.position
	console.log(modelPosition)
	if(index == 0){	//正面
		camera.position.set(modelPosition.x,modelPosition.y,modelPosition.z+dis)//set(x,y,z)
		
		// model.rotation.set(0,0,0)
	}
	if(index == 1){	//背面
		camera.position.set(modelPosition.x,modelPosition.y,modelPosition.z-dis)//set(x,y,z)
		

	}
	if(index == 2){	//左面
		camera.position.set(modelPosition.x-dis,modelPosition.y,modelPosition.z)//set(x,y,z)
		
	}
	if(index == 3){	//右面
		camera.position.set(modelPosition.x+dis,modelPosition.y,modelPosition.z)//set(x,y,z)
		
	}
	if(index == 4){	//上面
		camera.position.set(modelPosition.x,modelPosition.y+dis,modelPosition.z)//set(x,y,z)
		
	}
	if(index == 5){	//下面
		camera.position.set(modelPosition.x,modelPosition.y-dis,modelPosition.z)//set(x,y,z)
		
	}
	// if(index == 6){	//原位
	// 	camera.position.set(0, 200, 250);
	// 	camera.lookAt(new THREE.Vector3(0, 0, 0));
	// }
	controls.target =new THREE.Vector3(0, 0, 0)
}
/* 鼠标按下事件 */
function onMouseDown(event) {
	/* 获取相机发出的射线与 Plane 相交点*/
	var intersects = getIntersects(event,meshes).point;
	/* 鼠标左键按下时，创建点和线段 */
	if (event.button === 0 && intersects && intersects.x && intersects.y) {
		var pointsGeometry = new THREE.Geometry();
		pointsGeometry.vertices.push(intersects);
		var pointsMaterial = new THREE.PointsMaterial({color:0xff0000, size: 0.1});
		var points = new THREE.Points(pointsGeometry, pointsMaterial);
		pointsArray.push(points);
		/* 创建线段 */
		var lineGeometry = new THREE.Geometry();
		var lineMaterial = new THREE.LineBasicMaterial({color: 0x00ff00});
		scene.add(points);
		if (pointsArray.length >= 2) {
			lineGeometry.vertices.push(pointsArray[0].geometry.vertices[0], pointsArray[1].geometry.vertices[0]);
			var line = new THREE.Line(lineGeometry, lineMaterial);
			const startPoint = pointsArray[0].geometry.vertices[0]
			const endPoint = pointsArray[1].geometry.vertices[0]
			const pos1 = new THREE.Vector3(startPoint.x,startPoint.y,startPoint.z)
			const pos2 = new THREE.Vector3(endPoint.x,endPoint.y,endPoint.z)	
			var distance = pos1.distanceTo(pos2);
			pointsArray.shift();
			scene.add(line);
			pointsArray = []
			addLabel(line,[(startPoint.x + endPoint.x) /2 ,(startPoint.y + endPoint.y) /2,(startPoint.z + endPoint.z) /2],distance)
			render()
			return endMessure()
		}
	}
}