import {operation} from './3Doperation/index.js'
const {
    line_startMessure,
	startMessure,
	changeVisual,
    onWindowResize,
	animate,
	sign,
	signSequence,
	canvasOnClick} = operation

/* 初始化 */
function init() {
	var button = document.createElement("button")
	button.style.position = 'absolute'
	button.style.width = '100px'
	button.style.height = '50px'
	button.style.bottom = '20px'
	button.innerText = '点点测距'
	button.onclick = function(){
		startMessure()
	}
	document.body.append(button)
	var button = document.createElement("button")
	button.style.position = 'absolute'
	button.style.width = '100px'
	button.style.height = '50px'
	button.style.bottom = '20px'
	button.style.left = '120px'
	button.innerText = '点线测距'
	button.onclick = function(){
		line_startMessure()
	}
	document.body.append(button)
	// var index = 0
	// var button = document.createElement("button")
	// button.style.position = 'absolute'
	// button.style.width = '100px'
	// button.style.height = '50px'
	// button.style.bottom = '20px'
	// button.style.left = '220px'
	// button.innerText = '视图'
	// button.onclick = function(){
	// 	if(index > 5){
	// 		index = 0
	// 	}
	// 	changeVisual(index)
	// 	index++
	// }
	// document.body.append(button)
	var button = document.createElement("button")
	button.style.position = 'absolute'
	button.style.width = '100px'
	button.style.height = '50px'
	button.style.bottom = '20px'
	button.style.left = '320px'
	button.innerText = '标记'
	button.onclick = function(){
		sign()
	}
	document.body.append(button)
	var button = document.createElement("button")
	button.style.position = 'absolute'
	button.style.width = '100px'
	button.style.height = '50px'
	button.style.bottom = '20px'
	button.style.left = '420px'
	button.innerText = '序号标记'
	button.onclick = function(){
		signSequence()
	}
	document.body.append(button)
	// var button = document.createElement("button")
	// button.style.position = 'absolute'
	// button.style.width = '100px'
	// button.style.height = '50px'
	// button.style.bottom = '20px'
	// button.style.left = '420px'
	// button.innerText = '零件标记'
	// button.onclick = function(){
	// 	// signSequence()
	// }
	// document.body.append(button)
	/* 事件监听 */
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('click', canvasOnClick, false);
}
init();
animate();