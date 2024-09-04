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
onMounted(() => {
  drawPlumBlossom();
  document.body.style.background = daytime[2]
})
</script>

<template>
  <div class="home-page" >
    <canvas id="canvas" style="position: absolute; z-index: 0; pointer-events: none;" ref="canvas"></canvas>
    <div class="flex justify-center pt-20vh custom-height fade-in">
      <section class="text-lg text-white">
        <p class="mask"></p>
        <p>你好，</p>
        <p>很高兴认识你。</p>
        <p>这里会有一些<router-link to="/content/technics">技术分享</router-link>。</p>
        <p>偶尔会有几篇<router-link to="/content/reflections">随想</router-link>。</p>
        <p>或许，也会记点<router-link to="content/boring-things">无聊的事</router-link>。</p>
      </section>
    </div>
    <footer class="h-30vh w-full slow-to-top"></footer>
  </div>
</template>

<style scoped>
footer {
  background-image: url("../assets/icons/waves.svg");
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  bottom: 0;
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
  text-decoration: none;
  color: #212121;
  display: inline-block;
  padding: 0 10px;
  margin: 0 4px;
  background-color: #efefef;
  border-radius: 4px;
  cursor: pointer;
}
</style>