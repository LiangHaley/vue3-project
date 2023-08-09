import { CSS2DObject } from '/11/build/jsm/renderers/CSS2DRenderer.js';
import * as THREE from '/11/build/three.module.js';
import {scene, renderer, labelRenderer,controls,camera,directionalLight,meshes} from './init.js'

import { DragControls } from '/11/build/jsm/controls/DragControls.js';
import { unSign,unSignSequence } from './event.js'
// import{axisPosition} from './helper.js'

let sourceVertices;
export var  sprites = []
export function getDstVector(direction, origin,length){
	const x1 = direction.x
	const y1 = direction.y
	const z1 = direction.z
	const x2 = origin.x
	const y2 = origin.y
	const z2 = origin.z
	const h = Math.sqrt(length/(Math.pow(x1,2)+Math.pow(y1,2)+Math.pow(z1,2)))
	const x3 = h * x1 + x2
	const y3 = h * y1 + y2
	const z3 = h * z1 + z2
	return new THREE.Vector3( x3, y3, z3 )
}
export function showEdges( geometry ) {
	var edge = [ 0, 0 ], edges = {}, edge1, edge2;
	var key, keys = [ 'a', 'b', 'c' ];
	var geometry2;
	if ( geometry.isBufferGeometry ) {
		geometry2 = new THREE.Geometry();
		geometry2.fromBufferGeometry( geometry );
	} else {
		geometry2 = geometry.clone();
	}
	geometry2.mergeVertices();
	geometry2.computeFaceNormals();
	sourceVertices = geometry2.vertices;
	var faces = geometry2.faces;
	for ( var i = 0, l = faces.length; i < l; i ++ ) {
		var face = faces[ i ];

		for ( var j = 0; j < 3; j ++ ) {
			edge1 = face[ keys[ j ] ];
			edge2 = face[ keys[ ( j + 1 ) % 3 ] ];
			edge[ 0 ] = Math.min( edge1, edge2 );
			edge[ 1 ] = Math.max( edge1, edge2 );
			key = edge[ 0 ] + ',' + edge[ 1 ];
			if ( edges[ key ] === undefined ) {
				edges[ key ] = { index1: edge[ 0 ], index2: edge[ 1 ], face1: i, face2: undefined };
			} else {
				edges[ key ].face2 = i;
			}
		}
	}
	return edges
}
export function rayToLine(edges,origin,direction){
	for (var  key in edges ) {
		var e = edges[ key ];
		if(Math.abs(e.face1 - e.face2) <= 1){
			continue;
		}
		let p1 = new THREE.Vector3(origin.x,origin.y,origin.z)
		let v1 = new THREE.Vector3(direction.x,direction.y,direction.z)
		let  vertex1 = sourceVertices[ e.index1 ];
		let p2 = new THREE.Vector3(vertex1.x, vertex1.y, vertex1.z)
		let vertex2 = sourceVertices[ e.index2 ];
		let v2 = new THREE.Vector3(vertex2.x - vertex1.x, vertex2.y - vertex1.y, vertex2.z - vertex1.z)
		let result = LineLineIntersection(p1,  v1,  p2,  v2,vertex2)
		if(result){
			var material = new THREE.LineBasicMaterial({
				color: 0x0000ff
			});
			var geometry = new THREE.BufferGeometry().setFromPoints( [vertex1,vertex2] );
			var line = new THREE.Line( geometry, material );
			scene.add( line );
			break;
		}
	}
}
export function LineLineIntersection(p1,  v1,  p2,  v2)
{
	var intersection = new THREE.Vector3(0,0,0);
	var error = 1;
	if (new THREE.Vector3(v1.x,v1.y,v1.z).dot(new THREE.Vector3(v2.x,v2.y,v2.z)) == 1)
	{
		console.log('平行')
		// 两线平行
		return false;
	}
	var startPointSeg = new THREE.Vector3(p2.x,p2.y,p2.z).sub(new THREE.Vector3(p1.x,p1.y,p1.z));
	var vecS1 = new THREE.Vector3(v1.x,v1.y,v1.z).cross(new THREE.Vector3(v2.x,v2.y,v2.z))            // 有向面积1
	var vecS2 = new THREE.Vector3(startPointSeg.x,startPointSeg.y,startPointSeg.z).cross(new THREE.Vector3(v2.x,v2.y,v2.z)); // 有向面积2
	var num = new THREE.Vector3(startPointSeg.x,startPointSeg.y,startPointSeg.z).dot(new THREE.Vector3(vecS1.x,vecS1.y,vecS1.z));
	// 判断两这直线是否共面
	if ( num >= error || num <= -error)
	{
		return false;
	}
	// 有向面积比值，利用点乘是因为结果可能是正数或者负数
	// var num2 = vecS2.dot(vecS1) / vecS1.sqrMagnitude;
	// intersection = p1 + v1 * num2;
	return true;
}
/* 获取射线与平面相交的交点 */
export function getIntersects(event,group) {
	var mouse = new THREE.Vector2();
	mouse.x = (event.clientX / window.dom.clientWidth) * 2 - 1;
	mouse.y = -(event.clientY / (window.dom.clientHeight)) * 2 + 1;
	var vector = new THREE.Vector3(mouse.x, mouse.y,0.5).unproject(camera);
	/* 从相机发出一条射线经过鼠标点击的位置 */
	var raycaster = new THREE.Raycaster();
	raycaster.setFromCamera( mouse, camera );
	/* 计算相机到射线的对象，可能有多个对象，返回一个数组，按照距离相机远近排列 */
	var intersects = raycaster.intersectObjects(group);
	/* 返回向量 */
	if(intersects.length>0){
		return intersects[0]
	}
	return intersects;
}
/*添加标签*/
export function addLabel(obj,[x,y,z],textContent){
	var earthDiv = document.createElement( 'div' );
	earthDiv.textContent = textContent;
	// earthDiv.style.marginTop = '-3em';
	earthDiv.style.color = 'red';
	// earthDiv.style.marginLeft = '-3em';
	var earthLabel = new CSS2DObject( earthDiv );
	earthLabel.position.set( x, y, z );
	obj.add(earthLabel)
	render()
}
export function render(){
	renderer.render(scene, camera);
	labelRenderer.render( scene, camera );
}
// export var render = debounce(render2,10)
/* 更新数据 */
/* 循环调用 */
export function animate() {
	requestAnimationFrame(animate);
	directionalLight.position.set(camera.position.x+100,camera.position.y+100,camera.position.z+100)
	render()
}
export function screenToWorld(wrap,x,y){
	let left = wrap.getBoundingClientRect().left;
	let top = wrap.getBoundingClientRect().top;
	let clientX = x - left;
	let clientY = y - top;
	var mv = new THREE.Vector3(
		(clientX / wrap.offsetWidth) * 2 - 1,
		-(clientY / wrap.offsetHeight) * 2 + 1,
		0.5 );
	mv.unproject(camera);  
	return mv
}
var throttle = false
var throttle2 = false
var dragControls;
var NO = 1;
export function addNumberSignature(event){
	var intersects = getIntersects(event,meshes)
	if (event.button === 0 && intersects && intersects.object && intersects.point && !throttle2) {
		throttle2 = true
		drawSignature(intersects,String(NO))
		NO++
		throttle2 = false
		unSignSequence()
	}
}
export function addSignure(event){
	var intersects = getIntersects(event,meshes)
	if (event.button === 0 && intersects && intersects.object && intersects.point && !throttle) {
		throttle = true
		layui.use('layer', function(){ //独立版的layer无需执行这一句
			var $ = layui.jquery, layer = layui.layer; 
			layer.open({
				type:1,
				area:['500px','150px'],
				title: '新建标签'
				,closeBtn:false
				,content: `
				<div class="layui-card">
				<div class="layui-form-item">
					<label class="layui-form-label">标签名称<span style="color:red;">*</span></label>
					<div class="layui-input-block">
					<input id="billboard" value="" type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标签名称" class="layui-input">
					</div>
				</div></div>
				<button style="width:100%" type="button" class="layui-btn" id="test4">确定</button>`,
				shade: 0,
				cancel: function(layero,index){ 
					layer.closeAll();
				},
				success:function(layero,index){
					var $ = layui.$;
					$("#test4").click(function(){
						unSign()
						layer.closeAll();
						throttle = false
						drawSignature(intersects,$("#billboard").val())
					})
				}
			})
		})
	}
}
function drawSignature(intersects,text){
	var group = new THREE.Group()
	scene.add(group)
	console.log(group)
	var startPos = intersects.point,endPos = new THREE.Vector3(startPos.x , startPos.y , startPos.z )
	var dotGeometry = new THREE.Geometry();
	dotGeometry.vertices.push(startPos);
	let canvas = document.createElement("canvas");
	canvas.width = 100;
	canvas.height = 100;
	let context = canvas.getContext("2d");
	context.fillStyle = "#ffff00";
	context.arc(50,50,45,0,2*Math.PI);;
	context.fill();
	let texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	var dotMaterial = new THREE.PointsMaterial( { size: 5,map:texture,transparent:true,depthWrite:false,depthTest:false} );
	var dot = new THREE.Points( dotGeometry, dotMaterial );
	group.add( dot );
	var lineMat =new THREE.LineBasicMaterial({
		"color": 0xff0000,
		depthWrite:false,
		depthTest:false,
		// polygonOffset:true,
		// polygonOffsetFactor:10,
		// polygonOffsetUnits:1
	});
	var lineGeo =new THREE.Geometry();
	lineGeo.vertices.push(startPos);
	lineGeo.vertices.push(endPos);
	var line =new THREE.Line(lineGeo, lineMat);
	line.renderOrder = 2
	console.log(line)
	// var text = $("#billboard").val()
	var textLen = text.length
	var spriteMap = new THREE.TextureLoader().load( drawLogo(text) );
	spriteMap.anisotropy = renderer.capabilities.getMaxAnisotropy();       
	// spriteMap.minFilter = spriteMap.magFilter = THREE.LinearFilter;
	spriteMap.minFilter = spriteMap.magFilter = THREE.NearestFilter;
	console.log(spriteMap)
	var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap,depthWrite:false,depthTest:false } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprites.push(sprite)
	sprite.scale.set(0.02 + 0.01 * (textLen+1) , 0.02 , 1); // 设置的是sprite的大小
	group.add(line); // 添加
	// line.worldToLocal(endPos); // 设置点
	sprite.position.copy(endPos); // 设置sprite的位置
	group.add(sprite); 
	dragControls = new DragControls( [sprite], camera, labelRenderer.domElement );
	document.addEventListener( 'click', render, false );
	dragControls.addEventListener( 'dragstart', function ( event ) {
		controls.enabled  = false
	} );
	dragControls.addEventListener( 'drag', function ( event ) {
		controls.enabled  = false
		group.remove(line)
		var lineGeo =new THREE.Geometry();
		lineGeo.vertices.push(startPos);
		lineGeo.vertices.push(event.object.position);
		line =new THREE.Line(lineGeo, lineMat);
		group.add(line)
	} );
	dragControls.addEventListener( 'dragend', function ( event ) {
		controls.enabled  = true
	} );
}