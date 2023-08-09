<script setup>
// @ts-ignore
import * as THREE from '/11/build/three.module.js';
// import {ColorPicker } from "vue3-colorpicker";
// import "vue3-colorpicker/style.css";
// @ts-ignore
import { modelName } from '/src/config.js'
// import { de } from "element-plus/es/locale";
// @ts-ignore
import {PreviewOpen,PreviewCloseOne} from '@icon-park/vue-next'
import {reactive} from 'vue'
let tableData = reactive({
  arr:[]
});

tableData.arr = modelName.map((name,index) =>({
  model: name,
  dlogin: 'Tom',
  Screen: true,
  volume: 1,
  Transparency: 1,
  bg: '#ccc',
  bgtext:"#aa0000",
  index
}))
// @ts-ignore
// const pureColor = ref("red");
// const gradientColor = ref("linear-gradient(0deg, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 1) 100%)");
//颜色事件
const change = (val,index)=>{
  // @ts-ignore
  const mesh = window.meshes[index]
  mesh.material.color = new THREE.Color( val );
}
const screen = (val) =>{
  // @ts-ignore
  const mesh = window.meshes[val.index]
  mesh.visible = !val.Screen
  console.log(mesh)
  return val.Screen = !val.Screen;
}
// const Transparency = ref(1);
const TransparencyChange = (val,index) =>{
  console.log(val)
  // @ts-ignore
  const mesh = window.meshes[index]
  mesh.material.opacity = val
}

// const volume = ref(1);
const VolumEChange = (val,index) =>{
  console.log(val)
  // @ts-ignore
  const mesh = window.meshes[index]
  mesh.scale.set(val,val,val)
}


  
</script>
<template>
<div class="formList">
  <el-table :data="tableData.arr" style="width: 100%">
    <el-table-column fixed  label="模型" width="70rem"   prop="model" align="center" />
    <el-table-column label="查看" width="50rem" align="center">
        <template #default="scope">
            <Component :is="scope.row.Screen ? PreviewOpen : PreviewCloseOne" size="1.5rem"  theme="multi-color" :fill="['#000' ,'#244' ,'#FFF' ,'#43CCF8']" :strokeWidth="1"  @click="screen(scope.row)" />
      </template>
    </el-table-column>
    <el-table-column label="体积/立方厘米" width="90rem" align="center" >
      <template #default="scope">
        <el-input-number v-model="scope.row.volume" size="small" :min="0"  :max="2" :step="0.1" @change="VolumEChange(scope.row.volume,scope.row.index)" />
      </template>
    </el-table-column>
    <el-table-column prop="Transparency" label="透明度" width="90rem" align="center" >
      <template #default="scope">
        <el-input-number v-model="scope.row.Transparency"  size="small" :min="0" :step="0.1" :max="1" @change="TransparencyChange(scope.row.Transparency,scope.row.index)" />
        <!-- <el-slider v-model="scope.row.Transparency" size="small" show-input :step="0.1" :max="1" @change ="TransparencyChange(scope.row.Transparency,scope.row.index)"/> -->
      </template>
    </el-table-column>
    <el-table-column  label="颜色" prop="bgtext" @click = "change" width="90rem" align="center" >
      <template #default="scope">
        <el-color-picker v-model="scope.row.bg"  @active-change = "(val) => {change(val,scope.row.index)}" />
        <!-- <color-picker @pureColorChange = "(val) => {change(val,scope.row.index)}" v-model:pureColor="scope.row.bg" format="hex6" shape="square" useType="both" width="100%" v-model:gradientColor="gradientColor"/> -->
      </template>
    </el-table-column>
  </el-table> 
</div>
   
</template>

<style scoped>
.formList>div{
  background:#FFF;
  width:100%;
  display: flex;
}

:deep(.el-table__expanded-cell) {
  background-color: #FFF !important;
}
:deep(.el-table td.el-table__cell),
:deep(.el-table.is-scrolling-none th.el-table-fixed-column--left),
:deep(.el-table__body-wrapper tr td.el-table-fixed-column--left),
:deep(.el-table th.el-table__cell),
:deep(.el-table th),
:deep(.el-table tr),
:deep(.el-table td),
:deep(.el-table){
  --el-table-border-color:#FFF;
  background-color: #FFF;
  border:none;
  border-color:#FFF     !important;
}
:deep(.el-table td.el-table__cell .el-input-number){
    width: 80px;
}
:deep(.el-slider__button){
  font-size:12px;
  width:12px;
  height:12px;
}

</style>