<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex justify-center pt-20vh custom-height fade-in">
    <section class="text-lg">
      <p class="mask"></p>
      <p>你好，</p>
      <p>很高兴认识你。</p>
      <p>这里会有一些<router-link to="">技术分享</router-link>。</p>
      <p>偶尔会有几篇<router-link to="">随想</router-link>。</p>
      <p>或许，也会记点<router-link to="">无聊的事</router-link>。</p>
    </section>
  </div>
  <footer class="h-30vh w-full fade-in"></footer>
</template>

<style scoped>
footer {
  background-image: url("./assets/icons/waves.svg");
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  bottom: 0;
  object-fit: cover;
  background-position: center;
  opacity: 1;
}
.custom-height {
  height: calc(100% - 30vh);
  padding-bottom: 30vh;
}
a {
  text-decoration: none;
  color: black;
  display: inline-block;
  padding: 0 10px;
  margin: 0 4px;
  background-color: #efefef;
  border-radius: 4px;
  cursor: pointer;
}
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.fade-in {
  animation: fade-in 2s ease-in-out;
}
</style>
