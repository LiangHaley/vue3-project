<template>
  <div id="app">
	<div id="demo" style="width:100vw"></div>
  </div>
</template>

<script  setup >
  import {onMounted} from 'vue'
  import Pdfh5 from 'Pdfh5'
  onMounted(()=>{
	//实例化
	  const pdfh5 = new Pdfh5("#demo", {
		pdfurl: "/git.pdf",
		// cMapUrl:"https://unpkg.com/pdfjs-dist@3.8.162/cmaps/",
		// responseType: "blob" // blob arraybuffer
	  });
	  //监听完成事件
	  pdfh5.on("complete", function () {
		// console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + totalNum)
		//禁止手势缩放
		pdfh5.zoomEnable(false);
	  })
  })
</script>

<style scoped>
@import "../../node_modules/pdfh5/css/pdfh5.css";
canvas {
  display: block;
  border-bottom: 1px solid black;
}
</style>
