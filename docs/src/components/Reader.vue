<script setup>
import { VueReader } from 'vue-reader'
import { ref } from 'vue'

const bookUrl = ref('')
function onFileChange(e) {
  const file = e.target.files[0]
  bookUrl.value = file
}
// const getRendition = (rendition) => {
//   rendition.themes.register("custom", {
//     "*": {
//       color: "#fff",
//       "background-color": "#252525",
//     },
//     image: {
//       border: "1px solid red",
//     },
//     p: {
//       "font-family": "Helvetica, sans-serif",
//       "font-weight": "400",
//       "font-size": "20px",
//     },
//   });
//   rendition.themes.select("custom");
// };
const fileInput = ref(null)
function chooseFile() {
  fileInput.value.click()
}
</script>

<template>
  <div>
    <div class="upload-btn" style="margin-top: 10px;" @click="chooseFile">
      <input ref="fileInput" type="file" @change="onFileChange">
      <span>请上传</span>
    </div>
    <div style="height: calc(100vh - 400px);position: relative;">
      <VueReader v-if="bookUrl" :url="bookUrl" />
    </div>
  </div>
</template>

<style>
.upload-btn {
  position: relative;
  width: 200px;
  height: 50px;
  background: #18a058;
  border-radius: 5px;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
}

.upload-btn input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-btn span {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: 0.2s;
}

.upload-btn:hover span {
  background: rgba(0, 0, 0, 0.1);
}

.upload-btn svg {
  width: 30px;
  height: 30px;
}
</style>

<style>
/** 修复阅读器导致menu下拉不显示 */
.container{
  overflow: visible;
}
</style>
