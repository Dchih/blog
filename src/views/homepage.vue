<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { daytime } from '@/public/variables/colorScheme';
import { drawBranchSlowly } from '@/utils/background';

function drawPlumBlossom() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  ctx.globalAlpha = 0.5;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawBranchSlowly(ctx, { x: 0, y: window.innerHeight * 7 / 8 }, 135, 15, 200);
}

const goSBAddress = () => {
  window.open("http://beian.miit.gov.cn/");
}
onMounted(() => {
  drawPlumBlossom();
  document.body.style.background = daytime[2]
})
</script>

<template>
  <div class="home-page" >
    <canvas id="canvas" style="position: absolute; z-index: 0; pointer-events: none;" ref="canvas"></canvas>
    <div class="flex justify-end pt-5vh pr-3vw custom-height fade-in">
      <section class="text-lg text-white flex flex-col gap-10">
        <router-link to="/content/technics">技术分享</router-link>
        <router-link to="/content/reflections">随想</router-link>
        <router-link to="content/boring-things">无聊的事</router-link>
      </section>
    </div>
    <footer class="h-30vh w-full slow-to-top"></footer>
  </div>
  <div style="background: #273036; color: #efefef;" class="text-center fixed bottom-0 w-full cursor-pointer" @click="goSBAddress">备案号：粤ICP备2023083802号-1</div>
</template>

<style scoped>
footer {
  background-image: url("../assets/icons/waves.svg");
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  bottom: 20px;
  object-fit: cover;
  background-position: center;
  opacity: 1;
  z-index: 100;
}
.custom-height {
  height: calc(100% - 30vh);
  padding-bottom: 30vh;
}
a {
  text-decoration: underline;
  color: #fff;
  display: inline-block;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  font-style: italic;
}
</style>