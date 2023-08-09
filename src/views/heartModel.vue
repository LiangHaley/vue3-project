<script setup>
import{useRouter} from 'vue-router'
// @ts-ignore
import FormList from '../components/FormList.vue'
import { ref, onMounted } from 'vue';
// @ts-ignore
import {ZoomOut,FullScreenOne,FilePdfOne, Router } from "@icon-park/vue-next";
import 'animate.css';
const root = ref(null);
const color =ref('#AAC8E6')
let changeColor2
onMounted(() => {
    // @ts-ignore
	window.dom = root.value
	import('./3Doperation/index.js')
	.then(({operation}) => {
        
		const {animate,addModel,meshes,changeColor} = operation
        changeColor2 = changeColor
        // @ts-ignore
		window.meshes = meshes
		animate();
		addModel()
	});
	
});
const isShowList = ref(true);
const ZoomOutClick = ()=>{
    isShowList.value = false;
}
const FullScreenClick = ()=>{
    isShowList.value = true;
}
const router = useRouter()
const FilePdfOneClick = ()=>{
    router.push('/home')
}
</script>
<template>
<div class="heartModel">
    <div class = "formList2" >
        <div style="display:flex;float:right;background:white">
            <div @click = "ZoomOutClick"><zoom-out theme="multi-color" size="24" :fill="['#333' ,'#1c3250' ,'#FFF' ,'#43CCF8']" :strokeWidth="3"/></div>
            <div @click = "FullScreenClick"><full-screen-one theme="multi-color" size="24" :fill="['#333' ,'#1c3250' ,'#FFF' ,'#43CCF8']" :strokeWidth="3"/></div>
            <div @click = "FilePdfOneClick"><file-pdf-one theme="multi-color" size="24" :fill="['#333' ,'#1c3250' ,'#FFF' ,'#43CCF8']" :strokeWidth="3"/></div>
            <el-color-picker v-model="color"   @active-change = "function(val){changeColor2(val)}" />
        </div>
        
        <Transition
            name="custom-classes"
            enter-active-class="animate__animated animate__bounceInUp"
            leave-active-class="animate__animated animate__bounceOutUp"
            >
            <FormList v-if="isShowList"></FormList>
        </Transition>
    </div>
    <div id="canvas"  ref="root" style="flex-grow:1;height:100vh;"></div>
</div>

    
</template>
<style scoped >
.heartModel{
    position: relative;
    display: flex;
	width: 100vw;
    top:0px;
    
}
.formList2{
     
        position: fixed;
        bottom:0;
        left:0px;
        z-index:1;
       
    }
.btnList li{
            list-style: none;
            display: inline-block;
            margin:5px;
        }
.formList{
            font-size: 24px;
            width:100%;
            height: 500px;
        }
#canvas{
    flex:1;
    z-index:0;
    width:100%;
    height: 500px;
} 
@media (max-width: 680px){
    .heartModel{
        overflow: scroll;
        position: relative;
       
         top:0px;
    
    }
    .formList{
        width: 100%;
        min-height: 400px;
        font-size: 12px;
       
      
        }
          .btnList li{
            list-style: none;
            display: inline-block;
            margin:5px;}
    #canvas{
        width: 100%;
    } 

}

</style>